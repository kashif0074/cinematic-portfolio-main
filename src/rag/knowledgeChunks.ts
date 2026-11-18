export type ChunkCategory =
  | 'profile'
  | 'major'
  | 'experience'
  | 'skills_ai'
  | 'skills_frontend'
  | 'skills_backend'
  | 'skills_database'
  | 'skills_devops'
  | 'project'
  | 'contact';

export interface KnowledgeChunk {
  id: string;
  title: string;
  category: ChunkCategory;
  subcategory?: string;
  source: string;
  tags: string[];
  content: string;
  url?: string;
  githubUrl?: string;
}

export const KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  // =========================================================================
  // 1. BIOGRAPHY & CORE MAJOR EXPERTISE
  // =========================================================================
  {
    id: 'bio-major',
    title: "Kashif's Major Specialization & Core Expertise",
    category: 'major',
    source: 'About Me & Specialization',
    tags: [
      'major', 'kashif major', 'specialization', 'core expertise', 'main skills', 'primary focus',
      'ai automation', 'full stack', 'healthcare', 'rpm', 'agentic ai'
    ],
    content: `Kashif Shahzad's major technical expertise centers on two closely integrated domains:
1. AI Automation Engineering & Agentic AI: Designing autonomous multi-agent workflows (LangGraph, Microsoft AutoGen), fast LLM inference (Groq), semantic vector search (pgvector), and knowledge graphs (Neo4j GraphRAG).
2. Full-Stack Web & Mobile Development: Engineering scalable SaaS platforms and decoupled enterprise systems using Next.js 16, React 19, TypeScript, Python (FastAPI/Flask), Node.js, and Docker.
His primary industry focus is Healthcare Technology and Remote Patient Monitoring (RPM), where he bridges medical diagnostic devices with real-time clinical triage dashboards and Medicare CPT billing compliance.`,
  },
  {
    id: 'bio-intro',
    title: 'About Kashif Shahzad',
    category: 'profile',
    source: 'About Me & Hero Section',
    tags: [
      'kashif', 'shahzad', 'about', 'bio', 'who is kashif', 'profile', 'engineer', 'developer',
      'background', 'overview', 'motto'
    ],
    content: `Kashif Shahzad is an AI Engineer and Full-Stack Developer building scalable web and mobile applications, SaaS platforms, and intelligent automation systems. Across the full software development lifecycle, he works with React, Next.js, TypeScript, Node.js, Python, Docker, and CI/CD pipelines. His goal is to build smarter software, automate complex workflows, and deliver reliable, high-impact digital products.`,
  },
  {
    id: 'bio-domains',
    title: 'Core Engineering Domains & Focus',
    category: 'profile',
    source: 'Core Specializations',
    tags: ['domain', 'specialization', 'healthcare', 'rpm', 'remote patient monitoring', 'full stack', 'cloud'],
    content: `Kashif operates across the full software development lifecycle:
1. Healthcare Technology & RPM: Cellular diagnostic devices, clinical triage dashboards, Medicare CPT billing compliance, and MIPS reporting.
2. Full-Stack Web & Mobile: Decoupled client-server architectures, responsive SPAs, Next.js App Router platforms, and ASP.NET Core APIs.
3. Agentic AI & RAG: Multi-agent orchestration (Microsoft AutoGen, LangGraph), vector databases (pgvector), knowledge graphs (Neo4j), and high-speed LLM inference (Groq).`,
  },

  // =========================================================================
  // 2. PROFESSIONAL EXPERIENCE
  // =========================================================================
  {
    id: 'exp-revive',
    title: 'Full-Stack & AI Engineer at Revive Medical Technologies Inc.',
    category: 'experience',
    subcategory: 'revive',
    source: 'Experience Section',
    tags: [
      'experience', 'work', 'job', 'revive', 'revive medical', 'revive medical technologies',
      'current role', 'ai engineer', 'healthcare experience'
    ],
    content: `Role: Full-Stack & AI Engineer at Revive Medical Technologies Inc. (June 2026 – Present).
Key Responsibilities and Achievements:
- AI Integration & Conversational Agents: Engineered conversational AI features, including Groq API endpoints and custom HeyGen avatar assistants, for Remote Patient Monitoring (RPM) platforms.
- Full-Stack Web Development: Developed and maintained production web applications in React, Next.js, TypeScript, Node.js, and Express.js with high performance and responsive UIs.
- Database & Backend: Managed data layers using MongoDB Atlas and PostgreSQL, optimizing queries, API routing, and backend microservice security.
Technologies: Groq API, HeyGen Avatars, React, Next.js, TypeScript, Node.js, Express.js, MongoDB Atlas, PostgreSQL.`,
  },
  {
    id: 'exp-daraz',
    title: 'Logistics Assistant at Daraz Pakistan',
    category: 'experience',
    subcategory: 'daraz',
    source: 'Experience Section',
    tags: ['experience', 'daraz', 'daraz pakistan', 'logistics', 'operations', 'history'],
    content: `Previous Role: Logistics Assistant at Daraz Pakistan (March 2022 – December 2024).
Key Responsibilities:
- Order & Shipment Management: Managed tracking, status updates, and fulfillment data through internal enterprise logistics software.
- Digital Operations: Utilized digital inventory tools to maintain order records and optimize operational pipelines.
- Technical Coordination: Coordinated between operations and technical teams to resolve processing bottlenecks.`,
  },

  // =========================================================================
  // 3. TECHNICAL SKILLS CATEGORIZED
  // =========================================================================
  {
    id: 'skills-database',
    title: 'Database Technologies & Storage Systems',
    category: 'skills_database',
    source: 'Skills Matrix - Databases',
    tags: [
      'database', 'databases', 'sql', 'nosql', 'postgres', 'postgresql', 'pgvector',
      'mongodb', 'mongo', 'redis', 'sqlite', 'neo4j', 'prisma', 'entity framework', 'ef core',
      'storage', 'vector database', 'graph database'
    ],
    content: `Kashif's database and storage stack includes:
- PostgreSQL 16 & pgvector: Primary relational database used for structured data and 384-dimensional vector embeddings with cosine similarity search.
- MongoDB Atlas: Document database used for flexible schemas, high-throughput ingestion, and decoupled microservices.
- Neo4j 5: Graph database used for GraphRAG knowledge graph traversal and technical skill relationship mapping.
- Redis: In-memory store utilized for high-speed caching and BullMQ asynchronous background queue management.
- SQLite: Embedded relational database for lightweight backends and quick local testing.
- ORMs & Query Builders: Prisma 5 ORM (Node/Next.js) and Entity Framework Core (C# / .NET).`,
  },
  {
    id: 'skills-backend',
    title: 'Backend Engineering & Frameworks',
    category: 'skills_backend',
    source: 'Skills Matrix - Backend',
    tags: [
      'backend', 'api', 'apis', 'rest', 'python', 'fastapi', 'flask', 'node', 'nodejs',
      'express', 'express.js', 'c#', 'csharp', 'asp.net', 'server', 'microservices', 'bullmq', 'websockets'
    ],
    content: `Kashif's backend development stack includes:
- Python: FastAPI and Flask for high-performance REST APIs, Gunicorn WSGI, asynchronous workers, and data processing.
- Node.js & Express.js: Event-driven server architectures, REST endpoints, WebSockets, and background job processing with BullMQ.
- C# & ASP.NET Core: Decoupled Web APIs, Entity Framework Core migrations, and clean role-based architecture.
- Background Queues & Streaming: Redis-backed BullMQ queues with exponential retries, WebSockets for live events.
- Security & Auth: JWT authentication, OAuth (Google OAuth), Next-Auth, bcrypt password hashing, and socket-level SSRF guards.`,
  },
  {
    id: 'skills-frontend',
    title: 'Frontend & Mobile Development Skills',
    category: 'skills_frontend',
    source: 'Skills Matrix - Frontend',
    tags: [
      'frontend', 'react', 'next.js', 'nextjs', 'typescript', 'javascript', 'tailwind',
      'tailwind css', 'react native', 'mobile', 'three.js', 'canvas', 'web audio'
    ],
    content: `Kashif's frontend and mobile stack includes:
- React (React 18 & 19): Component architecture, custom hooks, and modern state management.
- Next.js 16 (App Router): Server Components, SSR, dynamic routing, and Turbopack builds.
- TypeScript & Modern JavaScript: Strict typing, modern ES6+ ESM standards.
- Mobile: React Native for cross-platform iOS and Android mobile applications.
- Styling: Tailwind CSS (v3 & v4) for responsive modern interfaces.
- Interactive Graphics & Audio: HTML5 Canvas, Web Audio API amplitude envelope detection, and Three.js 3D elements.`,
  },
  {
    id: 'skills-ai',
    title: 'AI, Machine Learning & Agentic Systems',
    category: 'skills_ai',
    source: 'Skills Matrix - AI & ML',
    tags: [
      'ai', 'machine learning', 'rag', 'llm', 'agents', 'agentic ai', 'langgraph',
      'autogen', 'groq', 'vector', 'lip sync', 'edge neural', 'sentence-transformers'
    ],
    content: `Kashif's AI and machine learning stack includes:
- Agentic AI & Workflows: Multi-agent orchestration with Microsoft AutoGen (3-agent collaborative teams: Researcher, Writer, Critic) and state machines with LangGraph.
- High-Speed LLM Inference: Groq Cloud API, structured JSON-mode output, and Edge Neural voice synthesis.
- RAG & Vector Search: pgvector semantic search, local sentence-transformers, and Neo4j GraphRAG knowledge graphs.
- Autonomous Web Automation: Playwright headless browser control integrated into agent workflows.
- Audio AI: Browser-native Web Audio envelope analysis for zero-GPU lip-syncing.`,
  },
  {
    id: 'skills-devops',
    title: 'DevOps, Containers & Cloud Infrastructure',
    category: 'skills_devops',
    source: 'Skills Matrix - DevOps',
    tags: [
      'devops', 'docker', 'docker compose', 'ci/cd', 'github actions', 'render',
      'vercel', 'containers', 'pytest', 'git'
    ],
    content: `Kashif's DevOps and deployment stack includes:
- Containerization: Docker and multi-service Docker Compose setups.
- CI/CD: Automated GitHub Actions pipelines for linting, testing, and builds.
- Testing: Automated Pytest suites and unit test runners.
- Cloud & Hosting: Render, Vercel, and cloud database instances (MongoDB Atlas, Supabase/Neon PostgreSQL).
- Version Control: Git with clean branching and release hygiene.`,
  },

  // =========================================================================
  // 4. PROJECTS
  // =========================================================================
  {
    id: 'proj-leadlens',
    title: 'LeadLens (Cold Email & Lead Generation Platform)',
    category: 'project',
    subcategory: 'leadlens',
    source: 'Door 02 - Full-Stack Web Apps',
    tags: ['project', 'leadlens', 'next.js 16', 'react 19', 'bullmq', 'redis', 'prisma', 'saas', 'live'],
    url: 'https://leadlens-ziff.onrender.com',
    githubUrl: 'https://github.com/kashif0074/Leadlens',
    content: `LeadLens is a full-stack email outreach and lead tracking web application.
Live URL: https://leadlens-ziff.onrender.com
GitHub: https://github.com/kashif0074/Leadlens
Purpose & Architecture:
- Next.js 16 App Router (React 19) with server-side rendering, dynamic API routes, and Turbopack.
- Asynchronous BullMQ background worker queues on Redis for reliable email scheduling and automatic retries.
- Next-Auth with Google OAuth & Gmail delivery via Nodemailer.
- Prisma 5 ORM with PostgreSQL and MongoDB schema migrations.
Technologies: Next.js 16, React 19, TypeScript, Tailwind CSS, Prisma 5, BullMQ, Redis, PostgreSQL, Next-Auth, Nodemailer.`,
  },
  {
    id: 'proj-job-tracker',
    title: 'The AI Engineer Job Tracker (Job Tracker API)',
    category: 'project',
    subcategory: 'job-tracker',
    source: 'Door 03 - Agentic AI Platform',
    tags: ['project', 'job tracker', 'ai engineer', 'agentic ai', 'autogen', 'langgraph', 'pgvector', 'neo4j', 'fastapi'],
    githubUrl: 'https://github.com/kashif0074/job-tracker-api',
    content: `The AI Engineer Job Tracker is an Agentic AI application for tracking job opportunities and optimizing applications.
GitHub: https://github.com/kashif0074/job-tracker-api
Purpose & Core Architecture:
- Autonomous Browser Scraper: LangGraph state machine with headless Playwright to scrape job postings and extract requirements.
- Multi-Agent Orchestration: 3-agent Microsoft AutoGen crew (Researcher, Writer, Critic) drafting and refining tailored cover letters.
- Semantic Vector Search: 384-dimensional resume embeddings via local sentence-transformers matched in pgvector.
- GraphRAG Knowledge Graph: Neo4j 5 graph traversal to discover co-occurring technical skills across job markets.
- Structured LLM Extraction: Groq LLM with strict JSON schemas.
Technologies: Python 3.12, FastAPI, Next.js 14, TypeScript, PostgreSQL 16, pgvector, Neo4j 5, LangGraph, AutoGen, Playwright, Docker Compose, Pytest.`,
  },
  {
    id: 'proj-avatar-chat',
    title: 'Avatar Chat (Ava Voice Assistant)',
    category: 'project',
    subcategory: 'avatar-chat',
    source: 'Door 04 - Real-Time AI Systems',
    tags: ['project', 'avatar chat', 'ava', 'voice assistant', 'lip sync', 'edge neural tts', 'zero gpu', 'live'],
    url: 'https://ava-avatar-chat.onrender.com/',
    githubUrl: 'https://github.com/kashif0074/avatar-chat',
    content: `Avatar Chat is a conversational talking-avatar AI assistant that runs directly in the browser without cloud GPUs.
Live URL: https://ava-avatar-chat.onrender.com/
GitHub: https://github.com/kashif0074/avatar-chat
Purpose & Architecture:
- Client-Side Lip Sync: Analyzes audio amplitude envelopes in the browser using the Web Audio API and renders frames on HTML5 Canvas.
- Natural Voice Output: Microsoft Edge Neural TTS with browser speech fallback.
- Low-Latency Conversational AI: Powered by Groq LLM inference for sub-second responses with synchronized word-by-word subtitles.
- RAG Ready: Context injection pipeline with PostgreSQL and pgvector.
Technologies: JavaScript (ES6+), HTML5 Canvas, Web Audio API, Web Speech API, Node.js, WebSockets, Groq Cloud API, Edge Neural TTS, PostgreSQL, pgvector.`,
  },
  {
    id: 'proj-cms-provider-directory',
    title: 'CMS Medicare Provider Directory & Intelligence Engine',
    category: 'project',
    subcategory: 'cms',
    source: 'Door 04 - Healthcare Data Systems',
    tags: ['project', 'cms provider directory', 'medicare', 'python', 'flask', 'contact intelligence', 'email discovery', 'live'],
    url: 'https://cms-provider-directory.onrender.com/',
    githubUrl: 'https://github.com/kashif0074/cms-provider-directory',
    content: `CMS Medicare Provider Directory is a search platform querying over 2 million live CMS Medicare provider records.
Live URL: https://cms-provider-directory.onrender.com/
GitHub: https://github.com/kashif0074/cms-provider-directory
Purpose & Architecture:
- Searches and paginates over 2M+ records via the official CMS DataStore API.
- Automated 5-step contact research pipeline identifying clinic websites, hospital affiliations, and verified public work emails.
- Strict anti-guessing policy with aggregator filtering (20+ directories blocked) and socket-level SSRF protection.
- In-memory query caching and streaming CSV/JSON export.
Technologies: Python 3.13, Flask 3.1, Gunicorn, CMS DataStore API, Tavily Search API, Google Custom Search API, Vanilla JavaScript.`,
  },
  {
    id: 'proj-prime-healthcares',
    title: 'Prime Healthcares LLC (Live Website)',
    category: 'project',
    subcategory: 'prime-healthcares',
    source: 'Door 01 - Healthcare Platforms',
    tags: ['project', 'prime healthcares', 'healthcare', 'mips', 'billing', 'live', 'website'],
    url: 'https://primehealthcaresllc.com/',
    content: `Prime Healthcares LLC is a live healthcare consultancy web platform.
URL: https://primehealthcaresllc.com/
Purpose & Functionality:
- Built for American medical practices to manage MIPS registry data submission, billing workflows, and revenue cycle management.
- Supports Accountable Care Organization (ACO) compliance reporting.
- Features a responsive, accessible interface tailored for healthcare administration.
Technologies: React, Next.js, TypeScript, Tailwind CSS.`,
  },
  {
    id: 'proj-evitals-rpm',
    title: 'eVitals RPM (Live Platform)',
    category: 'project',
    subcategory: 'evitals-rpm',
    source: 'Door 01 - Healthcare Platforms',
    tags: ['project', 'evitals', 'evitals rpm', 'telehealth', 'remote patient monitoring', 'cellular', 'live'],
    url: 'https://www.evitalsrpm.com/',
    content: `eVitals RPM is a live Remote Patient Monitoring (RPM) and Chronic Care Management (CCM) platform.
URL: https://www.evitalsrpm.com/
Purpose & Functionality:
- Pairs cellular health monitoring devices directly with clinician review dashboards with zero patient setup required.
- Provides a prioritized clinical triage dashboard for incoming vital signs.
- Automatically tracks Medicare RPM and CCM CPT codes for clinical billing compliance.
Technologies: React, TypeScript, Node.js, PostgreSQL.`,
  },
  {
    id: 'proj-gym-management',
    title: 'Gym Management System',
    category: 'project',
    subcategory: 'gym-management',
    source: 'Door 02 - Full-Stack Web Apps',
    tags: ['project', 'gym management', 'asp.net core', 'c#', 'react 18', 'typescript', 'ef core', 'docker'],
    githubUrl: 'https://github.com/kashif0074/Gymmanagementsystem',
    content: `Gym Management System is a full-stack facility operations platform.
GitHub: https://github.com/kashif0074/Gymmanagementsystem
Purpose & Architecture:
- Decoupled architecture: ASP.NET Core Web API backend and React 18 TypeScript frontend (Vite SPA).
- Dual portals: Public landing page for member plan discovery and a role-based admin dashboard.
- Member attendance check-in/out logging, class scheduling, and subscription billing flows.
- Entity Framework Core migrations with database seeding.
Technologies: ASP.NET Core, C#, React 18, TypeScript, Entity Framework Core, SQLite, Vite, Tailwind CSS, Docker.`,
  },

  // =========================================================================
  // 5. CONTACT & COLLABORATION
  // =========================================================================
  {
    id: 'contact-info',
    title: 'Contact & Collaboration Details',
    category: 'contact',
    source: 'Contact Section',
    tags: ['contact', 'email', 'phone', 'whatsapp', 'linkedin', 'hire', 'collaborate', 'message', 'touch', 'github'],
    content: `Contact Kashif Shahzad:
- Email: malik.kaxif7@gmail.com
- Phone / WhatsApp: +923445089014
- LinkedIn: https://www.linkedin.com/in/kashif-shahzad-581297369
- GitHub: https://github.com/kashif0074
Availability: Open to full-stack engineering roles, Agentic AI development, and healthcare automation consulting.`,
  },
];
