import { ragIndex, type RetrievedResult } from './vectorEngine';
import { groqClient, type GroqChatMessage } from './groqClient';
import { classifyQuery, getPreviousTopic, type ClassificationResult } from './intentDetector';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: { title: string; source: string; score: number; url?: string; githubUrl?: string }[];
}

/**
 * Builds a concise, targeted system prompt for Groq
 */
function buildSystemPrompt(classification: ClassificationResult, contextText: string): string {
  const { intent } = classification;

  if (intent === 'greeting') {
    return `You are Kashif Shahzad's portfolio assistant. Respond to the greeting in a single friendly, polite sentence (e.g. "Hey! How can I help you today?"). Do NOT dump any skills or project details.`;
  }

  if (intent === 'smalltalk') {
    return `You are Kashif Shahzad's portfolio assistant. The user is asking a casual conversational question like "How are you?". Respond naturally, warmly, and briefly (e.g. "I'm doing great, thanks for asking! How can I help you today?"). Do NOT dump resume details.`;
  }

  if (intent === 'gratitude') {
    return `You are Kashif Shahzad's portfolio assistant. The user is saying thank you. Respond politely and warmly in one sentence.`;
  }

  if (intent === 'farewell') {
    return `You are Kashif Shahzad's portfolio assistant. Say goodbye politely and wish the user a great day in one sentence.`;
  }

  if (intent === 'continuation_transition') {
    return `You are Kashif Shahzad's portfolio assistant. The user said "Now" or "What next?". Acknowledge what was just discussed and briefly suggest 2-3 specific areas they can explore next (e.g. another project, his database stack, or his contact info). Do NOT repeat the previous response.`;
  }

  if (intent === 'general_tech') {
    return `You are a knowledgeable software engineering assistant on Kashif's portfolio. Answer the general technical question directly, accurately, and concisely (under 100 words).`;
  }

  // Portfolio Knowledge Question
  return `You are Kashif Shahzad's portfolio AI assistant. Kashif is an AI Engineer and Full-Stack Developer.
Answer the user's question using the verified records below.

VERIFIED PORTFOLIO RECORDS:
=== BEGIN CONTEXT ===
${contextText}
=== END CONTEXT ===

STRICT FORMATTING RULES:
1. Be direct, natural, and concise (under 120 words).
2. Avoid repetitive headings and long bulleted lists.
3. If asked about "Database", focus specifically on his databases (PostgreSQL, pgvector, MongoDB Atlas, Neo4j, Redis, SQLite).
4. If asked about "Backend", focus specifically on his backend frameworks (Python FastAPI/Flask, Node.js/Express, ASP.NET Core).
5. If asked about "Kashif major", explain his core specialization in AI Automation Engineering & Full-Stack Development.
6. If asked about "Experience", summarize his roles at Revive Medical Technologies and Daraz Pakistan.
7. Include live links [Label](url) when available in the context.`;
}

/**
 * Deterministic fallback generator for fast, precise offline responses
 */
function generateDeterministicAnswer(
  classification: ClassificationResult,
  query: string,
  history: ChatMessage[],
  results: RetrievedResult[]
): string {
  const { intent } = classification;
  const clean = query.trim().toLowerCase();

  if (intent === 'greeting') {
    return 'Hey! How can I help you today?';
  }

  if (intent === 'smalltalk') {
    if (clean.includes('who are you') || clean.includes('what are you')) {
      return "I'm Kashif's AI Assistant. I can answer questions about his software engineering projects, technical stack, databases, or work experience. How can I help you?";
    }
    return "I'm doing great, thanks for asking! How can I help you today?";
  }

  if (intent === 'gratitude') {
    return "You're very welcome! Feel free to ask if you have any other questions.";
  }

  if (intent === 'farewell') {
    return 'Goodbye! Have a wonderful day!';
  }

  if (intent === 'continuation_transition') {
    const prev = getPreviousTopic(history);
    if (prev?.name) {
      return `We just looked at **${prev.name}**. What would you like to explore next? You could ask about another project (like **LeadLens** or the **Job Tracker API**), dive into his database and backend architecture, or check his contact information.`;
    }
    return 'What would you like to explore next? Feel free to ask about Kashif’s projects, tech stack, databases, or professional experience.';
  }

  if (intent === 'database_inquiry') {
    return `### Database Technologies\nKashif works with a diverse storage stack tailored to application needs:\n- **PostgreSQL 16 & pgvector**: Relational data and 384-dimensional vector embeddings for semantic search.\n- **MongoDB Atlas**: Document database for high-throughput ingestion and flexible schemas.\n- **Neo4j 5**: Graph database used for GraphRAG relationship traversal.\n- **Redis**: In-memory caching and BullMQ asynchronous worker queues.\n- **SQLite**: Lightweight embedded storage for local services.\n- **ORMs**: Prisma 5 (Next.js) and Entity Framework Core (C# / .NET).`;
  }

  if (intent === 'backend_inquiry') {
    return `### Backend Engineering\nKashif builds scalable, decoupled server architectures using:\n- **Python (FastAPI & Flask)**: High-speed REST APIs, Gunicorn WSGI, and data extraction pipelines.\n- **Node.js & Express.js**: REST endpoints, WebSockets, and asynchronous BullMQ Redis worker queues.\n- **C# & ASP.NET Core**: Enterprise Web APIs with Entity Framework Core migrations.\n- **Security**: JWT authentication, Google OAuth, Next-Auth, and socket-level SSRF protection.`;
  }

  if (intent === 'major_inquiry') {
    return `### Kashif's Major Specialization\nKashif's core expertise is at the intersection of **AI Automation Engineering and Full-Stack Development**:\n1. **Agentic AI & LLMs**: Designing multi-agent workflows (LangGraph, Microsoft AutoGen), fast Groq inference, and hybrid RAG systems (pgvector, Neo4j 5).\n2. **Scalable Full-Stack SaaS**: Building end-to-end platforms using React 19, Next.js 16, TypeScript, Python, and Node.js.\n3. **Healthcare Technology & RPM**: Telemetry dashboards and Medicare CPT billing compliance for remote patient monitoring.`;
  }

  if (intent === 'experience_inquiry') {
    if (clean.includes('revive')) {
      return `### Full-Stack & AI Engineer at Revive Medical Technologies (June 2026 – Present)\n- Integrated conversational AI features using Groq API endpoints and custom HeyGen avatar assistants for Remote Patient Monitoring (RPM).\n- Developed and maintained production web apps using React, Next.js, TypeScript, and Node.js.\n- Managed data layers and microservices using MongoDB Atlas and PostgreSQL.`;
    }
    return `### Professional Experience\n1. **Full-Stack & AI Engineer at Revive Medical Technologies Inc.** (June 2026 – Present)\n   - Integrated Groq LLMs and HeyGen voice avatars into Remote Patient Monitoring (RPM) platforms.\n   - Built production web apps in React, Next.js, TypeScript, and Node.js, managing PostgreSQL & MongoDB layers.\n\n2. **Logistics Assistant at Daraz Pakistan** (May 2022 – April 2025)\n   - Managed order tracking, fulfillment data, and logistics coordination using internal digital platforms.`;
  }

  // Use primary retrieved chunk if available
  const primary = results[0]?.chunk;
  if (primary) {
    return `### ${primary.title}\n${primary.content}\n\n${
      primary.url ? `🔗 [Live Website](${primary.url})\n` : ''
    }${
      primary.githubUrl ? `📂 [GitHub Repository](${primary.githubUrl})` : ''
    }`.trim();
  }

  return "I don't have that specific detail in Kashif's portfolio records. However, I can share details on his verified projects (LeadLens, Job Tracker, Avatar Chat Ava, CMS Directory), databases, backend stack, or work experience.";
}

