import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnetic } from './Magnetic';
import { CinematicDoorPortal } from './CinematicDoorPortal';

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  plaque: string;
  tagline: string;
  category: string;
  badge: string;
  client: string;
  doorColor: {
    base: string;
    light: string;
    dark: string;
    accent: string;
    name: string;
  };
  summary: string;
  description: string;
  features: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  mockup: {
    type: 'mobile' | 'browser';
    appName: string;
    appCategory: string;
    screenTitle: string;
    screenSubtitle: string;
    stats: { label: string; val: string; isGood?: boolean }[];
    terminalLine: string;
  };
  githubUrl: string;
  liveUrl?: string;
}

export interface HealthcareProjectItem {
  id: string;
  name: string;
  subtitle: string;
  url: string;
  description: string;
  technologies: string[];
  preview: {
    domain: string;
    tagline: string;
    headline: string;
    points: string[];
  };
}

export const healthcareProjects: HealthcareProjectItem[] = [
  {
    id: 'prime-healthcares',
    name: 'Prime Healthcares',
    subtitle: 'Healthcare Consultancy & MIPS Billing Solutions',
    url: 'https://primehealthcaresllc.com/',
    description:
      'Official web platform for PrimeHealthcares LLC, an American healthcare business consultancy providing MIPS clinical registry reporting, revenue cycle management, and ACO quality compliance to medical practices across the United States.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    preview: {
      domain: 'primehealthcaresllc.com',
      tagline: 'Healthcare Management Consulting',
      headline: 'Empowering Healthcare Practices with Strategic Solutions',
      points: [
        'Qualified MIPS Registry Data Submission',
        'Medical Billing & Revenue Cycle Management',
        'Accountable Care Organization (ACO) Reporting',
      ],
    },
  },
  {
    id: 'evitals-rpm',
    name: 'eVitals RPM',
    subtitle: 'Remote Patient Monitoring & Telehealth Platform',
    url: 'https://www.evitalsrpm.com/',
    description:
      'Turnkey Remote Patient Monitoring (RPM) and Chronic Care Management platform connecting FDA-cleared cellular diagnostic devices directly to clinician review dashboards with automated Medicare CPT billing compliance.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    preview: {
      domain: 'evitalsrpm.com',
      tagline: 'Turnkey Cellular RPM Solution',
      headline: 'Connected Care Made Simple for Modern Practices',
      points: [
        'Cellular Medical Devices with Zero Setup',
        'Prioritized Clinician Triage Dashboard',
        'Automated Medicare RPM / CCM CPT Tracking',
      ],
    },
  },
];

export interface WebAppProjectItem {
  id: string;
  name: string;
  subtitle: string;
  url: string;
  githubUrl: string;
  description: string;
  technologies: string[];
  keyFeatures: string[];
  preview: {
    domain: string;
    tagline: string;
    headline: string;
    points: string[];
  };
}

export const webAppProjects: WebAppProjectItem[] = [
  {
    id: 'leadlens',
    name: 'LeadLens',
    subtitle: 'Next.js 16 (React 19) • BullMQ & Redis Worker Architecture',
    url: 'https://leadlens-ziff.onrender.com',
    githubUrl: 'https://github.com/kashif0074/Leadlens',
    description:
      'Full-stack enterprise web application built on Next.js 16 App Router with server-side rendering, secure Next-Auth Google OAuth & JWT sessions, Prisma 5 ORM, and Redis-backed BullMQ background queues for automated email delivery and retry handling.',
    technologies: [
      'Next.js 16',
      'React 19',
      'TypeScript 5',
      'Tailwind 4',
      'Prisma 5',
      'BullMQ',
      'Redis',
      'Next-Auth',
      'Nodemailer',
    ],
    keyFeatures: [
      'Server-side rendering (SSR), API routes, and Turbopack build optimization',
      'BullMQ Redis-backed async job queues with exponential retry processing',
      'Next-Auth Google OAuth & Gmail API integration via googleapis & Nodemailer',
      'Prisma 5 ORM with PostgreSQL & MongoDB schema migrations',
    ],
    preview: {
      domain: 'leadlens-ziff.onrender.com',
      tagline: 'Next.js 16 & Redis Queue Architecture',
      headline: 'Intelligent Lead Generation & Email Campaign Engine',
      points: [
        'Next 16 Server Components & Dynamic API Routes',
        'BullMQ Email Queues & Worker Retries on Redis',
        'Google OAuth & Prisma ORM Data Persistence',
      ],
    },
  },
  {
    id: 'gym-management',
    name: 'Gym Management System',
    subtitle: 'ASP.NET Core Web API • C# • React 18 & TypeScript • EF Core',
    url: 'https://github.com/kashif0074/Gymmanagementsystem',
    githubUrl: 'https://github.com/kashif0074/Gymmanagementsystem',
    description:
      'Full-stack enterprise web application designed to streamline gym operations, member subscriptions, class scheduling, attendance logging, and billing. Built with a decoupled architecture featuring ASP.NET Core Web API on the backend and React with TypeScript on the frontend, delivering both a public member portal and a role-based administrative dashboard.',
    technologies: [
      'ASP.NET Core',
      'C#',
      'React 18',
      'TypeScript',
      'Entity Framework Core',
      'SQLite / SQL',
      'Vite',
      'Tailwind CSS',
      'Docker',
    ],
    keyFeatures: [
      'Decoupled architecture: ASP.NET Core Web API backend + React 18 TypeScript frontend',
      'Role-based access: Admin dashboard, self-service Member portal, and Public landing page',
      'Daily member check-in/out attendance logging and capacity management (/api/attendance)',
      'Subscription billing, revenue metrics, and Entity Framework Core migrations with seeding',
    ],
    preview: {
      domain: 'gymmanagementsystem.dev',
      tagline: 'ASP.NET Core & React Decoupled Architecture',
      headline: 'Full-Stack Facility Operations & Member Lifecycle Platform',
      points: [
        'ASP.NET Core Web API with Async EF Core Queries',
        'Dual Portal: Public Landing & Role-Based Admin UI',
        'Member Lifecycles, Attendance & Billing Workflows',
      ],
    },
  },
];

