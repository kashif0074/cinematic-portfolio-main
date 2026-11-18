import { KNOWLEDGE_CHUNKS, type KnowledgeChunk, type ChunkCategory } from './knowledgeChunks';

export interface RetrievedResult {
  chunk: KnowledgeChunk;
  score: number;
}

export interface HybridSearchOptions {
  query: string;
  categoryFilter?: ChunkCategory[];
  idFilter?: string[];
  topK?: number;
  minScore?: number;
}

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

function tokenize(text: string): string[] {
  const clean = text
    .toLowerCase()
    .replace(/https?:\/\/[^\s]+/g, ' ')
    .replace(/[^a-z0-9_.\-#+]/g, ' ');

  const rawTokens = clean.split(/\s+/).filter((t) => t.length > 1 && !STOP_WORDS.has(t));
  const tokens: string[] = [...rawTokens];

  for (let i = 0; i < rawTokens.length - 1; i++) {
    tokens.push(`${rawTokens[i]}_${rawTokens[i + 1]}`);
  }

  return tokens;
}

export class VectorRAGIndex {
  private chunks: KnowledgeChunk[];
  private vocabulary: Map<string, number> = new Map();
  private idf: Map<string, number> = new Map();
  private chunkVectors: number[][] = [];

  constructor(chunks: KnowledgeChunk[] = KNOWLEDGE_CHUNKS) {
    this.chunks = chunks;
    this.buildIndex();
  }

  private buildIndex() {
    const docTermFreqs: Map<string, number>[] = [];
    const docCount = this.chunks.length;

    this.chunks.forEach((chunk) => {
      const tf = new Map<string, number>();

      const titleTokens = tokenize(chunk.title);
      titleTokens.forEach((t) => tf.set(t, (tf.get(t) || 0) + 4));

      chunk.tags.forEach((tag) => {
        const tagTokens = tokenize(tag);
        tagTokens.forEach((t) => tf.set(t, (tf.get(t) || 0) + 3));
      });

      const contentTokens = tokenize(chunk.content);
      contentTokens.forEach((t) => tf.set(t, (tf.get(t) || 0) + 1));

      docTermFreqs.push(tf);

      tf.forEach((_, term) => {
        if (!this.vocabulary.has(term)) {
          this.vocabulary.set(term, this.vocabulary.size);
        }
      });
    });

    this.vocabulary.forEach((_, term) => {
      let containingDocs = 0;
      docTermFreqs.forEach((tf) => {
        if (tf.has(term)) containingDocs++;
      });
      const idfScore = Math.log((docCount + 1) / (containingDocs + 1)) + 1;
      this.idf.set(term, idfScore);
    });

    const vocabSize = this.vocabulary.size;
    this.chunkVectors = docTermFreqs.map((tf) => {
      const vector = new Array(vocabSize).fill(0);
      let normSq = 0;

      tf.forEach((count, term) => {
        const index = this.vocabulary.get(term)!;
        const idfVal = this.idf.get(term) || 1;
        const weight = (1 + Math.log(count)) * idfVal;
        vector[index] = weight;
        normSq += weight * weight;
      });

      const norm = Math.sqrt(normSq) || 1;
      return vector.map((w) => w / norm);
    });
  }

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
   * Metadata-Filtered Hybrid Retrieval with Multi-Factor Reranking
   */
  public searchHybrid(options: HybridSearchOptions): RetrievedResult[] {
    const { query, categoryFilter, idFilter, topK = 3, minScore = 0.08 } = options;
    const lowerQuery = query.toLowerCase().trim();
    const queryVec = this.embedQuery(lowerQuery);
    const queryWords = lowerQuery.split(/\s+/).filter((w) => w.length > 2);

    // 1. Filter candidates by metadata
    const candidates = this.chunks
      .map((chunk, index) => ({ chunk, index }))
      .filter(({ chunk }) => {
        if (idFilter && idFilter.length > 0) {
          return idFilter.includes(chunk.id);
        }
        if (categoryFilter && categoryFilter.length > 0) {
          return categoryFilter.includes(chunk.category);
        }
        return true;
      });

    // 2. Score candidates using vector dot product + keyword boost
    const scored: RetrievedResult[] = candidates.map(({ chunk, index }) => {
      const vectorScore = this.dotProduct(queryVec, this.chunkVectors[index]);

      // Lexical term overlap in title and tags
      let lexicalBonus = 0;
      const titleLower = chunk.title.toLowerCase();
      const tagLower = chunk.tags.map((t) => t.toLowerCase());

      queryWords.forEach((word) => {
        if (titleLower.includes(word)) lexicalBonus += 0.25;
        if (tagLower.some((t) => t === word || t.includes(word))) lexicalBonus += 0.2;
      });

      // Specific entity boosts
      if (lowerQuery.includes('database') && chunk.category === 'skills_database') lexicalBonus += 0.4;
      if (lowerQuery.includes('backend') && chunk.category === 'skills_backend') lexicalBonus += 0.4;
      if (lowerQuery.includes('frontend') && chunk.category === 'skills_frontend') lexicalBonus += 0.4;
      if (lowerQuery.includes('major') && chunk.category === 'major') lexicalBonus += 0.45;
      if (lowerQuery.includes('revive') && chunk.id === 'exp-revive') lexicalBonus += 0.5;
      if (lowerQuery.includes('daraz') && chunk.id === 'exp-daraz') lexicalBonus += 0.5;
      if (lowerQuery.includes('leadlens') && chunk.subcategory === 'leadlens') lexicalBonus += 0.5;
      if (lowerQuery.includes('job tracker') && chunk.subcategory === 'job-tracker') lexicalBonus += 0.5;
      if (lowerQuery.includes('avatar') && chunk.subcategory === 'avatar-chat') lexicalBonus += 0.5;
      if (lowerQuery.includes('cms') && chunk.subcategory === 'cms') lexicalBonus += 0.5;

      const totalScore = vectorScore * 0.5 + lexicalBonus;
      return { chunk, score: totalScore };
    });

    // 3. Filter by minimum score and deduplicate by chunk ID
    const valid = scored.filter((r) => r.score >= minScore);
    valid.sort((a, b) => b.score - a.score);

    // Deduplicate
    const seenIds = new Set<string>();
    const deduplicated: RetrievedResult[] = [];
    for (const r of valid) {
      if (!seenIds.has(r.chunk.id)) {
        seenIds.add(r.chunk.id);
        deduplicated.push(r);
      }
    }

    return deduplicated.slice(0, topK);
  }

  /**
   * Retrieve formatted augmented context for LLM response generation
   */
  public getAugmentedContext(options: HybridSearchOptions): { contextText: string; results: RetrievedResult[] } {
    const results = this.searchHybrid(options);
    const contextText = results
      .map((r, i) => `[DOCUMENT CHUNK ${i + 1}: ${r.chunk.title} (Source: ${r.chunk.source})]\n${r.chunk.content}`)
      .join('\n\n');

    return { contextText, results };
  }
}

export const ragIndex = new VectorRAGIndex();
