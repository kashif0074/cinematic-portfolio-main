/**
 * Groq Cloud API Client with Intelligent Key Rotation & Model Fallback
 */

export interface GroqChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GroqCompletionOptions {
  messages: GroqChatMessage[];
  temperature?: number;
  maxTokens?: number;
}

const CANDIDATE_MODELS = [
  'llama-3.3-70b-versatile',
  'llama-3.1-8b-instant',
  'mixtral-8x7b-32768',
];

class GroqClientManager {
  private apiKeys: string[] = [];
  private currentKeyIndex = 0;
  private keyCooldowns: Map<string, number> = new Map();

  constructor() {
    this.refreshKeys();
  }

  /**
   * Discovers and parses all available Groq API keys from environment
   */
  public refreshKeys(): void {
    const rawKeys: string[] = [];

    // 1. Vite environment variables
    const viteKey = (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_GROQ_API_KEY;
    const standardKey = (import.meta as unknown as { env?: Record<string, string> }).env?.GROQ_API_KEY;

    if (viteKey) rawKeys.push(viteKey);
    if (standardKey && standardKey !== viteKey) rawKeys.push(standardKey);

    // 2. Window runtime override (if set by user or host)
    const windowKey = typeof window !== 'undefined' ? (window as unknown as { __GROQ_API_KEY__?: string }).__GROQ_API_KEY__ : undefined;
    if (windowKey) rawKeys.push(windowKey);

    // Split any comma/semicolon/newline separated keys and filter unique valid keys
    const parsed: string[] = [];
    rawKeys.forEach((entry) => {
      if (!entry) return;
      entry
        .split(/[\n,;]+/)
        .map((k) => k.trim())
        .filter((k) => k.startsWith('gsk_') && k.length > 20)
        .forEach((validKey) => {
          if (!parsed.includes(validKey)) {
            parsed.push(validKey);
          }
        });
    });

    this.apiKeys = parsed;
  }

  /**
   * Get active usable API key considering cooldowns
   */
  private getActiveKey(): string | null {
    if (this.apiKeys.length === 0) return null;

    const now = Date.now();
    // Check if current key is cooled down
    for (let i = 0; i < this.apiKeys.length; i++) {
      const idx = (this.currentKeyIndex + i) % this.apiKeys.length;
      const key = this.apiKeys[idx];
      const cooldownUntil = this.keyCooldowns.get(key) || 0;

      if (now >= cooldownUntil) {
        this.currentKeyIndex = idx;
        return key;
      }
    }

    // If all are in cooldown, pick the one that expires soonest
    let minKey = this.apiKeys[0];
    let minCooldown = Infinity;
    this.apiKeys.forEach((key) => {
      const cd = this.keyCooldowns.get(key) || 0;
      if (cd < minCooldown) {
        minCooldown = cd;
        minKey = key;
      }
    });

    return minKey;
  }

  /**
   * Mark a key as rate limited / cooled down and advance rotation pointer
   */
  private rotateKey(key: string, cooldownDurationMs = 60000): void {
    this.keyCooldowns.set(key, Date.now() + cooldownDurationMs);
    this.currentKeyIndex = (this.currentKeyIndex + 1) % Math.max(1, this.apiKeys.length);
  }

  /**
   * Perform chat completion with key rotation and model fallback
   */
  public async createChatCompletion(options: GroqCompletionOptions): Promise<string> {
    this.refreshKeys();

    if (this.apiKeys.length === 0) {
      throw new Error('No Groq API keys configured.');
    }

    let lastError: Error | null = null;
    const maxKeyAttempts = Math.min(this.apiKeys.length, 3);

    // Try models in order of priority
    for (const model of CANDIDATE_MODELS) {
      // Try keys in rotation
      for (let attempt = 0; attempt < maxKeyAttempts; attempt++) {
        const apiKey = this.getActiveKey();
        if (!apiKey) break;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 16000);

        try {
          const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model,
              messages: options.messages,
              temperature: options.temperature ?? 0.5,
              max_tokens: options.maxTokens ?? 1024,
            }),
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (response.ok) {
            const data = await response.json();
            const reply = data.choices?.[0]?.message?.content;
            if (reply && typeof reply === 'string') {
              return reply.trim();
            }
          }

          // Handle rate limit (429) or invalid auth (401)
          if (response.status === 429 || response.status === 401 || response.status === 403) {
            this.rotateKey(apiKey, response.status === 429 ? 60000 : 3600000);
            continue; // Try next key
          }

          // Other server errors (500, 503) -> try next model
          const errText = await response.text().catch(() => '');
          lastError = new Error(`Groq API returned HTTP ${response.status}: ${errText}`);
          break; // Break key loop to try next model
        } catch (err: unknown) {
          clearTimeout(timeoutId);
          const errorObj = err as Error;
          if (errorObj.name === 'AbortError') {
            lastError = new Error('Groq API request timed out.');
            this.rotateKey(apiKey, 15000);
            continue;
          }
          lastError = errorObj;
        }
      }
    }

    throw lastError || new Error('Failed to generate response from Groq API.');
  }

  /**
   * Status inspection
   */
  public getStatus() {
    return {
      totalKeys: this.apiKeys.length,
      activeKeyIndex: this.currentKeyIndex,
      activeModel: CANDIDATE_MODELS[0],
      hasKeys: this.apiKeys.length > 0,
    };
  }
}

export const groqClient = new GroqClientManager();
