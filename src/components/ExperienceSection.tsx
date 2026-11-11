// src/components/ExperienceSection.tsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { animationConfig } from '../config/animationConfig';

interface BulletPoint {
  heading: string;
  text: string;
}

interface RouteStop {
  id: string;
  year: string;
  title: string;
  organization: string;
  badge?: string;
  bullets: BulletPoint[];
  tech: string[];
}

const journey: RouteStop[] = [
  {
    id: '01',
    year: 'JUNE 2026 – PRESENT',
    title: 'FULL-STACK & AI ENGINEER',
    organization: 'REVIVE MEDICAL TECHNOLOGIES INC.',
    badge: 'CURRENT ROLE',
    bullets: [
      {
        heading: 'AI Integration & Conversational Agents',
        text: 'Engineered and integrated advanced conversational AI features, including Groq API endpoints and custom HeyGen voice/video avatar chat assistants, into Remote Patient Monitoring (RPM) platforms.',
      },
      {
        heading: 'Full-Stack Web Development',
        text: 'Designed, developed, and maintained production-grade web applications using React, Next.js, TypeScript, Node.js, and Express.js, ensuring high performance and responsive user experiences.',
      },
      {
        heading: 'Database & Architecture',
        text: 'Managed robust data layers with MongoDB Atlas and PostgreSQL, optimizing API routing and securing backend microservices.',
      },
    ],
    tech: [
      'Groq API',
      'HeyGen Avatars',
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Express.js',
      'MongoDB Atlas',
      'PostgreSQL',
    ],
  },
  {
    id: '02',
    year: 'MAY 2022 – APRIL 2025',
    title: 'LOGISTICS ASSISTANT',
    organization: 'DARAZ PAKISTAN',
    badge: 'PREVIOUS EXPERIENCE',
    bullets: [
      {
        heading: 'Order & Shipment Management',
        text: 'Managed order tracking, shipment updates, and delivery status through internal software.',
      },
      {
        heading: 'Digital Operations',
        text: 'Used digital platforms to maintain inventory, order records, and operational data.',
      },
      {
        heading: 'Technical Coordination',
        text: 'Coordinated with technical and logistics teams to resolve order-processing issues.',
      },
    ],
    tech: [
      'Logistics Management',
      'Shipment Tracking',
      'Inventory Systems',
      'Operations Workflow',
    ],
  },
];