/**
 * Intelligent Response Generator with Metadata-Filtered Hybrid Retrieval
 */
export async function generateRAGResponse(
  userQuery: string,
  history: ChatMessage[] = []
): Promise<{ text: string; sources: RetrievedResult[] }> {
  const query = userQuery.trim();
  if (!query) {
    return {
      text: 'Please enter a message to begin.',
      sources: [],
    };
  }

  // 1. Classify query intent and determine metadata filters
  const classification = classifyQuery(query, history);
  const { shouldRetrieveRAG, categoryFilter, idFilter, topicHint } = classification;

  // 2. Perform Metadata-Filtered Hybrid Retrieval
  let contextText = '';
  let retrievedSources: RetrievedResult[] = [];

  if (shouldRetrieveRAG) {
    const searchOptions = {
      query: topicHint || query,
      categoryFilter,
      idFilter,
      topK: 2, // Keep context focused and non-repetitive
      minScore: 0.1,
    };

    const { contextText: ctx, results } = ragIndex.getAugmentedContext(searchOptions);
    contextText = ctx;
    retrievedSources = results;
  }

  // 3. Special handling for continuation / transition (e.g. "Now")
  if (classification.intent === 'continuation_transition') {
    const prev = getPreviousTopic(history);
    let transitionPrompt = 'The user said "Now". Ask them what they would like to explore next.';
    if (prev?.name) {
      transitionPrompt = `The user said "Now". We were just discussing "${prev.name}". Acknowledge this briefly in one sentence and suggest 2 specific areas they might want to explore next (e.g., another project or his technical stack). Do NOT repeat the previous answer.`;
    }

    try {
      const messages: GroqChatMessage[] = [
        { role: 'system', content: transitionPrompt },
        { role: 'user', content: query },
      ];
      const reply = await groqClient.createChatCompletion({ messages, temperature: 0.6, maxTokens: 120 });
      if (reply && reply.trim()) {
        return { text: reply.trim(), sources: [] };
      }
    } catch {
      // Use deterministic transition fallback
    }

    return {
      text: generateDeterministicAnswer(classification, query, history, []),
      sources: [],
    };
  }

  // 4. Build System Prompt for Groq
  const systemPrompt = buildSystemPrompt(classification, contextText);

  // Take recent message turns (last 4 turns) to maintain context without overloading
  const recentHistory = history.slice(-4);
  const formattedHistory: GroqChatMessage[] = recentHistory.map((m) => ({
    role: m.sender === 'user' ? 'user' : 'assistant',
    content: m.text,
  }));

  const messages: GroqChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...formattedHistory,
    { role: 'user', content: query },
  ];

  // 5. Groq LLM Inference
  try {
    const aiResponse = await groqClient.createChatCompletion({
      messages,
      temperature: shouldRetrieveRAG ? 0.35 : 0.6,
      maxTokens: 500, // Keeps answers concise and prevents rambling
    });

    if (aiResponse && aiResponse.trim().length > 0) {
      return {
        text: aiResponse.trim(),
        sources: shouldRetrieveRAG ? retrievedSources : [],
      };
    }
  } catch (err) {
    console.warn('Groq API error encountered; using deterministic fallback:', err);
  }

  // 6. Graceful Deterministic Fallback
  const fallbackText = generateDeterministicAnswer(classification, query, history, retrievedSources);
  return {
    text: fallbackText,
    sources: shouldRetrieveRAG ? retrievedSources : [],
  };
}
