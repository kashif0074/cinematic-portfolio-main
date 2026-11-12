import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import type { Variants } from 'framer-motion';
import aboutImg from '../assets/IMG_9554.png';
import { animationConfig } from '../config/animationConfig';
import { ContinuousWriter } from './ContinuousWriter';

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

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: animationConfig.durations.slow,
      ease: animationConfig.easings.luxury,
    },
  },
};

export const AboutSection: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCardHovered, setIsCardHovered] = useState(false);

  // 1. Motion Values for 3D card physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useMotionValue(200);
  const spotlightY = useMotionValue(200);

  // 2. Springs for 3D Physics
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), { damping: 20, stiffness: 200 });

  // 3. Top-Level Unconditional Transform for Spotlight Background
  const spotlightBg = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) => `radial-gradient(circle 260px at ${x}px ${y}px, rgba(255,255,255,0.7), var(--accent-light), transparent 80%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => setIsCardHovered(true);

  const handleMouseLeave = () => {
    setIsCardHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      id="about" 
      className="relative w-full min-h-screen font-sans py-24 lg:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden flex items-center"
      style={{
        backgroundColor: 'var(--secondary-background)',
        color: 'var(--primary-text)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      {/* ================= BACKGROUND GLOWS WITH PARALLAX/PULSE ================= */}
      <div 
        className="absolute top-1/4 left-1/6 w-[32rem] h-[32rem] rounded-full blur-[140px] pointer-events-none opacity-40 animate-ambient-pulse"
        style={{ backgroundColor: 'var(--border-subtle)' }}
      />
      <div 
        className="absolute bottom-1/6 right-1/4 w-[28rem] h-[28rem] rounded-full blur-[150px] pointer-events-none opacity-30 animate-ambient-pulse"
        style={{ backgroundColor: 'var(--border-color)', animationDelay: '3s' }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div 
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: animationConfig.easings.luxury }}
          className="flex items-center space-x-4 mb-10"
        >
          <span 
            className="text-[11px] font-bold tracking-[0.35em] uppercase"
            style={{ 
              fontFamily: "'Montserrat', sans-serif",
              color: 'var(--accent-text)',
            }}
          >
            01 / ABOUT ME
          </span>
          <div 
            className="w-20 h-[2px]"
            style={{
              background: 'linear-gradient(to right, var(--accent-color), transparent)',
            }}
          />
        </motion.div>

        {/* Main Grid: Content + Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ================= LEFT CONTENT (7 COLS) ================= */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Headline */}
            <motion.div variants={fadeUpVariants} className="relative mb-6 select-none">
              <h2
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] tracking-tight uppercase leading-[0.88]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span 
                  className="block text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(to bottom, var(--primary-text), var(--secondary-text))',
                  }}
                >
                  I DON'T JUST WRITE CODE.
                </span>
                <span 
                  className="block text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(to bottom, var(--accent-secondary), var(--primary-text))',
                  }}
                >
                  I BUILD WHAT'S NEXT.
                </span>
              </h2>
            </motion.div>

            {/* Comprehensive About Paragraphs */}
            <motion.div
              variants={fadeUpVariants}
              className="space-y-4 text-xs sm:text-[14px] font-normal leading-[1.8] tracking-wide mb-6 max-w-2xl"
              style={{ 
                fontFamily: "'Montserrat', sans-serif",
                color: 'var(--secondary-text)',
              }}
            >
              <p>
                I'm <span className="font-bold" style={{ color: 'var(--primary-text)' }}>Kashif Shahzad</span>, an AI Automation Engineer and Full-Stack Developer passionate about building intelligent software solutions that solve real-world problems.
              </p>
              <p>
                I specialize in developing scalable web applications, AI-powered automation systems, and SaaS platforms, with a particular focus on healthcare technology and Remote Patient Monitoring (RPM).
              </p>
              <p>
                With hands-on experience in React, Next.js, TypeScript, Node.js, Python, and modern database technologies, I work across the full software development lifecycle — from designing intuitive user interfaces to building secure backend systems and integrating advanced AI capabilities.
              </p>
              <p>
                My experience includes developing conversational AI assistants, integrating LLMs and voice-enabled avatars, building REST APIs, and creating intelligent automation workflows for healthcare applications.
              </p>
              <p>
                I believe in combining modern engineering practices with innovative AI technologies to create impactful, reliable, and user-focused digital products.
              </p>
            </motion.div>

            {/* Strategic Mission Quote Callout */}
            <motion.div
              variants={fadeUpVariants}
              whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(20,33,61,0.08)' }}
              transition={{ duration: 0.3 }}
              className="relative p-5 sm:p-6 mb-8 rounded-sm max-w-xl shadow-xs transition-transform duration-300"
              style={{
                backgroundColor: 'var(--card-background)',
                borderLeft: '4px solid var(--accent-color)',
                borderTop: '1px solid var(--border-subtle)',
                borderRight: '1px solid var(--border-subtle)',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <p
                className="text-xs sm:text-sm font-semibold italic leading-relaxed"
                style={{ 
                  fontFamily: "'Montserrat', sans-serif",
                  color: 'var(--primary-text)',
                }}
              >
                “My goal is to build smarter software, automate complex processes, and turn innovative ideas into practical technology solutions.”
              </p>
            </motion.div>

            {/* Strategic Domain Focus Metrics */}
            <motion.div 
              variants={fadeUpVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 pb-2"
              style={{ borderTop: '1px solid var(--border-subtle)' }}
            >
              {/* Stat 1 */}
              <motion.div 
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col cursor-default"
              >
                <span 
                  className="text-3xl sm:text-4xl font-light tracking-tight"
                  style={{ 
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: 'var(--primary-text)',
                  }}
                >
                  AI &amp; RPM
                </span>
                <span 
                  className="text-[10.5px] font-semibold tracking-[0.2em] uppercase mt-0.5"
                  style={{ color: 'var(--muted-text)' }}
                >
                  Healthcare Tech
                </span>
              </motion.div>

              {/* Stat 2 */}
              <motion.div 
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col cursor-default"
              >
                <span 
                  className="text-3xl sm:text-4xl font-light tracking-tight"
                  style={{ 
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: 'var(--accent-text)',
                  }}
                >
                  FULL STACK
                </span>
                <span 
                  className="text-[10.5px] font-semibold tracking-[0.2em] uppercase mt-0.5"
                  style={{ color: 'var(--muted-text)' }}
                >
                  React &amp; Node.js
                </span>
              </motion.div>

              {/* Stat 3 */}
              <motion.div 
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col cursor-default"
              >
                <span 
                  className="text-3xl sm:text-4xl font-light tracking-tight"
                  style={{ 
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: 'var(--primary-text)',
                  }}
                >
                  AVATARS
                </span>
                <span 
                  className="text-[10.5px] font-semibold tracking-[0.2em] uppercase mt-0.5"
                  style={{ color: 'var(--muted-text)' }}
                >
                  Conversational AI
                </span>
              </motion.div>

              {/* Stat 4 */}
              <motion.div 
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col cursor-default"
              >
                <span 
                  className="text-3xl sm:text-4xl font-light tracking-tight"
                  style={{ 
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: 'var(--accent-text)',
                  }}
                >
                  AUTOMATION
                </span>
                <span 
                  className="text-[10.5px] font-semibold tracking-[0.2em] uppercase mt-0.5"
                  style={{ color: 'var(--muted-text)' }}
                >
                  Intelligent Pipelines
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT PORTRAIT FRAME ================= */}
          <div className="lg:col-span-5 flex items-center justify-center relative perspective-[1400px]">
            
            {/* Ambient Glow */}
            <div 
              className="absolute -inset-6 blur-2xl rounded-3xl pointer-events-none opacity-50"
              style={{ backgroundColor: 'var(--border-subtle)' }}
            />

            {/* 3D Main Card Container */}
            <motion.div
              ref={cardRef}
              data-cursor="view"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.1, ease: animationConfig.easings.luxury }}
              className="relative p-3.5 rounded-sm shadow-md cursor-pointer group transition-all duration-500"
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                backgroundColor: 'var(--card-background)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {/* Corner Accent Brackets */}
              <div className="pointer-events-none">
                <div 
                  className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
                  style={{ borderColor: 'var(--accent-color)' }}
                />
                <div 
                  className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  style={{ borderColor: 'var(--accent-color)' }}
                />
                <div 
                  className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 transition-transform duration-500 group-hover:-translate-x-1 group-hover:translate-y-1"
                  style={{ borderColor: 'var(--accent-color)' }}
                />
                <div 
                  className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1"
                  style={{ borderColor: 'var(--accent-color)' }}
                />
              </div>

              {/* Portrait Image Canvas */}
              <div 
                className="relative overflow-hidden w-full max-w-[390px] aspect-[4/5] rounded-sm"
                style={{ backgroundColor: 'var(--card-subtle-background)' }}
              >
                {/* Main Portrait */}
                <img
                  src={aboutImg}
                  alt="Kashif Shahzad"
                  className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.04] transition-all duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Mouse-Tracked Spotlight Sweep */}
                <motion.div
                  className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300"
                  style={{
                    background: spotlightBg,
                    opacity: isCardHovered ? 1 : 0,
                  }}
                />

                {/* Bottom Shadow for Signature */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                {/* Monoline Signature in Primary Background Tint */}
                <div className="absolute bottom-4 right-4 z-20 select-none">
                  <span 
                    className="text-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] transition-colors duration-300"
                    style={{ 
                      fontFamily: "'Herr Von Muellerhoff', cursive",
                      color: 'var(--primary-background)',
                    }}
                  >
                    Kashif Shahzad
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
