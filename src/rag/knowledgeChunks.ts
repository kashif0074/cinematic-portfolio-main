export interface KnowledgeChunk {
  id: string;
  title: string;
  category: 'profile' | 'experience' | 'skills' | 'project' | 'contact' | 'architecture';
  source: string;
  tags: string[];
  content: string;
  url?: string;
  githubUrl?: string;
}

export const KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  // =========================================================================
  // 1. BIOGRAPHY & PROFESSIONAL PROFILE
  // =========================================================================
  {
    id: 'bio-intro',
    title: 'About Kashif Shahzad',
    category: 'profile',
    source: 'About Me & Hero Section',
    tags: ['kashif', 'shahzad', 'about', 'bio', 'role', 'title', 'developer', 'engineer', 'ai'],
    content: `Kashif Shahzad is an AI Automation Engineer and Full-Stack Developer passionate about building intelligent software solutions that solve real-world problems. His motto is: "I don't just write code. I build what's next. My goal is to build smarter software, automate complex processes, and turn innovative ideas into practical technology solutions." He specializes in developing scalable web applications, AI-powered automation systems, and SaaS platforms, with a strong domain focus on healthcare technology, Remote Patient Monitoring (RPM), and multi-agent workflows.`,
  },
  {
    id: 'bio-domains',
    title: 'Core Engineering Domains & Focus',
    category: 'profile',
    source: 'Core Specializations',
    tags: ['domain', 'specialization', 'healthcare', 'rpm', 'remote patient monitoring', 'full stack', 'cloud'],
    content: `Kashif operates across the full software development lifecycle—from designing intuitive user interfaces to constructing secure backend systems and integrating cutting-edge conversational AI capabilities. His core domains include:
1. Healthcare Technology & Remote Patient Monitoring (RPM): Cellular medical devices, clinical review triage dashboards, Medicare CPT billing compliance, and MIPS reporting.
2. Full-Stack Web Development: Decoupled client-server architectures, responsive SPAs, Next.js App Router SSR platforms, and ASP.NET Core APIs.
3. Agentic AI & RAG: Multi-agent orchestration (Microsoft AutoGen, LangGraph), vector databases (pgvector), knowledge graphs (Neo4j), and high-speed LLM inference (Groq).`,
  },

  // =========================================================================
  // 2. PROFESSIONAL EXPERIENCE
  // =========================================================================
  {
    id: 'exp-revive',
    title: 'Full-Stack & AI Engineer at Revive Medical Technologies Inc.',
    category: 'experience',
    source: 'Experience Section',
    tags: ['experience', 'job', 'revive', 'revive medical technologies', 'current role', 'ai engineer'],
    content: `Current Role: Full-Stack & AI Engineer at Revive Medical Technologies Inc. (June 2026 – Present).
Key Responsibilities and Achievements:
- AI Integration & Conversational Agents: Engineered and integrated advanced conversational AI features, including Groq API endpoints and custom HeyGen voice/video avatar chat assistants, into Remote Patient Monitoring (RPM) platforms.
- Full-Stack Web Development: Designed, developed, and maintained production-grade web applications using React, Next.js, TypeScript, Node.js, and Express.js, ensuring high performance, responsive UI, and secure APIs.
- Database & Architecture: Managed robust data layers using MongoDB Atlas and PostgreSQL, optimizing API routing, queries, and securing backend microservices.
Technologies: Groq API, HeyGen Avatars, React, Next.js, TypeScript, Node.js, Express.js, MongoDB Atlas, PostgreSQL.`,
  },
  {
    id: 'exp-daraz',
    title: 'Logistics Assistant at Daraz Pakistan',
    category: 'experience',
    source: 'Experience Section',
    tags: ['experience', 'daraz', 'daraz pakistan', 'logistics', 'operations', 'history'],
    content: `Previous Experience: Logistics Assistant at Daraz Pakistan (May 2022 – April 2025).
Key Responsibilities:
- Order & Shipment Management: Managed order tracking, shipment updates, and delivery status through internal enterprise software.
- Digital Operations: Used digital platforms to maintain inventory, order records, and operational data.
- Technical Coordination: Coordinated between technical and logistics teams to resolve order-processing bottlenecks.
Skills: Logistics Management, Shipment Tracking, Inventory Systems, Operations Workflow.`,
  },

  // =========================================================================
  // 3. TECHNICAL SKILLS & COMPETENCIES
  // =========================================================================
  {
    id: 'skills-ai',
    title: 'AI, Machine Learning & Automation Skills',
    category: 'skills',
    source: 'Skills Matrix',
    tags: ['skills', 'ai', 'machine learning', 'rag', 'llm', 'agents', 'langgraph', 'autogen', 'groq', 'vector'],
    content: `Kashif's AI & Automation stack includes:
- LLM Integration & Tool Calling (Groq Cloud API, LLaMA 3, OpenAI, Edge Neural)
- Retrieval-Augmented Generation (RAG) using pgvector and semantic vector search
- Multi-Agent Orchestration with Microsoft AutoGen (3-agent collaborative teams: Researcher, Writer, Critic)
- Autonomous Agent State Machines with LangGraph and Playwright browser automation
- Knowledge Graphs & GraphRAG with Neo4j 5
- Machine Learning & Vector Math: sentence-transformers, Scikit-learn, Pandas, Cosine Similarity
- Zero-GPU Web Audio lip-syncing and Canvas blitting algorithms.`,
  },
  {
    id: 'skills-frontend',
    title: 'Frontend Development Skills',
    category: 'skills',
    source: 'Skills Matrix',
    tags: ['skills', 'frontend', 'react', 'next.js', 'typescript', 'javascript', 'tailwind', 'three.js', 'css'],
    content: `Kashif's Frontend stack includes:
- React.js (Expert level, React 18 & 19)
- Next.js (App Router, Server Components, SSR, Turbopack)
- TypeScript & Modern JavaScript (ES6+ / ESM)
- Tailwind CSS (v3 and v4)
- React Native (cross-platform mobile applications)
- Three.js & WebGL 3D immersion
- HTML5 Canvas & Web Audio API (real-time audio envelope detection and dynamic subtitles).`,
  },
  {
    id: 'skills-backend-db',
    title: 'Backend, Databases & DevOps Skills',
    category: 'skills',
    source: 'Skills Matrix',
    tags: ['skills', 'backend', 'node.js', 'express', 'python', 'fastapi', 'flask', 'c#', 'asp.net', 'sql', 'postgres', 'docker'],
    content: `Kashif's Backend, Database & DevOps stack includes:
- Python (FastAPI, Flask, Gunicorn, SQLAlchemy, Alembic, requests)
- Node.js & Express.js (REST APIs, WebSockets, BullMQ background queues)
- C# & ASP.NET Core Web API (Entity Framework Core migrations)
- Relational Databases: PostgreSQL 16 (with pgvector), MySQL, SQLite
- Document & Graph Databases: MongoDB Atlas, Neo4j 5
- Cache & Job Queues: Redis, BullMQ with exponential backoff retries
- Security & Auth: JWT, OAuth (Google OAuth), Passlib Bcrypt, Next-Auth, socket SSRF guards
- DevOps & Tools: Docker, Docker Compose, Git, GitHub Actions (CI/CD), Pytest, Vercel, Render.com.`,
  },

  // =========================================================================
  // 4. DOOR 01: HEALTHCARE PLATFORMS
  // =========================================================================
  {
    id: 'proj-prime-healthcares',
    title: 'Prime Healthcares LLC (Live Website)',
    category: 'project',
    source: 'Door 01 - Healthcare Platforms',
    tags: ['project', 'prime healthcares', 'healthcare', 'mips', 'billing', 'live', 'website'],
    url: 'https://primehealthcaresllc.com/',
    content: `Prime Healthcares LLC is a live American healthcare business consultancy web platform.
URL: https://primehealthcaresllc.com/ (Live in production)
Purpose & Scope:
- Provides Qualified MIPS clinical registry reporting, medical billing, and revenue cycle management.
- Handles Accountable Care Organization (ACO) quality compliance for clinical practices across the United States.
- Clean, responsive user interface with direct live website access.
Technologies: React, Next.js, TypeScript, Tailwind CSS.`,
  },
  {
    id: 'proj-evitals-rpm',
    title: 'eVitals RPM (Live Platform)',
    category: 'project',
    source: 'Door 01 - Healthcare Platforms',
    tags: ['project', 'evitals', 'evitals rpm', 'telehealth', 'remote patient monitoring', 'cellular', 'live'],
    url: 'https://www.evitalsrpm.com/',
    content: `eVitals RPM is a live turnkey Remote Patient Monitoring (RPM) and Chronic Care Management (CCM) platform.
URL: https://www.evitalsrpm.com/ (Live in production)
Purpose & Scope:
- Connects FDA-cleared cellular diagnostic devices directly to clinician review dashboards with zero patient setup required.
- Features a prioritized clinician triage dashboard and automated Medicare RPM/CCM CPT billing compliance tracking.
- Secure clinician workflow integration and healthcare compliance.
Technologies: React, TypeScript, Node.js, PostgreSQL.`,
  },

  // =========================================================================
  // 5. DOOR 02: FULL-STACK WEB APPLICATIONS
  // =========================================================================
  {
    id: 'proj-leadlens',
    title: 'LeadLens (Enterprise SaaS Platform)',
    category: 'project',
    source: 'Door 02 - Full-Stack Web Apps',
    tags: ['project', 'leadlens', 'next.js 16', 'react 19', 'bullmq', 'redis', 'prisma', 'saas', 'live'],
    url: 'https://leadlens-ziff.onrender.com',
    githubUrl: 'https://github.com/kashif0074/Leadlens',
    content: `LeadLens is an enterprise full-stack web application designed for lead generation and automated email campaigns.
Live URL: https://leadlens-ziff.onrender.com
GitHub: https://github.com/kashif0074/Leadlens
Architectural Breakdown:
- Built with Next.js 16 (React 19) App Router utilizing server-side rendering (SSR), dynamic API routes, and Turbopack.
- Background worker architecture: BullMQ with Redis-backed job queues for asynchronous email delivery, scheduling, and exponential retry handling.
- Authentication & Security: Next-Auth with Google OAuth & Gmail API integration via googleapis and Nodemailer.
- Database & ORM: Prisma 5 ORM with schema migrations for PostgreSQL and MongoDB.
- Note: This is strictly an enterprise Web Application.`,
  },
  {
    id: 'proj-gym-management',
    title: 'Gym Management System',
    category: 'project',
    source: 'Door 02 - Full-Stack Web Apps',
    tags: ['project', 'gym management', 'asp.net core', 'c#', 'react 18', 'typescript', 'ef core', 'docker'],
    githubUrl: 'https://github.com/kashif0074/Gymmanagementsystem',
    content: `Gym Management System is an enterprise-grade full-stack web application designed to streamline gym operations, member subscriptions, class scheduling, attendance logging, and billing.
GitHub: https://github.com/kashif0074/Gymmanagementsystem
Architectural Breakdown:
- Decoupled Architecture: ASP.NET Core Web API on the backend and React 18 with TypeScript on the frontend (Vite SPA).
- Dual-Portal Design: Public-facing landing page for member plan discovery and registration, alongside a secure role-based administrative dashboard.
- Key Capabilities: Member check-in/out attendance logging with capacity tracking (/api/attendance), subscription billing workflows, and Entity Framework Core migrations with database seeding.
Technologies: ASP.NET Core, C#, React 18, TypeScript, Entity Framework Core, SQL / SQLite, Vite, Tailwind CSS, Docker.`,
  },

  // =========================================================================
  // 6. DOOR 03: AGENTIC AI PLATFORM
  // =========================================================================
  {
    id: 'proj-job-tracker',
    title: 'The AI Engineer Job Tracker (Job Tracker API)',
    category: 'project',
    source: 'Door 03 - Agentic AI Platform',
    tags: ['project', 'job tracker', 'ai engineer', 'agentic ai', 'autogen', 'langgraph', 'pgvector', 'neo4j', 'fastapi'],
    githubUrl: 'https://github.com/kashif0074/job-tracker-api',
    content: `The AI Engineer Job Tracker is a production-grade, multi-tenant Agentic AI application combining Vector Search, Knowledge Graphs, Browser Automation, and Multi-Agent Orchestration.
GitHub: https://github.com/kashif0074/job-tracker-api
5 Core AI Paradigms Integrated:
1. LLM Skill Extraction: Sends job descriptions to Groq LLM with strict JSON-mode system prompts to parse structured technical competencies.
2. Semantic Search (RAG): Generates 384-dimensional vector embeddings using local sentence-transformers (zero API cost) and calculates Cosine Similarity against pgvector embeddings.
3. GraphRAG Knowledge Graph: Traverses Neo4j 5 relationships (Job)-[:REQUIRES]->(Skill) to find co-occurring technical skills across postings.
4. Autonomous Scraper (LangGraph): State machine where the LLM plans a strategy, runs a headless Playwright browser to scrape job postings (bypassing bot protections), extracts skills, and saves records.
5. Multi-Agent Orchestration (Microsoft AutoGen): 3-agent crew (Researcher, Writer, Critic) iteratively drafting, reviewing, and approving customized cover letters.
Full Tech Stack: Python 3.12, FastAPI, Next.js 14, PostgreSQL 16, pgvector, Neo4j 5, LangGraph, AutoGen, Playwright, Docker Compose (3 services), 22 Pytest unit tests passing on GitHub Actions.`,
  },

  // =========================================================================
  // 7. DOOR 04: REAL-TIME AI & HEALTHCARE SYSTEMS
  // =========================================================================
  {
    id: 'proj-avatar-chat',
    title: 'Avatar Chat (Ava Voice Assistant)',
    category: 'project',
    source: 'Door 04 - Production Web Platforms',
    tags: ['project', 'avatar chat', 'ava', 'voice assistant', 'lip sync', 'edge neural tts', 'zero gpu', 'live'],
    url: 'https://ava-avatar-chat.onrender.com/',
    githubUrl: 'https://github.com/kashif0074/avatar-chat',
    content: `Avatar Chat (Ava Voice Assistant) is a lightweight, zero-GPU, real-time talking-avatar AI assistant.
Live URL: https://ava-avatar-chat.onrender.com/
GitHub: https://github.com/kashif0074/avatar-chat
Key Highlights & Architecture:
- Zero-GPU Client-Side Lip Sync: Blits between idle frames and talking video clips using the browser's native Web Audio API (envelope analysis) and HTML5 Canvas, bypassing expensive cloud 3D engines.
- Natural Dual-Tier Neural TTS: Microsoft Edge Neural Voices (en-US-AvaNeural) with Groq Orpheus TTS fallback and local browser SpeechSynthesis.
- Ultra-Fast LLM Inference: Powered by Groq's low-latency inference engine for sub-second conversational answers.
- Live Word-by-Word Subtitles: Synchronized subtitle pill that reveals text dynamically as each word is spoken.
- RAG-Ready: Context injection pipeline with PostgreSQL + pgvector vector embeddings.
- Pure Native Stack: Pure modern JavaScript (ESM + Web Component) with native Node.js HTTP/WebSocket backend.`,
  },
  {
    id: 'proj-cms-provider-directory',
    title: 'CMS Medicare Provider Directory & Intelligence Engine',
    category: 'project',
    source: 'Door 04 - Production Web Platforms',
    tags: ['project', 'cms provider directory', 'medicare', 'python', 'flask', 'contact intelligence', 'email discovery', 'live'],
    url: 'https://cms-provider-directory.onrender.com/',
    githubUrl: 'https://github.com/kashif0074/cms-provider-directory',
    content: `CMS Medicare Provider Directory is a live healthcare intelligence platform combining live CMS Medicare data with an automated contact intelligence engine.
Live URL: https://cms-provider-directory.onrender.com/
GitHub: https://github.com/kashif0074/cms-provider-directory
Key Architecture & Capabilities:
- Live CMS Search: Searches, filters, and paginates over 2M+ healthcare provider records from the live CMS DataStore API.
- 5-Step Contact Intelligence Pipeline: Locates official practice websites, associated hospital affiliations, LinkedIn profiles, and verified public work emails.
- Strict Anti-Guessing Guarantee: Never guesses or synthesizes email patterns; returns only verified public emails, with 20+ aggregator domains excluded.
- Security & Caching: Socket-level SSRF protection, in-memory TTL caching (10 min), and streaming CSV/JSON exports.
Tech Stack: Python 3.13, Flask 3.1.3, Gunicorn 21.2.0 WSGI, CMS DataStore API, Tavily Search & Extract API, Google Custom Search API, Vanilla JS (ES6+).`,
  },

  // =========================================================================
  // 8. CONTACT & COLLABORATION
  // =========================================================================
  {
    id: 'contact-info',
    title: 'Contact Kashif Shahzad',
    category: 'contact',
    source: 'Contact Section',
    tags: ['contact', 'email', 'phone', 'whatsapp', 'linkedin', 'hire', 'collaborate', 'message', 'touch', 'github'],
    content: `How to reach and contact Kashif Shahzad:
- Email: malik.kaxif7@gmail.com (Direct contact for inquiries, roles, and consulting)
- Phone / WhatsApp: +923445089014 (Direct phone call and WhatsApp message)
- LinkedIn: https://www.linkedin.com/in/kashif-shahzad-581297369 (Professional networking and recommendations)
- GitHub: https://github.com/kashif0074 (All open-source production repositories and architecture projects)
- Availability: Open to ambitious engineering projects, full-stack & AI roles, healthcare automation consulting, and technical collaborations.`,
  },
];
