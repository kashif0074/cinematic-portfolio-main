import { KNOWLEDGE_CHUNKS, type KnowledgeChunk } from './knowledgeChunks';

export interface RetrievedResult {
  chunk: KnowledgeChunk;
  score: number;
}

/**
 * Stop words filtered out during vectorization
 */
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren',
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'can', 'cannot', 'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for',
  'from', 'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him',
  'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'me', 'more',
  'most', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other',
  'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 'should', 'so', 'some',
  'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these',
  'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we',
  'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'with', 'would', 'you',
  'your', 'yours', 'yourself', 'yourselves',
]);

/**
 * Tokenize string into clean normalized terms and n-grams
 */
function tokenize(text: string): string[] {
  const clean = text
    .toLowerCase()
    .replace(/https?:\/\/[^\s]+/g, ' ')
    .replace(/[^a-z0-9_.\-#+]/g, ' ');
  
  const rawTokens = clean.split(/\s+/).filter((t) => t.length > 1 && !STOP_WORDS.has(t));
  const tokens: string[] = [...rawTokens];

  // Bigrams for key technical compounds (e.g., 'next js', 'web audio', 'pgvector')
  for (let i = 0; i < rawTokens.length - 1; i++) {
    tokens.push(`${rawTokens[i]}_${rawTokens[i + 1]}`);
  }

  return tokens;
}

/**
 * In-browser Vector Space Model & RAG Index
 */
export class VectorRAGIndex {
  private chunks: KnowledgeChunk[];
  private vocabulary: Map<string, number> = new Map();
  private idf: Map<string, number> = new Map();
  private chunkVectors: number[][] = [];

  constructor(chunks: KnowledgeChunk[] = KNOWLEDGE_CHUNKS) {
    this.chunks = chunks;
    this.buildIndex();
  }

  /**
   * Build vocabulary, inverse document frequencies, and unit chunk vectors
   */
  private buildIndex() {
    const docTermFreqs: Map<string, number>[] = [];
    const docCount = this.chunks.length;

    // 1. Compute Term Frequencies per chunk (weighted by title, tags, and content)
    this.chunks.forEach((chunk) => {
      const tf = new Map<string, number>();

      // Heavy weight for title and tags
      const titleTokens = tokenize(chunk.title);
      titleTokens.forEach((t) => tf.set(t, (tf.get(t) || 0) + 4));

      chunk.tags.forEach((tag) => {
        const tagTokens = tokenize(tag);
        tagTokens.forEach((t) => tf.set(t, (tf.get(t) || 0) + 3));
      });

      // Content tokens
      const contentTokens = tokenize(chunk.content);
      contentTokens.forEach((t) => tf.set(t, (tf.get(t) || 0) + 1));

      docTermFreqs.push(tf);

      // Register vocabulary
      tf.forEach((_, term) => {
        if (!this.vocabulary.has(term)) {
          this.vocabulary.set(term, this.vocabulary.size);
        }
      });
    });

    // 2. Compute Inverse Document Frequencies (IDF)
    this.vocabulary.forEach((_, term) => {
      let containingDocs = 0;
      docTermFreqs.forEach((tf) => {
        if (tf.has(term)) containingDocs++;
      });
      // Standard smooth IDF formula
      const idfScore = Math.log((docCount + 1) / (containingDocs + 1)) + 1;
      this.idf.set(term, idfScore);
    });

    // 3. Construct L2-normalized vector embeddings for each document chunk
    const vocabSize = this.vocabulary.size;
    this.chunkVectors = docTermFreqs.map((tf) => {
      const vector = new Array(vocabSize).fill(0);
      let normSq = 0;

      tf.forEach((count, term) => {
        const index = this.vocabulary.get(term)!;
        const idfVal = this.idf.get(term) || 1;
        // Sublinear TF-IDF formula
        const weight = (1 + Math.log(count)) * idfVal;
        vector[index] = weight;
        normSq += weight * weight;
      });

      // Normalize to unit vector for fast cosine similarity via dot product
      const norm = Math.sqrt(normSq) || 1;
      return vector.map((w) => w / norm);
    });
  }

  /**
   * Embed query string into the indexed vector space
   */
  private embedQuery(query: string): number[] {
    const vocabSize = this.vocabulary.size;
    const vector = new Array(vocabSize).fill(0);
    const queryTokens = tokenize(query);

    if (queryTokens.length === 0) return vector;

    const tf = new Map<string, number>();
    queryTokens.forEach((t) => tf.set(t, (tf.get(t) || 0) + 1));

    let normSq = 0;
    tf.forEach((count, term) => {
      if (this.vocabulary.has(term)) {
        const index = this.vocabulary.get(term)!;
        const idfVal = this.idf.get(term) || 1;
        const weight = (1 + Math.log(count)) * idfVal;
        vector[index] = weight;
        normSq += weight * weight;
      }
    });

    const norm = Math.sqrt(normSq) || 1;
    return vector.map((w) => w / norm);
  }

  /**
   * Cosine similarity dot product between two normalized vectors
   */
  private dotProduct(vecA: number[], vecB: number[]): number {
    let dot = 0;
    for (let i = 0; i < vecA.length; i++) {
      if (vecA[i] !== 0 && vecB[i] !== 0) {
        dot += vecA[i] * vecB[i];
      }
    }
    return dot;
  }

  /**
   * Semantic Vector Search + Entity-Aware Re-ranking
   * Returns top-k most relevant KnowledgeChunks
   */
  public search(query: string, topK: number = 3): RetrievedResult[] {
    const queryVec = this.embedQuery(query);
    const lowerQuery = query.toLowerCase();

    const scored: RetrievedResult[] = this.chunks.map((chunk, idx) => {
      let score = this.dotProduct(queryVec, this.chunkVectors[idx]);

      // Direct entity boosting for exact mentions
      const titleLower = chunk.title.toLowerCase();
      if (lowerQuery.includes('leadlens') && titleLower.includes('leadlens')) score += 0.45;
      if (lowerQuery.includes('job tracker') && titleLower.includes('job tracker')) score += 0.45;
      if ((lowerQuery.includes('ava') || lowerQuery.includes('avatar')) && titleLower.includes('avatar')) score += 0.45;
      if (lowerQuery.includes('cms') && titleLower.includes('cms')) score += 0.45;
      if (lowerQuery.includes('gym') && titleLower.includes('gym')) score += 0.45;
      if ((lowerQuery.includes('prime') || lowerQuery.includes('healthcares')) && titleLower.includes('prime')) score += 0.45;
      if ((lowerQuery.includes('evitals') || lowerQuery.includes('rpm')) && titleLower.includes('evitals')) score += 0.45;
      if ((lowerQuery.includes('revive') || lowerQuery.includes('experience') || lowerQuery.includes('work')) && chunk.category === 'experience') score += 0.25;
      if ((lowerQuery.includes('skills') || lowerQuery.includes('technologies') || lowerQuery.includes('stack')) && chunk.category === 'skills') score += 0.3;
      if ((lowerQuery.includes('contact') || lowerQuery.includes('hire') || lowerQuery.includes('email')) && chunk.category === 'contact') score += 0.35;
      if ((lowerQuery.includes('who are you') || lowerQuery.includes('about you') || lowerQuery.includes('who is kashif')) && chunk.id === 'bio-intro') score += 0.4;

      return { chunk, score };
    });

    // Sort descending by relevance score
    scored.sort((a, b) => b.score - a.score);

    return scored.slice(0, topK);
  }

  /**
   * Retrieve formatted augmented context for LLM response generation
   */
  public getAugmentedContext(query: string, topK: number = 3): { contextText: string; results: RetrievedResult[] } {
    const results = this.search(query, topK);
    const contextText = results
      .map((r, i) => `[DOCUMENT CHUNK ${i + 1}: ${r.chunk.title} (Source: ${r.chunk.source})]\n${r.chunk.content}`)
      .join('\n\n');

    return { contextText, results };
  }
}

// Singleton RAG Index instance
export const ragIndex = new VectorRAGIndex();