export interface Door4ProjectItem {
  id: string;
  name: string;
  subtitle: string;
  url: string;
  githubUrl: string;
  description: string;
  technologies: string[];
  keyFeatures: string[];
  preview: {
    domain: string;
    tagline: string;
    headline: string;
    points: string[];
  };
}

export const door4Projects: Door4ProjectItem[] = [
  {
    id: 'avatar-chat',
    name: 'Avatar Chat (Ava Voice Assistant)',
    subtitle: 'Zero-GPU Talking Avatar • Edge Neural TTS & Groq LLM',
    url: 'https://ava-avatar-chat.onrender.com/',
    githubUrl: 'https://github.com/kashif0074/avatar-chat',
    description:
      'Lightweight, zero-GPU conversational AI assistant delivering synchronized audio-envelope lip-sync, Microsoft Edge Neural voice synthesis, Groq high-speed LLM inference, and real-time word-by-word subtitles—without requiring costly cloud GPU streaming or heavy 3D rendering engines.',
    technologies: [
      'Vanilla JavaScript',
      'HTML5 Canvas',
      'Web Audio API',
      'Web Speech API',
      'Node.js',
      'WebSockets',
      'Groq Cloud API',
      'Edge Neural TTS',
      'PostgreSQL',
      'pgvector',
    ],
    keyFeatures: [
      'Zero-GPU Client-Side Lip Sync via Web Audio API amplitude envelope detection and HTML5 Canvas blitting',
      'Dual-tier Neural TTS with Microsoft Edge (en-US-AvaNeural), Groq Orpheus TTS fallback, and local SpeechSynthesis',
      'Ultra-fast Groq LLM conversational completions with sub-second response times',
      'RAG context injection pipeline designed for PostgreSQL + pgvector embeddings',
      'Live synchronized subtitle pill that reveals text dynamically as each word is spoken',
    ],
    preview: {
      domain: 'ava-avatar-chat.onrender.com',
      tagline: 'Zero-GPU Real-Time Talking Avatar',
      headline: 'Conversational Voice Assistant with Native Lip-Sync',
      points: [
        'Client-Side Web Audio Envelope Lip-Sync',
        'Microsoft Edge Neural Voice Synthesis',
        'Groq High-Speed LLM Inference Engine',
      ],
    },
  },
  {
    id: 'cms-provider-directory',
    name: 'CMS Medicare Provider Directory',
    subtitle: 'Python 3.13 • Flask 3.1 & Gunicorn • Contact Intelligence Engine',
    url: 'https://cms-provider-directory.onrender.com/',
    githubUrl: 'https://github.com/kashif0074/cms-provider-directory',
    description:
      'Healthcare intelligence platform querying 2M+ live CMS Medicare provider records with in-memory TTL caching and an automated 5-step research pipeline locating official practice websites, hospital affiliations, LinkedIn profiles, and verified public work emails.',
    technologies: [
      'Python 3.13',
      'Flask 3.1',
      'Gunicorn WSGI',
      'CMS DataStore API',
      'Tavily Search API',
      'Google Custom Search',
      'SSRF Guard',
      'Vanilla JS (ES6+)',
    ],
    keyFeatures: [
      'Parameterized search & virtual pagination across 2M+ live CMS Medicare provider records',
      'Automated 5-step contact intelligence pipeline locating verified public work emails and practice websites',
      'Strict anti-guessing policy with multi-directory aggregator exclusion (20+ directories blocked)',
      'Socket-level SSRF protection, in-memory TTL query caching, and streaming CSV/JSON export',
    ],
    preview: {
      domain: 'cms-provider-directory.onrender.com',
      tagline: 'CMS Medicare Data & Contact Intelligence Engine',
      headline: '2M+ Healthcare Provider Directory & Verified Contact Search',
      points: [
        'Live CMS DataStore API Query Translation',
        '5-Step Automated Contact Research Workflow',
        'Strict Anti-Guessing Verified Email Discovery',
      ],
    },
  },
];

