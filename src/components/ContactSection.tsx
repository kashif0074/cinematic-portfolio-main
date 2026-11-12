// src/components/ContactSection.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { animationConfig } from '../config/animationConfig';

interface ContactItem {
  tag: string;
  label: string;
  value: string;
  href: string;
  target?: string;
  copyable?: boolean;
  icon: React.ReactNode;
}

const contactChannels: ContactItem[] = [
  {
    tag: '// 01: DIRECT EMAIL',
    label: 'Primary Communication Channel',
    value: 'malik.kaxif7@gmail.com',
    href: 'mailto:malik.kaxif7@gmail.com',
    copyable: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    tag: '// 02: PHONE & WHATSAPP',
    label: 'Direct Telephony & Instant Messaging',
    value: '+92 344 5089014',
    href: 'https://wa.me/923445089014',
    target: '_blank',
    copyable: true,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    tag: '// 03: PROFESSIONAL NETWORK',
    label: 'LinkedIn Verified Profile',
    value: 'linkedin.com/in/kashif-shahzad-581297369',
    href: 'https://www.linkedin.com/in/kashif-shahzad-581297369',
    target: '_blank',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
  },
  {
    tag: '// 04: OPEN SOURCE & REPOSITORIES',
    label: 'GitHub Code Repositories & Architectures',
    value: 'github.com/kashif0074',
    href: 'https://github.com/kashif0074',
    target: '_blank',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
];

export const ContactSection: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <footer
      id="contact"
      className="relative w-full font-sans pt-20 pb-16 px-6 sm:px-12 lg:px-20 overflow-hidden"
      style={{
        backgroundColor: 'var(--secondary-background)',
        color: 'var(--primary-text)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ================= LEFT COLUMN: INTRO & CONTEXT (5 COLS) ================= */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Eyebrow Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: animationConfig.easings.luxury }}
                className="flex items-center space-x-4 mb-5"
              >
                <span
                  className="text-[11px] font-bold tracking-[0.35em] uppercase"
                  style={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    color: 'var(--accent-text)',
                  }}
                >
                  05 / CONTACT
                </span>
                <div 
                  className="w-16 h-[2px]"
                  style={{
                    background: 'linear-gradient(to right, var(--accent-color), transparent)',
                  }}
                />
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: animationConfig.easings.luxury }}
                className="mb-6"
              >
                <h2
                  className="text-5xl sm:text-6xl md:text-7xl tracking-tight uppercase leading-[0.85] select-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <span 
                    className="block text-transparent bg-clip-text"
                    style={{
                      backgroundImage: 'linear-gradient(to bottom, var(--primary-text), var(--secondary-text))',
                    }}
                  >
                    INITIALIZE
                  </span>
                  <span 
                    className="block text-transparent bg-clip-text"
                    style={{
                      backgroundImage: 'linear-gradient(to bottom, var(--accent-secondary), var(--primary-text))',
                    }}
                  >
                    TRANSMISSION.
                  </span>
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-xs sm:text-[14px] font-normal leading-relaxed max-w-md mb-8"
                style={{ 
                  fontFamily: "'Montserrat', sans-serif",
                  color: 'var(--secondary-text)',
                }}
              >
                Have an ambitious system to architect, an engineering opportunity, or a collaborative technical inquiry? Reach out directly through any verified channel on the terminal.
              </motion.p>

              {/* Status Meta Cards */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="space-y-3 max-w-md pt-2"
              >
                <div 
                  className="p-3.5 rounded-sm border flex items-center space-x-3"
                  style={{
                    backgroundColor: 'var(--card-background)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono tracking-wider uppercase font-semibold text-neutral-400">
                      CURRENT AVAILABILITY
                    </span>
                    <span 
                      className="text-xs font-semibold"
                      style={{ color: 'var(--primary-text)' }}
                    >
                      Open for Full-Stack, AI &amp; Engineering Roles
                    </span>
                  </div>
                </div>

                <div 
                  className="p-3.5 rounded-sm border flex items-center space-x-3"
                  style={{
                    backgroundColor: 'var(--card-background)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <span className="text-sm flex-shrink-0" style={{ color: 'var(--accent-color)' }}>⚡</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono tracking-wider uppercase font-semibold text-neutral-400">
                      RESPONSE LATENCY
                    </span>
                    <span 
                      className="text-xs font-semibold"
                      style={{ color: 'var(--primary-text)' }}
                    >
                      Replies typically within 24 hours
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: PRECISION CONTACT CARD (7 COLS) ================= */}
          <motion.div
            initial={{ opacity: 0, y: 25, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: animationConfig.easings.luxury }}
            className="lg:col-span-7 relative w-full rounded-sm p-6 sm:p-9 shadow-md overflow-hidden"
            style={{
              backgroundColor: 'var(--card-background)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {/* Top Horizon Edge */}
            <div 
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: 'linear-gradient(to right, transparent, var(--accent-color), transparent)',
              }}
            />
            
            {/* Precision Corner Crosshairs */}
            <div 
              className="absolute top-0 left-0 w-3 h-3 border-t border-l"
              style={{ borderColor: 'var(--accent-color)' }}
            />
            <div 
              className="absolute top-0 right-0 w-3 h-3 border-t border-r"
              style={{ borderColor: 'var(--accent-color)' }}
            />
            <div 
              className="absolute bottom-0 left-0 w-3 h-3 border-b border-l"
              style={{ borderColor: 'var(--accent-color)' }}
            />
            <div 
              className="absolute bottom-0 right-0 w-3 h-3 border-b border-r"
              style={{ borderColor: 'var(--accent-color)' }}
            />

            {/* Card Header */}
            <div className="pb-5 mb-5 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-subtle)' }}>
              <div>
                <span 
                  className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold block"
                  style={{ color: 'var(--accent-text)' }}
                >
                  // SECURE CHANNELS
                </span>
                <h3 
                  className="text-lg sm:text-xl font-bold tracking-tight mt-0.5"
                  style={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    color: 'var(--primary-text)',
                  }}
                >
                  Direct Communication Terminal
                </h3>
              </div>
              <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-1 rounded-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold uppercase">
                Active &amp; Monitored
              </span>
            </div>

            {/* 4 Contact Channel Blocks */}
            <div className="space-y-3.5">
              {contactChannels.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target={item.target}
                  rel={item.target ? 'noopener noreferrer' : undefined}
                  data-cursor="pointer"
                  className="group relative flex items-center justify-between p-4 sm:p-4.5 rounded-sm border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md block"
                  style={{
                    backgroundColor: 'var(--card-subtle-background)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <div className="flex items-center space-x-4 min-w-0 flex-1">
                    {/* Icon container */}
                    <div 
                      className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: 'var(--card-background)',
                        color: 'var(--accent-color)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      {item.icon}
                    </div>

                    {/* Channel Text Details */}
                    <div className="flex flex-col min-w-0 pr-3">
                      <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-neutral-400">
                        {item.tag}
                      </span>
                      <span 
                        className="text-xs sm:text-[14px] font-mono font-semibold truncate group-hover:underline mt-0.5"
                        style={{ color: 'var(--primary-text)' }}
                      >
                        {item.value}
                      </span>
                      <span className="text-[11px] text-neutral-400 hidden sm:block mt-0.5">
                        {item.label}
                      </span>
                    </div>
                  </div>

                  {/* Right Actions: Copy or Open Arrow */}
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    {item.copyable && (
                      <button
                        onClick={(e) => handleCopy(item.value, idx, e)}
                        title="Copy to clipboard"
                        className="p-2 rounded-xs border text-[10px] font-mono tracking-wider uppercase transition-colors"
                        style={{
                          borderColor: 'var(--border-subtle)',
                          backgroundColor: 'var(--card-background)',
                          color: copiedIndex === idx ? 'var(--accent-color)' : 'var(--muted-text)',
                        }}
                      >
                        {copiedIndex === idx ? 'COPIED!' : 'COPY'}
                      </button>
                    )}

                    <div 
                      className="w-8 h-8 rounded-xs border flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                      style={{
                        borderColor: 'var(--border-subtle)',
                        backgroundColor: 'var(--card-background)',
                        color: 'var(--primary-text)',
                      }}
                    >
                      <span className="text-xs">↗</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Bottom Terminal Footer Note */}
            <div 
              className="mt-6 pt-4 border-t flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-400 gap-2"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <span>Location: Islamabad, Pakistan (PKT / UTC+5)</span>
              <span className="text-emerald-400">● Channels Operational</span>
            </div>
          </motion.div>

        </div>

        {/* System Footer Line */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pt-16 mt-16 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <span 
            className="text-[10px] font-mono tracking-widest uppercase font-semibold"
            style={{ color: 'var(--muted-text)' }}
          >
            KASHIF SHAHZAD // PORTFOLIO EDITION 2026
          </span>
          <span 
            className="text-[10px] font-mono"
            style={{ color: 'var(--muted-text)' }}
          >
            © {new Date().getFullYear()} • ENGINEERED WITH PRECISION
          </span>
        </motion.div>

      </div>
    </footer>
  );
};

export default ContactSection;
