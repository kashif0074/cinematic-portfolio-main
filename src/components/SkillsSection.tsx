import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Magnetic } from './Magnetic';
import { animationConfig } from '../config/animationConfig';

interface SkillItem {
  name: string;
  level: number;
  status: 'EXPERT' | 'ADVANCED' | 'PRODUCTION';
}

interface SkillCategory {
  id: string;
  title: string;
  badge: string;
  icon: string;
  stat: string;
  summary: string;
  colSpan: string;
  items: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    id: 'ai',
    title: 'AI & AUTOMATION',
    badge: 'CORE INTELLIGENCE',
    icon: '⚡',
    stat: 'AGENTIC & RAG',
    summary:
      'Designing autonomous multi-agent pipelines, vector retrieval RAG architectures, LLM fine-tuning and tool calling, predictive machine learning models, and enterprise workflow automation.',
    colSpan: 'lg:col-span-7',
    items: [
      { name: 'LLM Integration', level: 96, status: 'EXPERT' },
      { name: 'RAG', level: 95, status: 'EXPERT' },
      { name: 'AI Agents', level: 94, status: 'EXPERT' },
      { name: 'Machine Learning', level: 90, status: 'ADVANCED' },
      { name: 'Scikit-learn', level: 88, status: 'ADVANCED' },
      { name: 'Pandas', level: 92, status: 'ADVANCED' },
      { name: 'AI Workflow Automation', level: 95, status: 'EXPERT' },
    ],
  },
  {
    id: 'frontend',
    title: 'FRONTEND DEVELOPMENT',
    badge: 'IMMERSIVE INTERFACES',
    icon: '◈',
    stat: 'WEB & MOBILE',
    summary:
      'Crafting high-performance client architectures, 3D WebGL experiences with Three.js, cross-platform mobile apps with React Native, and pixel-precise responsive design systems.',
    colSpan: 'lg:col-span-5',
    items: [
      { name: 'React.js', level: 98, status: 'EXPERT' },
      { name: 'Next.js', level: 95, status: 'EXPERT' },
      { name: 'React Native', level: 90, status: 'ADVANCED' },
      { name: 'TypeScript', level: 94, status: 'EXPERT' },
      { name: 'JavaScript', level: 96, status: 'EXPERT' },
      { name: 'Three.js', level: 86, status: 'ADVANCED' },
      { name: 'Tailwind CSS', level: 96, status: 'EXPERT' },
    ],
  },
  {
    id: 'backend',
    title: 'BACKEND DEVELOPMENT',
    badge: 'DISTRIBUTED ARCHITECTURE',
    icon: '⬡',
    stat: 'HIGH CONCURRENCY',
    summary:
      'Building fault-tolerant server systems, high-concurrency microservices, robust RESTful APIs, and hardened authentication frameworks with JWT and OAuth protocols.',
    colSpan: 'lg:col-span-5',
    items: [
      { name: 'Node.js', level: 95, status: 'EXPERT' },
      { name: 'Express.js', level: 94, status: 'EXPERT' },
      { name: 'Python', level: 92, status: 'EXPERT' },
      { name: 'PHP', level: 85, status: 'ADVANCED' },
      { name: 'REST APIs', level: 97, status: 'EXPERT' },
      { name: 'JWT', level: 94, status: 'PRODUCTION' },
      { name: 'OAuth', level: 92, status: 'PRODUCTION' },
    ],
  },
  {
    id: 'database',
    title: 'DATABASES & TOOLS',
    badge: 'PERSISTENCE & DEVOPS',
    icon: '✦',
    stat: 'CLOUD & DEPLOYMENT',
    summary:
      'Engineering relational and document data layers with optimized query performance alongside modern CI/CD tooling, cloud deployments, and developer environments.',
    colSpan: 'lg:col-span-7',
    items: [
      { name: 'MongoDB', level: 94, status: 'EXPERT' },
      { name: 'PostgreSQL', level: 92, status: 'EXPERT' },
      { name: 'MySQL', level: 90, status: 'ADVANCED' },
      { name: 'Supabase', level: 92, status: 'ADVANCED' },
      { name: 'Firebase', level: 88, status: 'ADVANCED' },
      { name: 'Git', level: 96, status: 'EXPERT' },
      { name: 'GitHub', level: 96, status: 'EXPERT' },
      { name: 'Postman', level: 94, status: 'PRODUCTION' },
      { name: 'Vercel', level: 95, status: 'PRODUCTION' },
      { name: 'Render', level: 90, status: 'PRODUCTION' },
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: animationConfig.stagger.default,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: animationConfig.durations.normal,
      ease: animationConfig.easings.luxury,
    },
  },
};

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const displayedCategories =
    activeTab === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === activeTab);

  return (
    <section
      id="skills"
      className="relative w-screen font-sans pt-16 pb-28 px-6 sm:px-12 lg:px-20 overflow-hidden flex flex-col justify-center"
      style={{
        backgroundColor: 'var(--secondary-background)',
        color: 'var(--primary-text)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      {/* Ambient Glows */}
      <div 
        className="absolute top-1/4 left-1/4 w-[36rem] h-[36rem] rounded-full blur-[160px] pointer-events-none opacity-30 animate-ambient-pulse"
        style={{ backgroundColor: 'var(--border-subtle)' }}
      />
      <div 
        className="absolute bottom-12 right-1/4 w-[32rem] h-[32rem] rounded-full blur-[150px] pointer-events-none opacity-25 animate-ambient-pulse"
        style={{ backgroundColor: 'var(--border-color)', animationDelay: '4s' }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: animationConfig.easings.luxury }}
          className="flex items-center space-x-4 mb-6"
        >
          <span
            className="text-[11px] font-bold tracking-[0.35em] uppercase"
            style={{ 
              fontFamily: "'Montserrat', sans-serif",
              color: 'var(--accent-text)',
            }}
          >
            03 / TECHNICAL SKILLS VISUALIZATION
          </span>
          <div 
            className="w-24 h-[2px]"
            style={{
              background: 'linear-gradient(to right, var(--accent-color), transparent)',
            }}
          />
        </motion.div>

        {/* Section Headline & Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: animationConfig.easings.luxury }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
        >
          <div>
            <h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] tracking-tight uppercase leading-[0.85] select-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <span 
                className="block text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(to bottom, var(--primary-text), var(--secondary-text))',
                }}
              >
                TECHNICAL SPECTRUM.
              </span>
              <span 
                className="block text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(to bottom, var(--accent-secondary), var(--primary-text))',
                }}
              >
                ENGINEERED PRECISION.
              </span>
            </h2>
          </div>

          {/* Quick Metrics Bar with Subtle Hover Lift */}
          <div className="flex items-center gap-4 sm:gap-6 pt-2">
            {[
              { val: '31', label: 'TECHNOLOGIES' },
              { val: '4', label: 'CORE DOMAINS', accent: true },
              { val: '100%', label: 'PRODUCTION READY' },
            ].map((m, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="px-4 py-2.5 rounded-sm shadow-xs cursor-default"
                style={{
                  backgroundColor: 'var(--card-background)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <span 
                  className="block text-2xl font-light leading-none"
                  style={{ 
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: m.accent ? 'var(--accent-text)' : 'var(--primary-text)',
                  }}
                >
                  {m.val}
                </span>
                <span 
                  className="text-[9px] font-mono tracking-[0.2em] uppercase font-semibold"
                  style={{ color: 'var(--muted-text)' }}
                >
                  {m.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Category Navigation Filter Pills with Magnetic buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap gap-2.5 mb-10 pb-3"
          style={{ borderBottom: '1px solid var(--border-subtle)' }}
        >
          {[
            { id: 'all', label: 'ALL CAPABILITIES (31)' },
            { id: 'ai', label: 'AI & AUTOMATION (7)' },
            { id: 'frontend', label: 'FRONTEND DEVELOPMENT (7)' },
            { id: 'backend', label: 'BACKEND DEVELOPMENT (7)' },
            { id: 'database', label: 'DATABASES & TOOLS (10)' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Magnetic key={tab.id} strength={0.2}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  data-cursor="magnetic"
                  className="relative px-4 py-2 text-[10.5px] font-bold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 cursor-pointer shadow-xs"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    backgroundColor: isActive ? 'var(--button-primary)' : 'var(--card-background)',
                    color: isActive ? 'var(--button-text)' : 'var(--secondary-text)',
                    border: `1px solid ${isActive ? 'var(--button-border)' : 'var(--border-subtle)'}`,
                  }}
                >
                  {tab.label}
                </button>
              </Magnetic>
            );
          })}
        </motion.div>

        {/* Bento Grid Technical Skills Visualization */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {displayedCategories.map((block) => (
              <motion.div
                key={block.title}
                variants={cardVariants}
                data-cursor="view"
                whileHover={{ y: -4, boxShadow: '0 16px 36px -10px rgba(20, 33, 61, 0.1)' }}
                transition={{ duration: 0.3 }}
                className={`${
                  activeTab === 'all' ? block.colSpan : 'lg:col-span-12'
                } relative p-7 sm:p-9 rounded-sm shadow-sm overflow-hidden transition-all duration-300 group`}
                style={{
                  backgroundColor: 'var(--card-background)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {/* Top Border Accent */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(to right, transparent, var(--accent-color), transparent)',
                  }}
                />

                {/* Corner Minimal Pins */}
                <div 
                  className="absolute top-0 left-0 w-3 h-3 border-t border-l transition-colors duration-300"
                  style={{ borderColor: 'var(--accent-color)' }}
                />
                <div 
                  className="absolute bottom-0 right-0 w-3 h-3 border-b border-r transition-colors duration-300"
                  style={{ borderColor: 'var(--accent-color)' }}
                />

                {/* Card Meta Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm" style={{ color: 'var(--accent-color)' }}>{block.icon}</span>
                    <span 
                      className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold"
                      style={{ color: 'var(--accent-text)' }}
                    >
                      {block.badge}
                    </span>
                  </div>
                  <span 
                    className="text-[10px] font-mono px-2.5 py-0.5 rounded-xs font-semibold"
                    style={{
                      backgroundColor: 'var(--card-subtle-background)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--primary-text)',
                    }}
                  >
                    {block.stat}
                  </span>
                </div>

                {/* Category Title */}
                <h3
                  className="text-3xl sm:text-4xl font-normal tracking-wide mb-2"
                  style={{ 
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: 'var(--primary-text)',
                  }}
                >
                  {block.title}
                </h3>

                {/* Description */}
                <p
                  className="text-xs sm:text-[13.5px] font-normal leading-relaxed mb-6"
                  style={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    color: 'var(--secondary-text)',
                  }}
                >
                  {block.summary}
                </p>

                {/* Detailed Interactive Skill Meters */}
                <div 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5"
                  style={{ borderTop: '1px solid var(--border-subtle)' }}
                >
                  {block.items.map((tech) => (
                    <motion.div
                      key={tech.name}
                      onMouseEnter={() => setHoveredSkill(tech.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      whileHover={{ scale: 1.015 }}
                      transition={{ duration: 0.2 }}
                      className="p-3 rounded-sm border transition-colors duration-200 shadow-xs cursor-default"
                      style={{
                        backgroundColor: hoveredSkill === tech.name ? 'var(--card-background)' : 'var(--card-subtle-background)',
                        borderColor: hoveredSkill === tech.name ? 'var(--button-border)' : 'var(--border-subtle)',
                      }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className="text-[11.5px] font-bold tracking-[0.1em]"
                          style={{ 
                            fontFamily: "'Montserrat', sans-serif",
                            color: 'var(--primary-text)',
                          }}
                        >
                          {tech.name}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span 
                            className="text-[8.5px] font-mono font-bold tracking-wider px-1.5 py-0.2 rounded-[2px]"
                            style={{
                              backgroundColor: 'var(--card-background)',
                              border: '1px solid var(--border-subtle)',
                              color: 'var(--accent-text)',
                            }}
                          >
                            {tech.status}
                          </span>
                          <span 
                            className="text-[9.5px] font-mono font-semibold"
                            style={{ color: 'var(--muted-text)' }}
                          >
                            {tech.level}%
                          </span>
                        </div>
                      </div>

                      {/* Animated Glow Meter */}
                      <div 
                        className="w-full h-[4px] rounded-full overflow-hidden"
                        style={{ backgroundColor: 'var(--border-subtle)' }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tech.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full"
                          style={{
                            background: 'linear-gradient(to right, var(--accent-secondary), var(--accent-color))',
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default SkillsSection;