export const projectsList: ProjectData[] = [
  {
    id: 'rpm-ai',
    number: '01',
    title: 'Healthcare Web Platforms',
    plaque: 'WEB DEVELOPER',
    tagline: 'Prime Healthcares & eVitals RPM Live Websites',
    category: 'HEALTHCARE WEBSITES',
    badge: 'LIVE WEBSITES',
    client: 'Prime Healthcares LLC & eVitals RPM',
    doorColor: {
      base: '#1E62D0',
      light: '#3177E8',
      dark: '#134DB0',
      accent: '#93C5FD',
      name: 'Royal Blue',
    },
    summary:
      'Live healthcare platforms: Prime Healthcares LLC consultancy & eVitals Remote Patient Monitoring platform.',
    description:
      'Two production healthcare websites: Prime Healthcares LLC and eVitals RPM. Each platform is built for clinical operations, revenue cycle compliance, and real-time patient monitoring.',
    features: [
      'Prime Healthcares LLC – Live medical consultancy, MIPS registry & billing portal.',
      'eVitals RPM – Live cellular Remote Patient Monitoring platform.',
      'Clean responsive user interfaces with direct live website access.',
      'Healthcare compliance and clinician workflow integration.',
    ],
    techStack: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Tailwind CSS',
      'PostgreSQL',
    ],
    metrics: [
      { label: 'STATUS', value: 'Live' },
      { label: 'DOMAINS', value: '2 Websites' },
      { label: 'SECTOR', value: 'Healthcare' },
    ],
    mockup: {
      type: 'browser',
      appName: 'Healthcare Platforms',
      appCategory: 'HEALTHCARE • LIVE WEBSITES',
      screenTitle: 'Prime Healthcares & eVitals RPM',
      screenSubtitle: 'Two production healthcare websites',
      stats: [
        { label: 'Project 1', val: 'Prime Healthcares', isGood: true },
        { label: 'Project 2', val: 'eVitals RPM', isGood: true },
        { label: 'Status', val: 'Live Online', isGood: true },
        { label: 'Access', val: 'Direct Links', isGood: true },
      ],
      terminalLine: 'Both live platforms operational. Click below to inspect each website.',
    },
    githubUrl: 'https://primehealthcaresllc.com/',
    liveUrl: 'https://primehealthcaresllc.com/',
  },
  {
    id: 'leadlens',
    number: '02',
    title: 'Full-Stack Web Applications',
    plaque: 'WEB APPS',
    tagline: 'LeadLens (Next.js 16 & Redis) & Gym Management System (ASP.NET Core & React)',
    category: 'FULL-STACK WEB APPS',
    badge: '2 WEB APPS',
    client: 'LeadLens & Gym Management System',
    doorColor: {
      base: '#222735',
      light: '#32394A',
      dark: '#151821',
      accent: '#CBD5E1',
      name: 'Charcoal Slate',
    },
    summary:
      'Two full-stack web applications: LeadLens (Next.js 16, BullMQ Redis queues, Prisma) and Gym Management System (ASP.NET Core Web API, C#, React).',
    description:
      'Inside Door 02 are two enterprise full-stack web applications: LeadLens (built with Next.js 16 App Router, BullMQ Redis email workers, and Prisma ORM) and Gym Management System (built with ASP.NET Core Web API, EF Core, and React with TypeScript).',
    features: [
      'LeadLens: Next.js 16 (React 19) SSR, BullMQ Redis queues, and Google OAuth.',
      'Gym Management System: ASP.NET Core Web API, C#, EF Core ORM, and React 18.',
      'Role-based admin dashboards, attendance tracking, and billing pipelines.',
      'Complete source code and live deployment access.',
    ],
    techStack: [
      'Next.js 16',
      'React 19',
      'ASP.NET Core',
      'C#',
      'TypeScript',
      'Prisma 5',
      'EF Core',
      'BullMQ / Redis',
    ],
    metrics: [
      { label: 'PROJECTS', value: '2 Web Apps' },
      { label: 'BACKENDS', value: 'Next.js & ASP.NET' },
      { label: 'FRONTENDS', value: 'React & Vite' },
    ],
    mockup: {
      type: 'browser',
      appName: 'Full-Stack Web Apps',
      appCategory: 'WEB APPS • LEADLENS & GYM SYSTEM',
      screenTitle: 'LeadLens & Gym Management System',
      screenSubtitle: 'Two production web applications',
      stats: [
        { label: 'App 1', val: 'LeadLens SaaS', isGood: true },
        { label: 'App 2', val: 'Gym Management', isGood: true },
        { label: 'Stacks', val: 'Next.js & .NET', isGood: true },
        { label: 'Source', val: 'GitHub Verified', isGood: true },
      ],
      terminalLine: 'Both web application architectures operational.',
    },
    githubUrl: 'https://github.com/kashif0074/Leadlens',
    liveUrl: 'https://leadlens-ziff.onrender.com',
  },
  {
    id: 'release-radar',
    number: '03',
    title: 'The AI Engineer Job Tracker',
    plaque: 'AGENTIC AI',
    tagline: 'FastAPI, Next.js 14, LangGraph, AutoGen, pgvector & Neo4j',
    category: 'AGENTIC AI / MULTI-AGENT PLATFORM',
    badge: 'AGENTIC AI',
    client: 'The AI Engineer Job Tracker',
    doorColor: {
      base: '#6EA874',
      light: '#7FB985',
      dark: '#58915E',
      accent: '#D1FAE5',
      name: 'Sage Meadow',
    },
    summary:
      'Production-grade full-stack Agentic AI platform integrating pgvector semantic match, Neo4j GraphRAG traversal, Playwright LangGraph scraper, and AutoGen multi-agent cover letter generation.',
    description:
      'The AI Engineer Job Tracker is a multi-tenant, full-stack application built with FastAPI and Next.js 14. It integrates five distinct AI paradigms: single-agent LangGraph scraping with Playwright, a 3-agent Microsoft AutoGen crew (Researcher, Writer, Critic), pgvector cosine similarity matching, Neo4j GraphRAG skill traversal, and Groq LLM skill extraction.',
    features: [
      'Multi-Agent Orchestration: Microsoft AutoGen 3-agent crew (Researcher, Writer, Critic) generating tailored cover letters.',
      'Autonomous Web Scraper: LangGraph state machine driving headless Playwright browser automation.',
      'Semantic Search & RAG: 384-dimensional vector embeddings with pgvector and local sentence-transformers.',
      'GraphRAG Knowledge Graph: Neo4j 5 traversal querying (Job)-[:REQUIRES]->(Skill) relationship graphs.',
    ],
    techStack: [
      'Python 3.12',
      'FastAPI',
      'Next.js 14',
      'TypeScript',
      'PostgreSQL 16',
      'pgvector',
      'Neo4j 5',
      'LangGraph',
      'AutoGen',
      'Playwright',
      'Docker Compose',
    ],
    metrics: [
      { label: 'AI AGENTS', value: 'AutoGen + LangGraph' },
      { label: 'VECTOR DB', value: 'pgvector 384-d' },
      { label: 'GRAPH DB', value: 'Neo4j 5' },
    ],
    mockup: {
      type: 'browser',
      appName: 'AI Job Tracker',
      appCategory: 'AGENTIC AI • MULTI-AGENT SYSTEM',
      screenTitle: 'AI Engineer Job Tracker',
      screenSubtitle: 'FastAPI • Next.js 14 • LangGraph • AutoGen',
      stats: [
        { label: 'Agents', val: 'AutoGen Crew', isGood: true },
        { label: 'Vector RAG', val: 'pgvector', isGood: true },
        { label: 'Knowledge Graph', val: 'Neo4j 5', isGood: true },
        { label: 'Scraper', val: 'Playwright', isGood: true },
      ],
      terminalLine: 'AutoGen 3-agent workflow verified. pgvector Cosine match active.',
    },
    githubUrl: 'https://github.com/kashif0074/job-tracker-api',
    liveUrl: 'https://github.com/kashif0074/job-tracker-api',
  },
  {
    id: 'avatar-chat',
    number: '04',
    title: 'AI Voice & Healthcare Intelligence',
    plaque: 'AI & SYSTEMS',
    tagline: 'Avatar Chat (Real-Time Voice AI) & CMS Medicare Directory (Python & Flask)',
    category: 'AI & HEALTHCARE DATA SYSTEMS',
    badge: '2 LIVE PLATFORMS',
    client: 'Avatar Chat & CMS Provider Directory',
    doorColor: {
      base: '#DE6426',
      light: '#EE7435',
      dark: '#B84F17',
      accent: '#FDBA74',
      name: 'Terracotta Orange',
    },
    summary:
      'Two production platforms: Avatar Chat (Zero-GPU talking avatar AI assistant with Edge Neural TTS) and CMS Provider Directory (Medicare 2M+ record search & 5-step contact intelligence engine).',
    description:
      'Inside Door 04 are two live production platforms: Avatar Chat (Ava), a lightweight zero-GPU talking avatar with Web Audio API lip-sync and Groq LLM, and CMS Provider Directory, a Python/Flask platform searching 2M+ Medicare records with automated 5-step contact intelligence.',
    features: [
      'Avatar Chat: Zero-GPU client-side lip-sync, Microsoft Edge Neural TTS, and Groq LLM.',
      'CMS Provider Directory: Live CMS DataStore search over 2M+ records with 5-step email discovery.',
      'Strict anti-guessing email verification, aggregator filtering, and socket SSRF guard.',
      'Live deployment access and open-source GitHub repositories for both projects.',
    ],
    techStack: [
      'Python 3.13',
      'Flask 3.1',
      'Vanilla JavaScript',
      'HTML5 Canvas',
      'Web Audio API',
      'CMS DataStore API',
      'Groq Cloud API',
      'Edge Neural TTS',
      'PostgreSQL',
      'pgvector',
    ],
    metrics: [
      { label: 'PLATFORMS', value: '2 Live Projects' },
      { label: 'BACKENDS', value: 'Python & Node.js' },
      { label: 'DEPLOYMENTS', value: 'Render.com' },
    ],
    mockup: {
      type: 'browser',
      appName: 'AI & Healthcare Systems',
      appCategory: 'AI AVATAR • CMS MEDICARE DIRECTORY',
      screenTitle: 'Avatar Chat & CMS Provider Directory',
      screenSubtitle: 'Two production platforms live on Render',
      stats: [
        { label: 'Project 1', val: 'Avatar Chat (Ava)', isGood: true },
        { label: 'Project 2', val: 'CMS Directory', isGood: true },
        { label: 'Stacks', val: 'Python & JS/Node', isGood: true },
        { label: 'Deployments', val: 'Render.com', isGood: true },
      ],
      terminalLine: 'Both platforms operational. Click below to inspect each system.',
    },
    githubUrl: 'https://github.com/kashif0074/avatar-chat',
    liveUrl: 'https://ava-avatar-chat.onrender.com/',
  },
];

