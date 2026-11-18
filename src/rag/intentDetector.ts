import type { ChatMessage } from './responseGenerator';
import type { ChunkCategory } from './knowledgeChunks';

export type UserIntent =
  | 'greeting'
  | 'smalltalk'
  | 'gratitude'
  | 'farewell'
  | 'continuation_transition'
  | 'major_inquiry'
  | 'database_inquiry'
  | 'backend_inquiry'
  | 'frontend_inquiry'
  | 'devops_inquiry'
  | 'ai_inquiry'
  | 'experience_inquiry'
  | 'project_inquiry'
  | 'contact_inquiry'
  | 'portfolio_followup'
  | 'general_tech'
  | 'general_chat';

export interface ClassificationResult {
  intent: UserIntent;
  shouldRetrieveRAG: boolean;
  categoryFilter?: ChunkCategory[];
  idFilter?: string[];
  topicHint?: string;
}

const GREETING_REGEX = /^(hi|hello|hey|heyy|heya|howdy|yo|greetings|good\s+(morning|afternoon|evening|day))([!.,?\s]|$)/i;
const SMALLTALK_REGEX = /^(how\s+are\s+you|how\s+r\s+u|how\s+you\s+doing|how's\s+it\s+going|how\s+is\s+it\s+going|what's\s+up|wassup|who\s+are\s+you|what\s+can\s+you\s+do|what\s+are\s+you)([!.,?\s]|$)/i;
const GRATITUDE_REGEX = /^(thank\s+you|thanks|thx|thank\s+u|appreciate\s+it|many\s+thanks)([!.,?\s]|$)/i;
const FAREWELL_REGEX = /^(bye|goodbye|see\s+you|cya|take\s+care|have\s+a\s+good\s+day|farewell)([!.,?\s]|$)/i;
const TRANSITION_REGEX = /^(now|and\s+now|what\s+now|what's\s+next|next|where\s+to\s+now|so\s+now|continue)([!.,?\s]|$)/i;

/**
 * Inspect recent conversation turns to extract previous topic or project
 */
export function getPreviousTopic(history: ChatMessage[]): {
  id?: string;
  category?: ChunkCategory;
  name?: string;
} | null {
  if (!history || history.length === 0) return null;

  const recent = history.slice(-3);
  for (let i = recent.length - 1; i >= 0; i--) {
    const text = recent[i].text.toLowerCase();

    if (text.includes('leadlens')) return { id: 'proj-leadlens', category: 'project', name: 'LeadLens' };
    if (text.includes('job tracker')) return { id: 'proj-job-tracker', category: 'project', name: 'The AI Engineer Job Tracker' };
    if (text.includes('avatar') || text.includes('ava')) return { id: 'proj-avatar-chat', category: 'project', name: 'Avatar Chat Ava' };
    if (text.includes('cms') || text.includes('medicare')) return { id: 'proj-cms-provider-directory', category: 'project', name: 'CMS Medicare Directory' };
    if (text.includes('prime healthcares')) return { id: 'proj-prime-healthcares', category: 'project', name: 'Prime Healthcares' };
    if (text.includes('evitals') || text.includes('rpm')) return { id: 'proj-evitals-rpm', category: 'project', name: 'eVitals RPM' };
    if (text.includes('gym')) return { id: 'proj-gym-management', category: 'project', name: 'Gym Management System' };
    if (text.includes('revive')) return { id: 'exp-revive', category: 'experience', name: 'Revive Medical Technologies' };
    if (text.includes('database')) return { id: 'skills-database', category: 'skills_database', name: 'Databases' };
    if (text.includes('backend')) return { id: 'skills-backend', category: 'skills_backend', name: 'Backend Engineering' };
  }
  return null;
}

/**
 * Classifies query with metadata-driven target categories
 */
export function classifyQuery(query: string, history: ChatMessage[] = []): ClassificationResult {
  const clean = query.trim().toLowerCase().replace(/[?!.,]+$/, '');

  // 1. Transition words (e.g. "Now", "What now", "Next")
  if (TRANSITION_REGEX.test(clean)) {
    return {
      intent: 'continuation_transition',
      shouldRetrieveRAG: false,
    };
  }

  // 2. Greetings
  if (GREETING_REGEX.test(clean) && clean.split(/\s+/).length <= 3) {
    return {
      intent: 'greeting',
      shouldRetrieveRAG: false,
    };
  }

  // 3. Small talk
  if (SMALLTALK_REGEX.test(clean)) {
    return {
      intent: 'smalltalk',
      shouldRetrieveRAG: false,
    };
  }

  // 4. Gratitude
  if (GRATITUDE_REGEX.test(clean)) {
    return {
      intent: 'gratitude',
      shouldRetrieveRAG: false,
    };
  }

  // 5. Farewell
  if (FAREWELL_REGEX.test(clean)) {
    return {
      intent: 'farewell',
      shouldRetrieveRAG: false,
    };
  }

  // 6. SPECIFIC PROJECTS (Checked FIRST so "Job Tracker API" routes to Job Tracker, not generic Backend/API)
  if (clean.includes('job tracker') || clean.includes('job-tracker')) {
    return {
      intent: 'project_inquiry',
      shouldRetrieveRAG: true,
      categoryFilter: ['project'],
      idFilter: ['proj-job-tracker'],
      topicHint: 'the ai engineer job tracker autogen langgraph pgvector neo4j',
    };
  }

  if (clean.includes('leadlens')) {
    return {
      intent: 'project_inquiry',
      shouldRetrieveRAG: true,
      categoryFilter: ['project'],
      idFilter: ['proj-leadlens'],
      topicHint: 'leadlens cold email queue nextjs 16 bullmq redis',
    };
  }

  if (clean.includes('avatar') || clean.includes('ava') || clean.includes('lip sync')) {
    return {
      intent: 'project_inquiry',
      shouldRetrieveRAG: true,
      categoryFilter: ['project'],
      idFilter: ['proj-avatar-chat'],
      topicHint: 'avatar chat ava voice assistant lip sync edge neural groq',
    };
  }

  if (clean.includes('cms') || clean.includes('medicare') || clean.includes('provider directory')) {
    return {
      intent: 'project_inquiry',
      shouldRetrieveRAG: true,
      categoryFilter: ['project'],
      idFilter: ['proj-cms-provider-directory'],
      topicHint: 'cms medicare provider directory python flask contact research',
    };
  }

  if (clean.includes('prime healthcares') || clean.includes('prime healthcare')) {
    return {
      intent: 'project_inquiry',
      shouldRetrieveRAG: true,
      categoryFilter: ['project'],
      idFilter: ['proj-prime-healthcares'],
      topicHint: 'prime healthcares medical consultancy mips reporting',
    };
  }

  if (clean.includes('evitals') || clean.includes('rpm')) {
    return {
      intent: 'project_inquiry',
      shouldRetrieveRAG: true,
      categoryFilter: ['project'],
      idFilter: ['proj-evitals-rpm'],
      topicHint: 'evitals rpm remote patient monitoring cellular devices',
    };
  }

  if (clean.includes('gym')) {
    return {
      intent: 'project_inquiry',
      shouldRetrieveRAG: true,
      categoryFilter: ['project'],
      idFilter: ['proj-gym-management'],
      topicHint: 'gym management system asp.net core react attendance',
    };
  }

  // 7. SPECIFIC WORK EXPERIENCE (e.g. "work experience tell revive medical technologies")
  if (clean.includes('revive') || clean.includes('revive medical')) {
    return {
      intent: 'experience_inquiry',
      shouldRetrieveRAG: true,
      categoryFilter: ['experience'],
      idFilter: ['exp-revive'],
      topicHint: 'revive medical technologies full stack ai engineer',
    };
  }

  if (clean.includes('daraz')) {
    return {
      intent: 'experience_inquiry',
      shouldRetrieveRAG: true,
      categoryFilter: ['experience'],
      idFilter: ['exp-daraz'],
      topicHint: 'daraz pakistan logistics assistant',
    };
  }

  if (
    clean === 'experience' ||
    clean === 'work experience' ||
    clean.includes('experience') ||
    clean.includes('career') ||
    clean.includes('work history') ||
    clean.includes('employment')
  ) {
    return {
      intent: 'experience_inquiry',
      shouldRetrieveRAG: true,
      categoryFilter: ['experience'],
      idFilter: ['exp-revive', 'exp-daraz'],
      topicHint: 'professional work experience revive medical technologies daraz',
    };
  }

  // 8. MAJOR / CORE SPECIALIZATION (e.g. "Kashif major", "major", "what is his major")
  if (
    clean === 'kashif major' ||
    clean === 'major' ||
    clean.includes('major') ||
    clean.includes('specialization') ||
    clean.includes('main expertise') ||
    clean.includes('primary focus')
  ) {
    return {
      intent: 'major_inquiry',
      shouldRetrieveRAG: true,
      categoryFilter: ['major'],
      idFilter: ['bio-major'],
      topicHint: 'kashif major specialization core expertise',
    };
  }

  // 9. DATABASE SPECIFIC INQUIRIES (e.g. "Database", "what database", "databases")
  if (
    clean === 'database' ||
    clean === 'databases' ||
    clean.includes('database') ||
    clean.includes('databases') ||
    /\bdb\b/.test(clean) ||
    clean.includes('postgres') ||
    clean.includes('mongodb') ||
    clean.includes('sqlite') ||
    clean.includes('redis') ||
    clean.includes('neo4j')
  ) {
    return {
      intent: 'database_inquiry',
      shouldRetrieveRAG: true,
      categoryFilter: ['skills_database'],
      idFilter: ['skills-database'],
      topicHint: 'database technologies postgres mongodb redis neo4j sqlite',
    };
  }

  // 10. BACKEND SPECIFIC INQUIRIES (e.g. "Backend", "what backend")
  if (
    clean === 'backend' ||
    clean === 'backends' ||
    clean.includes('backend') ||
    /\bapi\b/.test(clean) ||
    /\bapis\b/.test(clean) ||
    clean.includes('fastapi') ||
    clean.includes('express') ||
    clean.includes('asp.net')
  ) {
    return {
      intent: 'backend_inquiry',
      shouldRetrieveRAG: true,
      categoryFilter: ['skills_backend'],
      idFilter: ['skills-backend'],
      topicHint: 'backend engineering python fastapi nodejs express c# asp.net',
    };
  }

  // 11. FRONTEND SPECIFIC INQUIRIES (e.g. "Frontend", "UI", "React")
  if (
    clean === 'frontend' ||
    clean.includes('frontend') ||
    clean.includes('ui') ||
    clean.includes('react native') ||
    clean.includes('tailwind')
  ) {
    return {
      intent: 'frontend_inquiry',
      shouldRetrieveRAG: true,
      categoryFilter: ['skills_frontend'],
      idFilter: ['skills-frontend'],
      topicHint: 'frontend react nextjs typescript tailwind react native',
    };
  }

  // 12. DEVOPS SPECIFIC INQUIRIES
  if (
    clean === 'devops' ||
    clean.includes('devops') ||
    clean.includes('docker') ||
    clean.includes('ci/cd') ||
    clean.includes('cicd') ||
    clean.includes('containers')
  ) {
    return {
      intent: 'devops_inquiry',
      shouldRetrieveRAG: true,
      categoryFilter: ['skills_devops'],
      idFilter: ['skills-devops'],
      topicHint: 'devops docker ci/cd github actions deployment containers',
    };
  }

  // 13. AI / ML / AGENTIC SPECIFIC INQUIRIES
  if (
    clean.includes('agentic') ||
    clean.includes('autogen') ||
    clean.includes('langgraph') ||
    clean.includes('agent') ||
    clean.includes('rag')
  ) {
    return {
      intent: 'ai_inquiry',
      shouldRetrieveRAG: true,
      categoryFilter: ['skills_ai'],
      idFilter: ['skills-ai'],
      topicHint: 'agentic ai autogen langgraph groq llm rag vector',
    };
  }

  // 14. CONTACT & HIRING INQUIRIES
  if (
    clean.includes('contact') ||
    clean.includes('hire') ||
    clean.includes('email') ||
    clean.includes('phone') ||
    clean.includes('whatsapp') ||
    clean.includes('linkedin') ||
    clean.includes('github')
  ) {
    return {
      intent: 'contact_inquiry',
      shouldRetrieveRAG: true,
      categoryFilter: ['contact'],
      idFilter: ['contact-info'],
      topicHint: 'contact email phone whatsapp linkedin github',
    };
  }

  // 15. CHECK FOR CONTEXTUAL FOLLOW-UP IF CONVERSATION IS ONGOING
  const prev = getPreviousTopic(history);
  if (prev) {
    const isFollowup =
      clean.split(/\s+/).length <= 5 ||
      clean.includes('it') ||
      clean.includes('its') ||
      clean.includes('that') ||
      clean.includes('link') ||
      clean.includes('github') ||
      clean.includes('more');

    if (isFollowup) {
      return {
        intent: 'portfolio_followup',
        shouldRetrieveRAG: true,
        categoryFilter: prev.category ? [prev.category] : undefined,
        idFilter: prev.id ? [prev.id] : undefined,
        topicHint: `${clean} ${prev.name || ''}`,
      };
    }
  }

  // 16. GENERAL TECHNICAL QUESTIONS
  const techStarters = ['what is', 'how does', 'explain', 'difference between', 'how to', 'why use'];
  if (techStarters.some((starter) => clean.startsWith(starter))) {
    return {
      intent: 'general_tech',
      shouldRetrieveRAG: false,
    };
  }

  // 17. DEFAULT OPEN INQUIRY ABOUT KASHIF OR GENERAL PORTFOLIO
  if (clean.includes('kashif') || clean.includes('portfolio') || clean.includes('who are you') || clean.includes('about')) {
    return {
      intent: 'project_inquiry',
      shouldRetrieveRAG: true,
      categoryFilter: ['profile', 'major'],
      idFilter: ['bio-intro', 'bio-major'],
      topicHint: 'about kashif shahzad profile major expertise',
    };
  }

  return {
    intent: 'general_chat',
    shouldRetrieveRAG: false,
  };
}