export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 90%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full font-sans pt-16 pb-28 px-6 sm:px-12 lg:px-20 overflow-hidden"
      style={{
        backgroundColor: 'var(--primary-background)',
        color: 'var(--primary-text)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      {/* Subtle Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full blur-[150px] pointer-events-none opacity-30 animate-ambient-pulse"
        style={{ backgroundColor: 'var(--border-subtle)' }}
      />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: animationConfig.easings.luxury }}
          className="flex items-center space-x-4 mb-7"
        >
          <span
            className="text-[11px] font-bold tracking-[0.35em] uppercase"
            style={{ 
              fontFamily: "'Montserrat', sans-serif",
              color: 'var(--accent-text)',
            }}
          >
            04 / PROFESSIONAL EXPERIENCE
          </span>
          <div 
            className="w-20 h-[2px]"
            style={{
              background: 'linear-gradient(to right, var(--accent-color), transparent)',
            }}
          />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: animationConfig.easings.luxury }}
          className="mb-16"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span 
              className="block text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(to bottom, var(--primary-text), var(--secondary-text))',
              }}
            >
              CAREER TRAJECTORY.
            </span>
            <span 
              className="block text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(to bottom, var(--accent-secondary), var(--primary-text))',
              }}
            >
              INDUSTRY IMPACT.
            </span>
          </h2>
        </motion.div>

        {/* Minimalist Route Map */}
        <div className="relative w-full">
          
          {/* Background Track */}
          <div 
            className="absolute left-[19px] md:left-[160px] top-4 bottom-8 w-[2px]"
            style={{ backgroundColor: 'var(--border-subtle)' }}
          />
          
          {/* Animated Track */}
          <motion.div
            style={{ 
              height: lineHeight,
              background: 'linear-gradient(to bottom, var(--accent-color), var(--accent-secondary))',
            }}
            className="absolute left-[19px] md:left-[160px] top-4 w-[2px] shadow-xs origin-top"
          />

          <div className="space-y-16">
            {journey.map((stop, idx) => (
              <motion.div
                key={stop.id}
                initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: idx * 0.12, ease: animationConfig.easings.luxury }}
                className="relative flex flex-col md:flex-row items-start group"
              >
                {/* Desktop Year (Left side of track) */}
                <div className="hidden md:block w-[160px] shrink-0 pr-8 pt-0.5 text-right">
                  <span 
                    className="text-[10.5px] font-mono tracking-[0.2em] transition-colors block font-semibold"
                    style={{ color: 'var(--muted-text)' }}
                  >
                    {stop.year}
                  </span>
                  {stop.badge && (
                    <span 
                      className="inline-block mt-2 text-[8px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-xs font-bold"
                      style={{
                        backgroundColor: 'var(--card-background)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--accent-text)',
                      }}
                    >
                      {stop.badge}
                    </span>
                  )}
                </div>

                {/* Route Node */}
                <div className="absolute left-[19px] md:left-[160px] top-1.5 -translate-x-1/2 flex items-center justify-center">
                  <div 
                    className="w-3.5 h-3.5 rounded-full shadow-xs group-hover:scale-125 transition-transform duration-300"
                    style={{
                      backgroundColor: 'var(--card-background)',
                      border: '2px solid var(--accent-color)',
                    }}
                  />
                </div>

                {/* Content Box (Right side of track) */}
                <motion.div 
                  data-cursor="view"
                  whileHover={{ y: -4, boxShadow: '0 16px 36px -10px rgba(20, 33, 61, 0.1)' }}
                  transition={{ duration: 0.3 }}
                  className="ml-14 md:ml-12 pl-2 w-full max-w-2xl p-6 sm:p-7 rounded-sm shadow-sm transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--card-background)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  {/* Mobile Year & Badge */}
                  <div className="md:hidden flex items-center space-x-2 mb-2">
                    <span 
                      className="text-[10px] font-mono tracking-[0.2em] font-bold"
                      style={{ color: 'var(--accent-text)' }}
                    >
                      {stop.year}
                    </span>
                    {stop.badge && (
                      <span 
                        className="text-[8px] font-mono tracking-widest uppercase px-1.5 py-0.2 rounded-xs font-bold"
                        style={{
                          backgroundColor: 'var(--card-background)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--accent-text)',
                        }}
                      >
                        {stop.badge}
                      </span>
                    )}
                  </div>

                  <h3
                    className="text-3xl sm:text-4xl tracking-wide mb-1 leading-none uppercase"
                    style={{ 
                      fontFamily: "'Bebas Neue', sans-serif",
                      color: 'var(--primary-text)',
                    }}
                  >
                    {stop.title}
                  </h3>
                  
                  <span 
                    className="block text-[11px] font-bold tracking-[0.2em] uppercase mb-4"
                    style={{ 
                      fontFamily: "'Montserrat', sans-serif",
                      color: 'var(--accent-text)',
                    }}
                  >
                    {stop.organization}
                  </span>
                  
                  {/* Detailed Bullet Points */}
                  <div className="space-y-3 mb-6">
                    {stop.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start space-x-2.5">
                        <span 
                          className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          style={{ backgroundColor: 'var(--accent-color)' }}
                        />
                        <p 
                          className="text-xs sm:text-[13.5px] font-normal leading-[1.7]"
                          style={{ 
                            fontFamily: "'Montserrat', sans-serif",
                            color: 'var(--secondary-text)',
                          }}
                        >
                          <strong 
                            className="font-bold"
                            style={{ color: 'var(--primary-text)' }}
                          >
                            {b.heading}:
                          </strong>{' '}
                          {b.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div 
                    className="flex flex-wrap gap-1.5 pt-4"
                    style={{ borderTop: '1px solid var(--border-subtle)' }}
                  >
                    {stop.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-[9.5px] font-mono tracking-wider uppercase rounded-[2px] font-medium transition-colors duration-200 hover:bg-neutral-200/50"
                        style={{
                          backgroundColor: 'var(--card-subtle-background)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--primary-text)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