export const ProjectDoorsGallery: React.FC = () => {
  const [openDoorId, setOpenDoorId] = useState<string | null>(null);
  
  const realmRef = useRef<HTMLDivElement>(null);

  const selectedProject = projectsList.find((p) => p.id === openDoorId) || null;
  const currentProjectIndex = projectsList.findIndex((p) => p.id === openDoorId);

  // Toggle or open door
  const handleDoorClick = (id: string) => {
    if (openDoorId === id) {
      setOpenDoorId(null);
    } else {
      setOpenDoorId(id);
    }
  };

  // Switch to next or prev project
  const handleNavigateProject = (direction: 'prev' | 'next') => {
    if (currentProjectIndex === -1) return;
    const newIndex =
      direction === 'next'
        ? (currentProjectIndex + 1) % projectsList.length
        : (currentProjectIndex - 1 + projectsList.length) % projectsList.length;
    setOpenDoorId(projectsList[newIndex].id);
  };

  // Smooth scroll into project realm when opened
  useEffect(() => {
    if (openDoorId && realmRef.current) {
      setTimeout(() => {
        realmRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 250);
    }
  }, [openDoorId]);

  return (
    <div className="w-full relative select-none">
      
      {/* ================= 4 CINEMATIC 3D ARCHITECTURAL DOORS ================= */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-6 justify-items-center max-w-6xl mx-auto relative z-10 px-2 sm:px-4"
      >
        {projectsList.map((project) => (
          <motion.div
            key={project.id}
            variants={{
              hidden: { opacity: 0, y: 35, rotateX: 10 },
              visible: {
                opacity: 1,
                y: 0,
                rotateX: 0,
                transition: {
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            className="w-full flex justify-center"
          >
            <CinematicDoorPortal
              project={project}
              isSelected={openDoorId === project.id}
              onSelect={() => handleDoorClick(project.id)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* ================= 2. PROJECT REVEAL REALM ================= */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div
            key={selectedProject.id}
            ref={realmRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-6xl mx-auto mt-12 rounded-2xl border border-white/10 bg-[#0E131F] p-6 sm:p-8 md:p-10 shadow-2xl relative"
          >
            {/* Top Navigation Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
              <div className="flex items-center space-x-3">
                <Magnetic strength={0.25}>
                  <button
                    onClick={() => setOpenDoorId(null)}
                    data-cursor="magnetic"
                    className="px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-medium tracking-wide transition-colors cursor-pointer flex items-center space-x-1.5"
                  >
                    <span>←</span>
                    <span>Back to Doors</span>
                  </button>
                </Magnetic>

                <span className="text-[11px] font-mono tracking-wider uppercase text-neutral-400">
                  Door 0{selectedProject.number} • {selectedProject.category}
                </span>
              </div>

              {/* Prev / Next Door Navigation */}
              <div className="flex items-center space-x-2">
                <Magnetic strength={0.2}>
                  <button
                    onClick={() => handleNavigateProject('prev')}
                    data-cursor="magnetic"
                    className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
                  >
                    ‹ Prev Door
                  </button>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <button
                    onClick={() => handleNavigateProject('next')}
                    data-cursor="magnetic"
                    className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
                  >
                    Next Door ›
                  </button>
                </Magnetic>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* DOOR 01: HEALTHCARE PROJECTS (Prime Healthcares & eVitals RPM)             */}
            {/* ========================================================================= */}
            {selectedProject.id === 'rpm-ai' ? (
              <div className="py-6 sm:py-8 space-y-8">
                <div className="max-w-2xl">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight font-sans">
                    Healthcare Web Platforms
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                    Two live production websites developed for American healthcare organizations, delivering clinical business consultancy, MIPS compliance, and remote patient telemetry.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                  {healthcareProjects.map((project) => (
                    <div
                      key={project.id}
                      className="rounded-xl border border-white/10 bg-[#141A29] p-6 sm:p-7 flex flex-col justify-between transition-colors hover:border-white/20"
                    >
                      <div className="space-y-5">
                        <div className="rounded-lg border border-white/10 bg-[#0B0F17] overflow-hidden shadow-md">
                          <div className="px-3.5 py-2 bg-[#101522] border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                            <div className="flex items-center space-x-1.5">
                              <span className="w-2 h-2 rounded-full bg-neutral-600 inline-block" />
                              <span className="w-2 h-2 rounded-full bg-neutral-600 inline-block" />
                              <span className="w-2 h-2 rounded-full bg-neutral-600 inline-block" />
                            </div>
                            <span className="text-neutral-300 font-sans tracking-wide">
                              {project.preview.domain}
                            </span>
                            <span className="text-[10px] uppercase text-emerald-400 font-medium">
                              Live
                            </span>
                          </div>

                          <div className="p-5 sm:p-6 bg-gradient-to-b from-[#101726] to-[#0B0F17] text-left space-y-3">
                            <span className="text-[10px] font-mono tracking-wider uppercase text-sky-300 block font-medium">
                              {project.preview.tagline}
                            </span>
                            <h5 className="text-sm sm:text-base font-semibold text-white leading-snug">
                              {project.preview.headline}
                            </h5>

                            <div className="pt-2 space-y-1.5 border-t border-white/10">
                              {project.preview.points.map((pt, idx) => (
                                <div key={idx} className="flex items-center space-x-2 text-[11px] text-neutral-300">
                                  <span className="w-1 h-1 rounded-full bg-sky-400" />
                                  <span>{pt}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight">
                            {project.name}
                          </h4>
                          <span className="text-xs text-sky-300 font-medium block mt-0.5">
                            {project.subtitle}
                          </span>
                          <p className="text-xs sm:text-sm text-neutral-300 mt-2.5 leading-relaxed font-sans">
                            {project.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-0.5 text-[10.5px] font-mono rounded-sm bg-white/5 text-neutral-300 border border-white/10"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                        <Magnetic strength={0.25}>
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="magnetic"
                            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-md text-xs font-semibold tracking-wider uppercase transition-colors bg-[#1E293B] hover:bg-[#334155] text-white border border-white/15 shadow-sm"
                          >
                            <span>Visit Website</span>
                            <span className="text-sm">↗</span>
                          </a>
                        </Magnetic>

                        <span className="text-[10px] font-mono text-neutral-400">
                          {project.preview.domain}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : selectedProject.id === 'leadlens' ? (
              /* ========================================================================= */
              /* DOOR 02: TWO FULL-STACK WEB APPS (LeadLens & Gym Management System)       */
              /* ========================================================================= */
              <div className="py-6 sm:py-8 space-y-8">
                
                {/* Header Section */}
                <div className="max-w-3xl">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-sky-400 font-semibold block mb-1">
                    FULL-STACK WEB PLATFORMS
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight font-sans">
                    Enterprise Web Applications
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                    Two comprehensive full-stack web applications featuring Next.js 16 (React 19) with Redis BullMQ asynchronous queues, and ASP.NET Core Web API with Entity Framework Core and React.
                  </p>
                </div>

                {/* 2 Clean & Balanced Web App Project Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                  {webAppProjects.map((project) => (
                    <div
                      key={project.id}
                      className="rounded-xl border border-white/10 bg-[#141A29] p-6 sm:p-7 flex flex-col justify-between transition-colors hover:border-white/20"
                    >
                      <div className="space-y-5">
                        
                        {/* Minimal Browser Address Bar & Preview */}
                        <div className="rounded-lg border border-white/10 bg-[#0B0F17] overflow-hidden shadow-md">
                          <div className="px-3.5 py-2 bg-[#101522] border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                            <div className="flex items-center space-x-1.5">
                              <span className="w-2 h-2 rounded-full bg-neutral-600 inline-block" />
                              <span className="w-2 h-2 rounded-full bg-neutral-600 inline-block" />
                              <span className="w-2 h-2 rounded-full bg-neutral-600 inline-block" />
                            </div>
                            <span className="text-neutral-300 font-sans tracking-wide text-xs">
                              {project.preview.domain}
                            </span>
                            <span className="text-[10px] uppercase text-emerald-400 font-medium">
                              Web App
                            </span>
                          </div>

                          <div className="p-5 sm:p-6 bg-gradient-to-b from-[#101726] to-[#0B0F17] text-left space-y-3">
                            <span className="text-[10px] font-mono tracking-wider uppercase text-sky-300 block font-medium">
                              {project.preview.tagline}
                            </span>
                            <h5 className="text-sm sm:text-base font-semibold text-white leading-snug">
                              {project.preview.headline}
                            </h5>

                            <div className="pt-2 space-y-1.5 border-t border-white/10">
                              {project.preview.points.map((pt, idx) => (
                                <div key={idx} className="flex items-center space-x-2 text-[11px] text-neutral-300">
                                  <span className="w-1 h-1 rounded-full bg-sky-400" />
                                  <span>{pt}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Project Titles & Description */}
                        <div>
                          <h4 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight">
                            {project.name}
                          </h4>
                          <span className="text-xs text-sky-300 font-medium block mt-0.5">
                            {project.subtitle}
                          </span>
                          <p className="text-xs sm:text-sm text-neutral-300 mt-2.5 leading-relaxed font-sans">
                            {project.description}
                          </p>
                        </div>

                        {/* Key System Capabilities */}
                        <div className="space-y-1.5 pt-2 border-t border-white/10">
                          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-semibold block mb-1">
                            SYSTEM CAPABILITIES:
                          </span>
                          {project.keyFeatures.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start space-x-2 text-xs text-neutral-200">
                              <span className="text-emerald-400 font-bold mt-0.5">✔</span>
                              <span className="leading-snug">{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="pt-2 border-t border-white/10">
                          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-semibold block mb-1.5">
                            TECH STACK:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-0.5 text-[10.5px] font-mono rounded-sm bg-white/5 text-neutral-300 border border-white/10"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* Action Links: Visit Web App & GitHub Source */}
                      <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                        <Magnetic strength={0.25}>
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="magnetic"
                            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-md text-xs font-semibold tracking-wider uppercase transition-colors bg-[#1E293B] hover:bg-[#334155] text-white border border-white/15 shadow-sm"
                          >
                            <span>{project.id === 'leadlens' ? 'Visit Web App' : 'View Project'}</span>
                            <span className="text-sm">↗</span>
                          </a>
                        </Magnetic>

                        <Magnetic strength={0.25}>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="magnetic"
                            className="text-xs font-mono text-neutral-400 hover:text-white transition-colors flex items-center space-x-1"
                          >
                            <span>GitHub Source</span>
                            <span>↗</span>
                          </a>
                        </Magnetic>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ) : selectedProject.id === 'avatar-chat' ? (
              /* ========================================================================= */
              /* DOOR 04: CLEAN & MINIMAL PRODUCTION PROJECTS                              */
              /* ========================================================================= */
              <div className="py-6 sm:py-8 space-y-8">
                
                {/* Clean Header */}
                <div className="max-w-2xl">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight font-sans">
                    Production Web Platforms
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                    Two live web applications: Avatar Chat real-time voice assistant and the CMS Medicare Provider Directory intelligence platform.
                  </p>
                </div>

                {/* 2 Clean & Minimal Project Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                  {door4Projects.map((project) => (
                    <div
                      key={project.id}
                      className="rounded-xl border border-white/10 bg-[#141A29] p-6 sm:p-7 flex flex-col justify-between transition-colors hover:border-white/20"
                    >
                      <div className="space-y-5">
                        
                        {/* Minimal Clean Website Preview Header */}
                        <div className="rounded-lg border border-white/10 bg-[#0B0F17] overflow-hidden shadow-sm">
                          <div className="px-4 py-2.5 bg-[#0E131E] border-b border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
                            <span className="text-neutral-300 font-sans tracking-wide">
                              {project.preview.domain}
                            </span>
                            <span className="text-[10px] uppercase text-emerald-400 font-medium">
                              Live
                            </span>
                          </div>

                          <div className="p-5 sm:p-6 bg-[#0E131E]/60 text-left space-y-2.5">
                            <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-400 block font-medium">
                              {project.preview.tagline}
                            </span>
                            <h5 className="text-sm sm:text-base font-semibold text-white leading-snug">
                              {project.preview.headline}
                            </h5>

                            <div className="pt-2 space-y-1.5 border-t border-white/10">
                              {project.preview.points.map((pt, idx) => (
                                <div key={idx} className="flex items-center space-x-2 text-[11px] text-neutral-300">
                                  <span className="w-1 h-1 rounded-full bg-neutral-400" />
                                  <span>{pt}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Project Details */}
                        <div>
                          <h4 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight">
                            {project.name}
                          </h4>
                          <span className="text-xs text-neutral-400 font-medium block mt-0.5">
                            {project.subtitle}
                          </span>
                          <p className="text-xs sm:text-sm text-neutral-300 mt-2.5 leading-relaxed font-sans">
                            {project.description}
                          </p>
                        </div>

                        {/* Minimal Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-0.5 text-[10.5px] font-mono rounded-xs bg-white/5 text-neutral-300 border border-white/10"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                      </div>

                      {/* Clean Action Footer: One Simple Visit Website Button */}
                      <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                        <Magnetic strength={0.25}>
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="magnetic"
                            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-md text-xs font-semibold tracking-wider uppercase transition-colors bg-[#1E293B] hover:bg-[#334155] text-white border border-white/15 shadow-sm"
                          >
                            <span>Visit Website</span>
                            <span className="text-sm">↗</span>
                          </a>
                        </Magnetic>

                        <Magnetic strength={0.25}>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="magnetic"
                            className="text-xs font-mono text-neutral-400 hover:text-white transition-colors flex items-center space-x-1"
                          >
                            <span>GitHub</span>
                            <span>↗</span>
                          </a>
                        </Magnetic>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ) : (
              /* ========================================================================= */
              /* DOOR 03: THE AI ENGINEER JOB TRACKER (CLEAN & MINIMAL AGENTIC AI)         */
              /* ========================================================================= */
              <div className="py-6 sm:py-8 space-y-8">
                
                {/* Clean Header */}
                <div className="max-w-3xl">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-400 font-semibold block mb-1">
                    AGENTIC AI • FULL-STACK PLATFORM
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight font-sans">
                    The AI Engineer Job Tracker
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                    A production-grade, multi-tenant Agentic AI application combining semantic vector search, knowledge graph skill traversal, Playwright browser scraping, and multi-agent orchestration for job application tracking.
                  </p>
                </div>

                {/* Clean 2-Column Showcase Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Left Column: Repository Preview & Core Overview */}
                  <div className="lg:col-span-6 flex flex-col justify-between rounded-xl border border-white/10 bg-[#141A29] p-6 sm:p-7 transition-colors hover:border-white/20">
                    <div className="space-y-5">
                      
                      {/* Minimal Browser Address Bar & Preview */}
                      <div className="rounded-lg border border-white/10 bg-[#0B0F17] overflow-hidden shadow-sm">
                        <div className="px-4 py-2.5 bg-[#0E131E] border-b border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
                          <span className="text-neutral-300 font-sans tracking-wide">
                            github.com/kashif0074/job-tracker-api
                          </span>
                          <span className="text-[10px] uppercase text-emerald-400 font-medium">
                            Repository
                          </span>
                        </div>

                        <div className="p-5 sm:p-6 bg-[#0E131E]/60 text-left space-y-2.5">
                          <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-400 block font-medium">
                            Agentic AI & Knowledge Graph Architecture
                          </span>
                          <h5 className="text-sm sm:text-base font-semibold text-white leading-snug">
                            Semantic Job Matching & Multi-Agent Cover Letter Engine
                          </h5>

                          <div className="pt-2 space-y-1.5 border-t border-white/10">
                            {[
                              'Autonomous Scraper: LangGraph state machine + Playwright browser automation',
                              'Multi-Agent Orchestration: Microsoft AutoGen 3-agent crew (Researcher, Writer, Critic)',
                              'Semantic Vector Search (pgvector 384-d) & GraphRAG (Neo4j 5 Traversal)',
                            ].map((pt, idx) => (
                              <div key={idx} className="flex items-center space-x-2 text-[11px] text-neutral-300">
                                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                                <span>{pt}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div>
                        <h4 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight">
                          The AI Engineer Job Tracker
                        </h4>
                        <span className="text-xs text-neutral-400 font-medium block mt-0.5">
                          FastAPI • Next.js 14 • LangGraph • AutoGen • pgvector & Neo4j
                        </span>
                        <p className="text-xs sm:text-sm text-neutral-300 mt-2.5 leading-relaxed font-sans">
                          Production-grade full-stack Agentic AI platform for managing job applications. Features pgvector semantic match scoring via local sentence-transformers, Neo4j GraphRAG skill relationships, an autonomous LangGraph scraper with Playwright, and a 3-agent AutoGen crew for personalized cover letters.
                        </p>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {[
                          'Python 3.12',
                          'FastAPI',
                          'Next.js 14',
                          'PostgreSQL 16',
                          'pgvector',
                          'Neo4j 5',
                          'LangGraph',
                          'AutoGen',
                          'Playwright',
                          'Docker Compose',
                          'Pytest',
                        ].map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 text-[10.5px] font-mono rounded-xs bg-white/5 text-neutral-300 border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                    </div>

                    {/* Action Button: View on GitHub */}
                    <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                      <Magnetic strength={0.25}>
                        <a
                          href="https://github.com/kashif0074/job-tracker-api"
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="magnetic"
                          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-md text-xs font-semibold tracking-wider uppercase transition-colors bg-[#1E293B] hover:bg-[#334155] text-white border border-white/15 shadow-sm"
                        >
                          <span>View on GitHub</span>
                          <span className="text-sm">↗</span>
                        </a>
                      </Magnetic>

                      <span className="text-xs font-mono text-neutral-400">
                        kashif0074/job-tracker-api
                      </span>
                    </div>
                  </div>

                  {/* Right Column: 5 Core AI Architecture Paradigms */}
                  <div className="lg:col-span-6 flex flex-col justify-between rounded-xl border border-white/10 bg-[#141A29] p-6 sm:p-7 shadow-xl">
                    <div className="space-y-4">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-semibold block">
                        5 CORE AI ARCHITECTURE PARADIGMS:
                      </span>

                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-[#0E131E] border border-white/5 space-y-1">
                          <span className="text-xs font-bold text-white block">
                            1. LLM Skill Extraction (Groq)
                          </span>
                          <p className="text-[11px] text-neutral-300 leading-relaxed">
                            Sends job descriptions to Groq LLM with strict JSON-mode system prompts, extracting structured technical competencies and requirements without hallucination.
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-[#0E131E] border border-white/5 space-y-1">
                          <span className="text-xs font-bold text-white block">
                            2. Semantic Search & RAG (pgvector)
                          </span>
                          <p className="text-[11px] text-neutral-300 leading-relaxed">
                            Generates 384-dimensional vector embeddings of resumes via local sentence-transformers (zero API cost) and computes Cosine Similarity against job embeddings in pgvector.
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-[#0E131E] border border-white/5 space-y-1">
                          <span className="text-xs font-bold text-white block">
                            3. GraphRAG Knowledge Graph (Neo4j 5)
                          </span>
                          <p className="text-[11px] text-neutral-300 leading-relaxed">
                            Traverses <code className="text-emerald-300 text-[10px]">{'(Job)-[:REQUIRES]->(Skill)'}</code> relationships to identify related competencies and adjacent technologies frequently required across postings.
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-[#0E131E] border border-white/5 space-y-1">
                          <span className="text-xs font-bold text-white block">
                            4. Autonomous Agent (LangGraph + Playwright)
                          </span>
                          <p className="text-[11px] text-neutral-300 leading-relaxed">
                            A LangGraph state machine where the LLM plans a strategy, runs a headless Playwright browser to scrape job postings (bypassing basic bot blocks), extracts skills, and saves records.
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-[#0E131E] border border-white/5 space-y-1">
                          <span className="text-xs font-bold text-white block">
                            5. Multi-Agent Orchestration (Microsoft AutoGen)
                          </span>
                          <p className="text-[11px] text-neutral-300 leading-relaxed">
                            A 3-agent crew (Researcher, Writer, Critic) collaborating iteratively to analyze the job description, draft a targeted cover letter, critique and enforce revisions, and finalize approval.
                          </p>
                        </div>
                      </div>

                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                      <span>Docker: 3 Containers Orchestrated</span>
                      <span className="text-emerald-400">22 / 22 Tests Passing</span>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* Bottom Quick Switcher Footer */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-neutral-400 text-xs">
              <span>Doors Gallery:</span>
              <div className="flex items-center space-x-2">
                {projectsList.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setOpenDoorId(p.id)}
                    data-cursor="pointer"
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      openDoorId === p.id 
                        ? 'bg-white text-black font-semibold' 
                        : 'bg-white/10 text-neutral-300 hover:bg-white/20'
                    }`}
                  >
                    Door 0{p.number}
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ProjectDoorsGallery;
