import { ragIndex, type RetrievedResult } from './vectorEngine';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: { title: string; source: string; score: number; url?: string; githubUrl?: string }[];
}

/**
 * Intelligent RAG Response Generator grounded in Kashif's portfolio knowledge base
 */
export async function generateRAGResponse(userQuery: string): Promise<{ text: string; sources: RetrievedResult[] }> {
  const query = userQuery.trim();
  const lower = query.toLowerCase();

  // Retrieve top-3 most relevant vector chunks
  const { results } = ragIndex.getAugmentedContext(query, 3);
  const primaryChunk = results[0]?.chunk;

  // Simulate a realistic thinking delay
  await new Promise((resolve) => setTimeout(resolve, 450));

  // 1. General Greeting or Identity Questions
  if (
    lower === 'hi' ||
    lower === 'hello' ||
    lower === 'hey' ||
    lower.startsWith('who are you') ||
    lower.startsWith('what can you do')
  ) {
    return {
      text: `Hello! I am **Kashif's AI Assistant**. I can help you explore Kashif's background, production projects, engineering experience, and technical skills.\n\nFeel free to ask about:\n- **Featured Projects**: LeadLens, Job Tracker API, Avatar Chat Ava, CMS Provider Directory, Prime Healthcares, eVitals RPM, Gym Management\n- **Technical Stack**: Next.js, React, TypeScript, Python, FastAPI, Node.js, ASP.NET Core, AI Agents, RAG\n- **Experience**: Revive Medical Technologies & Daraz Pakistan\n- **Contact & Collaboration Details**\n\nHow can I help you today?`,
      sources: results,
    };
  }

  // 2. Questions about LeadLens
  if (lower.includes('leadlens')) {
    return {
      text: `**LeadLens** is an enterprise-grade full-stack web application built by Kashif for automated lead generation and high-volume email campaigns.\n\n### 🛠️ Key Architectural Highlights:\n- **Framework**: Next.js 16 (React 19) App Router utilizing server-side rendering (SSR), dynamic API routes, and Turbopack build optimization.\n- **Async Queues**: Built with **BullMQ** on a **Redis** cluster to run background worker jobs with exponential backoff retries for automated email delivery.\n- **Authentication**: Next-Auth integrated with Google OAuth & Gmail API via \`googleapis\` and \`nodemailer\`.\n- **Persistence**: **Prisma 5 ORM** managing migrations across PostgreSQL and MongoDB.\n\n🔗 **Live Deployment**: [leadlens-ziff.onrender.com](https://leadlens-ziff.onrender.com)\n📂 **GitHub Repository**: [github.com/kashif0074/Leadlens](https://github.com/kashif0074/Leadlens)`,
      sources: results,
    };
  }

  // 3. Questions about Job Tracker / AI Engineer Job Tracker
  if (lower.includes('job tracker') || lower.includes('job-tracker') || (lower.includes('agent') && lower.includes('job'))) {
    return {
      text: `**The AI Engineer Job Tracker** is Kashif's production-grade, multi-tenant Agentic AI application that goes far beyond standard CRUD tools.\n\n### 🧠 5 Integrated AI Paradigms:\n1. **Autonomous Web Scraper (LangGraph)**: An agentic state machine utilizing headless **Playwright** to scrape job listings (bypassing basic bot guards), extract technical criteria, and store records.\n2. **Multi-Agent Orchestration (Microsoft AutoGen)**: A 3-agent crew (*Researcher*, *Writer*, and *Critic*) that collaboratively analyzes postings, generates tailored cover letters, and forces editorial revisions before final approval.\n3. **Semantic Vector Search (RAG)**: Generates 384-dimensional embeddings via local \`sentence-transformers\` (zero API cost) and calculates Cosine Similarity against job embeddings in **pgvector**.\n4. **GraphRAG (Neo4j 5)**: Traverses \`(Job)-[:REQUIRES]->(Skill)\` knowledge graph relationships to detect co-occurring technical competencies.\n5. **LLM Skill Extraction**: Sends job descriptions to **Groq LLM** with strict JSON-mode system prompts to parse structured skills.\n\n📂 **GitHub Repository**: [github.com/kashif0074/job-tracker-api](https://github.com/kashif0074/job-tracker-api)\n🐳 **DevOps**: 3-service Docker Compose architecture with 22 isolated Pytest tests passing on GitHub Actions.`,
      sources: results,
    };
  }

  // 4. Questions about Avatar Chat / Ava Voice Assistant
  if (lower.includes('avatar') || lower.includes('ava') || lower.includes('lip sync') || lower.includes('voice assistant')) {
    return {
      text: `**Avatar Chat (Ava Voice Assistant)** is a lightweight, zero-GPU, real-time talking-avatar conversational AI assistant built by Kashif.\n\n### ⚡ Key Innovations:\n- **Zero-GPU Client-Side Lip Sync**: Blits between idle frames and talking video clips at 60 FPS using the browser's native **Web Audio API** (amplitude envelope analysis) and HTML5 Canvas—bypassing costly cloud 3D streaming.\n- **Dual-Tier Neural TTS**: Natural voice synthesis using Microsoft Edge Neural Voices (\`en-US-AvaNeural\`), with automated fallback to Groq Orpheus TTS (\`canopylabs/orpheus-v1-english\`).\n- **Sub-Second LLM Inference**: Near-instant answers powered by Groq's high-speed inference engine.\n- **Live Word-by-Word Subtitles**: Synchronized subtitle pill that reveals text dynamically as each word is spoken.\n- **RAG-Ready**: Integrated with PostgreSQL and \`pgvector\` for context injection.\n\n🔗 **Live Website**: [ava-avatar-chat.onrender.com](https://ava-avatar-chat.onrender.com/)\n📂 **GitHub Repository**: [github.com/kashif0074/avatar-chat](https://github.com/kashif0074/avatar-chat)`,
      sources: results,
    };
  }

  // 5. Questions about CMS Medicare Provider Directory
  if (lower.includes('cms') || lower.includes('provider directory') || lower.includes('medicare') || lower.includes('contact intelligence')) {
    return {
      text: `**CMS Medicare Provider Directory** is a live healthcare intelligence platform that combines the official CMS DataStore API with an automated contact intelligence engine.\n\n### 🔍 Core Features & Guarantees:\n- **Live CMS Search**: Searches, filters, and paginates over **2M+ live Medicare provider records** via the official CMS DataStore API.\n- **5-Step Contact Intelligence Pipeline**: Automatically searches practice sites, associated hospital profiles, and LinkedIn to discover verified public work emails.\n- **Strict Anti-Guessing Policy**: Never synthesizes or guesses email patterns; only public, verified emails are returned, while 20+ aggregator directories (e.g. Healthgrades, Vitals) are actively excluded.\n- **Security & Caching**: Socket-level SSRF protection (\`is_safe_url\`), in-memory TTL caching (10 min), and streaming CSV/JSON exports.\n\n🔗 **Live Platform**: [cms-provider-directory.onrender.com](https://cms-provider-directory.onrender.com/)\n📂 **GitHub Repository**: [github.com/kashif0074/cms-provider-directory](https://github.com/kashif0074/cms-provider-directory)`,
      sources: results,
    };
  }

  // 6. Questions about Prime Healthcares & eVitals RPM
  if (lower.includes('prime') || lower.includes('healthcares') || lower.includes('evitals') || lower.includes('rpm')) {
    return {
      text: `Kashif has built and maintained two production healthcare platforms:\n\n1. **Prime Healthcares LLC** ([primehealthcaresllc.com](https://primehealthcaresllc.com/)):\n   - Official web platform for an American healthcare consultancy.\n   - Handles Qualified MIPS clinical registry reporting, medical billing, and Accountable Care Organization (ACO) compliance for medical practices across the US.\n   - Tech: React, Next.js, TypeScript, Tailwind CSS.\n\n2. **eVitals RPM** ([evitalsrpm.com](https://www.evitalsrpm.com/)):\n   - Turnkey Remote Patient Monitoring (RPM) and Chronic Care Management (CCM) platform.\n   - Connects FDA-cleared cellular diagnostic devices with zero patient setup directly to clinician review dashboards with automated Medicare CPT billing.\n   - Tech: React, TypeScript, Node.js, PostgreSQL.`,
      sources: results,
    };
  }

  // 7. Questions about Gym Management System
  if (lower.includes('gym') || lower.includes('asp.net') || lower.includes('c#') || lower.includes('entity framework')) {
    return {
      text: `**Gym Management System** is an enterprise-grade full-stack web application designed for comprehensive gym facility operations.\n\n### 🏋️ Architecture Breakdown:\n- **Decoupled Architecture**: ASP.NET Core Web API on the backend and React 18 with TypeScript on the frontend (Vite SPA).\n- **Dual-Portal System**: A public landing page for member plan discovery and self-service registration, combined with a secure role-based administrative dashboard.\n- **Operations & Billing**: Member attendance check-in/out capacity logging (\`/api/attendance\`), subscription lifecycle billing, and Entity Framework Core migrations with seeding.\n\n📂 **GitHub Repository**: [github.com/kashif0074/Gymmanagementsystem](https://github.com/kashif0074/Gymmanagementsystem)`,
      sources: results,
    };
  }

  // 8. Questions about Experience & Revive Medical
  if (lower.includes('experience') || lower.includes('work') || lower.includes('revive') || lower.includes('daraz') || lower.includes('career')) {
    return {
      text: `### 💼 Kashif's Professional Experience:\n\n1. **Full-Stack & AI Engineer at Revive Medical Technologies Inc.** (*June 2026 – Present*)\n   - Integrated conversational AI features including **Groq API** and custom **HeyGen avatar assistants** into Remote Patient Monitoring (RPM) platforms.\n   - Architected production web applications in **React, Next.js, TypeScript, Node.js, and Express.js**.\n   - Maintained and optimized database layers with **MongoDB Atlas** and **PostgreSQL**.\n\n2. **Logistics Assistant at Daraz Pakistan** (*May 2022 – April 2025*)\n   - Managed order tracking, shipment workflows, and inventory data across internal enterprise logistics software.\n   - Coordinated between operations and engineering teams to resolve delivery bottlenecks.`,
      sources: results,
    };
  }

  // 9. Questions about Skills & Tech Stack
  if (lower.includes('skill') || lower.includes('tech stack') || lower.includes('stack') || lower.includes('technologies') || lower.includes('programming')) {
    return {
      text: `### 🛠️ Kashif's Technical Skills Matrix:\n\n- **AI & Automation**: LLM Integration (Groq, OpenAI), Multi-Agent Orchestration (**LangGraph**, **Microsoft AutoGen**), **RAG** & Vector Search (**pgvector**), Knowledge Graphs (**Neo4j 5**), Machine Learning (Scikit-learn, Pandas, sentence-transformers).\n- **Frontend**: **React.js**, **Next.js** (App Router, Server Components), **TypeScript**, JavaScript (ES6+), React Native, Tailwind CSS, HTML5 Canvas, Web Audio API, Three.js.\n- **Backend**: **Python** (FastAPI, Flask), **Node.js** & **Express.js**, **C# / ASP.NET Core**, REST APIs, WebSockets, BullMQ with Redis queues, JWT, OAuth.\n- **Databases & DevOps**: **PostgreSQL** (pgvector), **MongoDB**, MySQL, Neo4j, **Docker & Docker Compose**, Git/GitHub Actions (CI/CD), Pytest, Render, Vercel.`,
      sources: results,
    };
  }

  // 10. Questions about Contacting Kashif
  if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('reach') || lower.includes('message') || lower.includes('phone') || lower.includes('whatsapp') || lower.includes('linkedin')) {
    return {
      text: `### 📬 How to Contact Kashif Shahzad:\n\n- **Email**: [malik.kaxif7@gmail.com](mailto:malik.kaxif7@gmail.com)\n- **Phone / WhatsApp**: [+923445089014](tel:+923445089014)\n- **LinkedIn**: [linkedin.com/in/kashif-shahzad-581297369](https://www.linkedin.com/in/kashif-shahzad-581297369)\n- **GitHub**: [github.com/kashif0074](https://github.com/kashif0074)\n- **Portfolio Dispatch Form**: Send a transmission via the **05 / CONTACT** terminal form below.\n\nHe is open to full-stack engineering roles, Agentic AI development, healthcare automation consulting, and collaborations!`,
      sources: results,
    };
  }

  // 11. Contextual RAG Synthesis from retrieved chunks
  if (primaryChunk) {
    return {
      text: `Based on Kashif's portfolio records for **${primaryChunk.title}**:\n\n${primaryChunk.content}\n\n${
        primaryChunk.url ? `🔗 **Live URL**: [${primaryChunk.url}](${primaryChunk.url})\n` : ''
      }${
        primaryChunk.githubUrl ? `📂 **GitHub**: [${primaryChunk.githubUrl}](${primaryChunk.githubUrl})\n` : ''
      }\nFeel free to ask for deeper technical breakdowns regarding the architecture, code implementation, or tech stack!`,
      sources: results,
    };
  }

  // Fallback
  return {
    text: `Kashif Shahzad is an AI Automation Engineer and Full-Stack Developer specializing in Agentic AI (LangGraph, AutoGen), modern full-stack web applications (React, Next.js, FastAPI, ASP.NET Core), and healthcare platforms (RPM, CMS Medicare, Prime Healthcares).\n\nYou can ask about any of his projects (*LeadLens, Job Tracker API, Avatar Chat Ava, CMS Directory*), his work at Revive Medical Technologies, or his complete skills matrix!`,
    sources: results,
  };
}
