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
    subtitle: 'Healthcare Consultancy & MIPS Compliance Platform',
    url: 'https://primehealthcaresllc.com/',
    description:
      'Web platform for an American healthcare consultancy. Built to help medical practices manage MIPS clinical registry submissions, billing workflows, revenue cycle management, and ACO quality compliance.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    preview: {
      domain: 'primehealthcaresllc.com',
      tagline: 'Healthcare Management Consulting',
      headline: 'Operations & MIPS Compliance for Medical Practices',
      points: [
        'Qualified MIPS registry data submission',
        'Medical billing and revenue cycle tracking',
        'Accountable Care Organization (ACO) reporting',
      ],
    },
  },
  {
    id: 'evitals-rpm',
    name: 'eVitals RPM',
    subtitle: 'Remote Patient Monitoring & Telehealth Platform',
    url: 'https://www.evitalsrpm.com/',
    description:
      'Remote Patient Monitoring and Chronic Care Management platform connecting cellular diagnostic devices directly to clinician triage dashboards, with automated Medicare CPT billing tracking.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    preview: {
      domain: 'evitalsrpm.com',
      tagline: 'Cellular Remote Patient Monitoring',
      headline: 'Real-Time Patient Vitals & Clinical Triage',
      points: [
        'Pre-configured cellular devices with zero patient setup',
        'Prioritized clinical triage dashboard',
        'Automated Medicare RPM and CCM CPT code tracking',
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
    subtitle: 'Cold Email & Lead Generation Platform',
    url: 'https://leadlens-ziff.onrender.com',
    githubUrl: 'https://github.com/kashif0074/Leadlens',
    description:
      'Full-stack email outreach and lead tracking platform. Features server-side rendering, secure Google OAuth authentication, and background queue workers that handle automated email delivery and retries reliably.',
    technologies: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Prisma 5',
      'BullMQ',
      'Redis',
      'PostgreSQL',
      'Next-Auth',
      'Nodemailer',
    ],
    keyFeatures: [
      'Server-side rendering and dynamic API routes with Next.js 16 App Router',
      'Background job queues powered by BullMQ and Redis with automatic retries',
      'Google OAuth login and Gmail API delivery through Nodemailer',
      'Prisma ORM schema migrations for PostgreSQL and MongoDB',
    ],
    preview: {
      domain: 'leadlens-ziff.onrender.com',
      tagline: 'Email Campaign & Queue Engine',
      headline: 'Automated Lead Outreach & Queue Management',
      points: [
        'Next.js Server Components and API endpoints',
        'Asynchronous BullMQ worker queues on Redis',
        'Google OAuth and Prisma database integration',
      ],
    },
  },
  {
    id: 'gym-management',
    name: 'Gym Management System',
    subtitle: 'Facility Operations & Membership Platform',
    url: 'https://github.com/kashif0074/Gymmanagementsystem',
    githubUrl: 'https://github.com/kashif0074/Gymmanagementsystem',
    description:
      'Full-stack management system built to run day-to-day gym operations. Includes member onboarding, subscription billing, class scheduling, attendance check-ins, and a role-based admin dashboard.',
    technologies: [
      'ASP.NET Core',
      'C#',
      'React 18',
      'TypeScript',
      'Entity Framework Core',
      'SQLite',
      'Vite',
      'Tailwind CSS',
      'Docker',
    ],
    keyFeatures: [
      'Decoupled architecture: ASP.NET Core Web API backend with a React TypeScript frontend',
      'Role-based portals: Public landing page, member self-service, and admin dashboard',
      'Daily member check-in/out attendance logging and room capacity tracking',
      'Subscription billing management and database migrations via EF Core',
    ],
    preview: {
      domain: 'gymmanagementsystem.dev',
      tagline: 'ASP.NET Core & React Architecture',
      headline: 'Gym Operations, Member Lifecycle & Billing',
      points: [
        'ASP.NET Core REST API with async EF Core queries',
        'Public member portal and administrative dashboard',
        'Attendance tracking and automated billing flows',
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
    subtitle: 'Browser-Based Voice Assistant with Real-Time Lip Sync',
    url: 'https://ava-avatar-chat.onrender.com/',
    githubUrl: 'https://github.com/kashif0074/avatar-chat',
    description:
      'Conversational AI avatar that runs entirely in the browser without requiring cloud GPUs. Combines Web Audio amplitude analysis for lip-sync, Microsoft Edge Neural voice synthesis, and fast Groq LLM inference for live speech responses with subtitles.',
    technologies: [
      'JavaScript (ES6+)',
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
      'Client-side lip-sync using Web Audio envelope analysis and Canvas rendering',
      'Natural voice output via Microsoft Edge Neural TTS with browser speech fallback',
      'Low-latency conversational responses powered by Groq LLM',
      'Live subtitle stream synchronized word-by-word with audio playback',
      'Context retrieval pipeline ready for pgvector embeddings',
    ],
    preview: {
      domain: 'ava-avatar-chat.onrender.com',
      tagline: 'Browser-Native Talking Avatar',
      headline: 'Voice AI Assistant with Synchronized Lip Sync',
      points: [
        'Zero-GPU audio envelope lip-sync in the browser',
        'Microsoft Edge Neural voice synthesis',
        'Sub-second responses via Groq LLM inference',
      ],
    },
  },
  {
    id: 'cms-provider-directory',
    name: 'CMS Medicare Provider Directory',
    subtitle: 'Healthcare Provider Directory & Contact Research Engine',
    url: 'https://cms-provider-directory.onrender.com/',
    githubUrl: 'https://github.com/kashif0074/cms-provider-directory',
    description:
      'Search platform querying over 2 million live CMS Medicare records. Includes an automated research pipeline that identifies official clinic websites, hospital affiliations, LinkedIn profiles, and verified work emails without pattern guessing.',
    technologies: [
      'Python 3.13',
      'Flask 3.1',
      'Gunicorn',
      'CMS DataStore API',
      'Tavily Search API',
      'Google Custom Search API',
      'Vanilla JavaScript',
    ],
    keyFeatures: [
      'Live search and pagination across 2M+ official CMS Medicare provider records',
      'Multi-step contact pipeline finding verified public emails and clinic websites',
      'Strict verification filters excluding generic aggregator and scraper directories',
      'In-memory query caching, SSRF network protection, and CSV/JSON data export',
    ],
    preview: {
      domain: 'cms-provider-directory.onrender.com',
      tagline: 'CMS Medicare Search Engine',
      headline: 'Provider Lookup & Verified Contact Discovery',
      points: [
        'Direct integration with CMS DataStore API',
        'Automated multi-source contact research workflow',
        'Verified email discovery with aggregator filtering',
      ],
    },
  },
];

export const projectsList: ProjectData[] = [
  {
    id: 'rpm-ai',
    number: '01',
    title: 'Healthcare Web Platforms',
    plaque: 'HEALTHCARE',
    tagline: 'Prime Healthcares & eVitals RPM Live Platforms',
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
      'Production healthcare platforms built for medical business consultancy, MIPS compliance, and remote patient monitoring.',
    description:
      'Two production healthcare websites: Prime Healthcares LLC, supporting clinical practices with MIPS registry reporting and billing, and eVitals RPM, connecting cellular diagnostic devices directly to clinician review workflows.',
    features: [
      'Prime Healthcares LLC: Medical consultancy, MIPS clinical registry submission, and billing management',
      'eVitals RPM: Turnkey cellular Remote Patient Monitoring with real-time vitals triage',
      'Direct integration with Medicare CPT billing codes and clinical practice workflows',
      'Fully responsive interfaces with live public deployments',
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
      { label: 'PROJECTS', value: '2 Platforms' },
      { label: 'SECTOR', value: 'Healthcare' },
    ],
    mockup: {
      type: 'browser',
      appName: 'Healthcare Platforms',
      appCategory: 'HEALTHCARE • LIVE WEBSITES',
      screenTitle: 'Prime Healthcares & eVitals RPM',
      screenSubtitle: 'Clinical consultancy and patient monitoring platforms',
      stats: [
        { label: 'Platform 1', val: 'Prime Healthcares', isGood: true },
        { label: 'Platform 2', val: 'eVitals RPM', isGood: true },
        { label: 'Status', val: 'Live in Production', isGood: true },
        { label: 'Access', val: 'Direct Links', isGood: true },
      ],
      terminalLine: 'Both healthcare systems active in production.',
    },
    githubUrl: 'https://primehealthcaresllc.com/',
    liveUrl: 'https://primehealthcaresllc.com/',
  },
  {
    id: 'leadlens',
    number: '02',
    title: 'Full-Stack Web Applications',
    plaque: 'WEB APPS',
    tagline: 'LeadLens (Next.js & Redis) & Gym Management System (ASP.NET Core & React)',
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
      'Full-stack applications built with Next.js 16, BullMQ background queues, ASP.NET Core Web API, and React.',
    description:
      'Two production web systems: LeadLens, a lead generation and automated email campaign engine powered by Redis worker queues, and Gym Management System, a decoupled facility operations platform with membership management and attendance logging.',
    features: [
      'LeadLens: Next.js 16 App Router, BullMQ Redis background worker queues, and Google OAuth',
      'Gym Management System: ASP.NET Core Web API, C#, Entity Framework Core, and React 18',
      'Role-based admin portals, member self-service dashboards, and automated billing flows',
      'Production-ready codebases with public live demos and GitHub repositories',
    ],
    techStack: [
      'Next.js 16',
      'React 19',
      'ASP.NET Core',
      'C#',
      'TypeScript',
      'Prisma 5',
      'Entity Framework Core',
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
      screenSubtitle: 'Asynchronous queues, REST APIs, and role-based portals',
      stats: [
        { label: 'App 1', val: 'LeadLens SaaS', isGood: true },
        { label: 'App 2', val: 'Gym Management', isGood: true },
        { label: 'Stacks', val: 'Next.js & .NET', isGood: true },
        { label: 'Source', val: 'GitHub Available', isGood: true },
      ],
      terminalLine: 'Web applications compiled and operational.',
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
    category: 'AGENTIC AI PLATFORM',
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
      'Multi-tenant Agentic AI platform combining semantic vector search, knowledge graphs, browser automation, and multi-agent workflows.',
    description:
      'Full-stack AI application for tracking job applications and tailoring resumes. It features autonomous web scraping with Playwright, semantic matching via pgvector, graph relationship analysis in Neo4j, and a 3-agent AutoGen team that drafts and refines cover letters.',
    features: [
      'Multi-Agent Collaboration: 3-agent AutoGen crew (Researcher, Writer, Critic) writing customized cover letters',
      'Autonomous Browser Scraper: LangGraph state machine with headless Playwright to scrape postings reliably',
      'Semantic Search & Matching: 384-dimensional vector embeddings with local sentence-transformers and pgvector',
      'Skill Knowledge Graph: Neo4j 5 graph queries to identify co-occurring technical competencies across job markets',
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
      { label: 'AI AGENTS', value: 'AutoGen & LangGraph' },
      { label: 'VECTOR DB', value: 'pgvector (384-d)' },
      { label: 'GRAPH DB', value: 'Neo4j 5' },
    ],
    mockup: {
      type: 'browser',
      appName: 'AI Job Tracker',
      appCategory: 'AGENTIC AI • MULTI-AGENT SYSTEM',
      screenTitle: 'AI Engineer Job Tracker',
      screenSubtitle: 'FastAPI • Next.js 14 • LangGraph • AutoGen',
      stats: [
        { label: 'Multi-Agent', val: 'AutoGen Crew', isGood: true },
        { label: 'Vector Search', val: 'pgvector', isGood: true },
        { label: 'Knowledge Graph', val: 'Neo4j 5', isGood: true },
        { label: 'Web Scraper', val: 'Playwright', isGood: true },
      ],
      terminalLine: 'Multi-agent pipeline and vector index active.',
    },
    githubUrl: 'https://github.com/kashif0074/job-tracker-api',
    liveUrl: 'https://github.com/kashif0074/job-tracker-api',
  },
  {
    id: 'avatar-chat',
    number: '04',
    title: 'AI Voice & Healthcare Intelligence',
    plaque: 'AI & SYSTEMS',
    tagline: 'Avatar Chat (Real-Time Voice AI) & CMS Provider Directory (Python & Flask)',
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
      'Production platforms for browser-native conversational voice AI and automated Medicare provider intelligence.',
    description:
      'Two production systems: Avatar Chat, a zero-GPU conversational talking avatar running directly in the browser with neural voice synthesis and Groq LLM, and CMS Provider Directory, a Python platform querying 2M+ Medicare records with automated contact discovery.',
    features: [
      'Avatar Chat: Zero-GPU lip-sync using Web Audio envelope analysis, Edge Neural TTS, and low-latency Groq LLM',
      'CMS Provider Directory: Live search across 2M+ Medicare records with multi-source contact research',
      'Strict verification filters that exclude generic aggregators and prevent pattern guessing',
      'Full open-source repositories and live public deployments on Render',
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
      { label: 'HOSTING', value: 'Render.com' },
    ],
    mockup: {
      type: 'browser',
      appName: 'AI & Healthcare Systems',
      appCategory: 'AI AVATAR • CMS MEDICARE DIRECTORY',
      screenTitle: 'Avatar Chat & CMS Provider Directory',
      screenSubtitle: 'Real-time conversational voice and healthcare provider intelligence',
      stats: [
        { label: 'Voice AI', val: 'Avatar Chat (Ava)', isGood: true },
        { label: 'Directory', val: 'CMS Directory', isGood: true },
        { label: 'Backends', val: 'Python & Node.js', isGood: true },
        { label: 'Hosting', val: 'Render.com', isGood: true },
      ],
      terminalLine: 'Both systems deployed and operational.',
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
                            <div key={fIdx} className="flex items-start space-x-2.5 text-xs text-neutral-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
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
                              'Autonomous Scraper: LangGraph state machine with Playwright browser automation',
                              'Multi-Agent Workflows: 3-agent AutoGen team (Researcher, Writer, Critic)',
                              'Semantic Matching & Knowledge Graph: pgvector search with Neo4j 5 traversal',
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
                          Full-stack Agentic AI application for tracking job opportunities and optimizing applications. Features an autonomous browser scraper, semantic resume-to-job matching with pgvector, graph relationship analysis in Neo4j, and a collaborative 3-agent AutoGen crew for tailoring cover letters.
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
                        5 CORE AI SYSTEM CAPABILITIES:
                      </span>

                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-[#0E131E] border border-white/5 space-y-1">
                          <span className="text-xs font-bold text-white block">
                            1. LLM Skill Extraction (Groq)
                          </span>
                          <p className="text-[11px] text-neutral-300 leading-relaxed">
                            Parses job descriptions using Groq LLM with structured JSON output, extracting key technical competencies accurately without hallucination.
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-[#0E131E] border border-white/5 space-y-1">
                          <span className="text-xs font-bold text-white block">
                            2. Semantic Search & RAG (pgvector)
                          </span>
                          <p className="text-[11px] text-neutral-300 leading-relaxed">
                            Generates 384-dimensional resume embeddings using local sentence-transformers and calculates cosine similarity against job postings in pgvector.
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-[#0E131E] border border-white/5 space-y-1">
                          <span className="text-xs font-bold text-white block">
                            3. GraphRAG Knowledge Graph (Neo4j 5)
                          </span>
                          <p className="text-[11px] text-neutral-300 leading-relaxed">
                            Traverses <code className="text-emerald-300 text-[10px]">{'(Job)-[:REQUIRES]->(Skill)'}</code> relationships in Neo4j to identify adjacent skills frequently required across postings.
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-[#0E131E] border border-white/5 space-y-1">
                          <span className="text-xs font-bold text-white block">
                            4. Autonomous Browser Scraper (LangGraph + Playwright)
                          </span>
                          <p className="text-[11px] text-neutral-300 leading-relaxed">
                            A LangGraph state machine driving headless Playwright to scrape postings, navigate pages, and extract technical requirements.
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-[#0E131E] border border-white/5 space-y-1">
                          <span className="text-xs font-bold text-white block">
                            5. Multi-Agent Orchestration (Microsoft AutoGen)
                          </span>
                          <p className="text-[11px] text-neutral-300 leading-relaxed">
                            A 3-agent crew (Researcher, Writer, Critic) collaborating to analyze job postings, draft targeted cover letters, and critique revisions before approval.
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
