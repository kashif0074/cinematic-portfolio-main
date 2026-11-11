import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Magnetic } from './Magnetic';
import { animationConfig } from '../config/animationConfig';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: animationConfig.stagger.relaxed,
      delayChildren: 0.15,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
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

const navItems = [
  { name: 'ABOUT', href: '#about', id: 'about' },
  { name: 'PROJECTS', href: '#work', id: 'work' },
  { name: 'SKILLS', href: '#skills', id: 'skills' },
  { name: 'EXPERIENCE', href: '#experience', id: 'experience' },
  { name: 'CONTACT', href: '#contact', id: 'contact' },
];

export const HeroSection: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      className="relative w-full min-h-screen md:h-screen overflow-hidden font-sans flex flex-col justify-between"
      style={{
        backgroundColor: 'var(--primary-background)',
        color: 'var(--primary-text)',
      }}
    >
      {/* ================= 1. TOP NAVIGATION BAR ================= */}
      <header className="relative z-30 flex items-center justify-between w-full px-6 sm:px-12 lg:px-16 pt-6 pb-2 pointer-events-auto">
        <Magnetic strength={0.2}>
          <a
            href="#"
            data-cursor="pointer"
            className="text-xs sm:text-sm font-bold tracking-[0.35em] uppercase hover:opacity-75 transition-opacity inline-block"
            style={{ 
              fontFamily: "'Montserrat', sans-serif",
              color: 'var(--primary-text)',
            }}
          >
            KASHIF SHAHZAD .
          </a>
        </Magnetic>

        {/* Desktop Navigation Links with Active Indicator */}
        <nav
          className="hidden md:flex items-center space-x-8 lg:space-x-10 text-[11px] tracking-[0.28em] font-semibold uppercase absolute left-1/2 -translate-x-1/2"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.name}
                href={item.href}
                data-cursor="pointer"
                className="relative group py-1 transition-colors duration-300"
                style={{
                  color: isActive ? 'var(--primary-text)' : 'var(--muted-text)',
                  fontWeight: isActive ? 700 : 600,
                }}
              >
                {item.name}
                {/* Active Indicator Underline */}
                {isActive && (
                  <motion.span
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ backgroundColor: 'var(--accent-color)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {/* Hover Underline if not active */}
                {!isActive && (
                  <span 
                    className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: 'var(--accent-color)' }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action Items: Let's Talk CTA & Mobile Hamburger */}
        <div className="flex items-center space-x-3">
          <Magnetic strength={0.3}>
            <a
              href="#contact"
              data-cursor="magnetic"
              className="group flex items-center space-x-2 text-[11px] tracking-[0.24em] font-semibold uppercase py-2.5 px-5 sm:px-6 transition-all duration-300 shadow-xs rounded-sm hover:shadow-md"
              style={{ 
                fontFamily: "'Montserrat', sans-serif",
                border: '1px solid var(--button-border)',
                backgroundColor: 'var(--button-secondary)',
                color: 'var(--button-secondary-text)',
              }}
            >
              <span>LET&apos;S TALK</span>
              <span className="transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-xs">
                ↗
              </span>
            </a>
          </Magnetic>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-cursor="pointer"
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2.5 rounded-sm border transition-colors cursor-pointer"
            style={{
              borderColor: 'var(--border-subtle)',
              backgroundColor: 'var(--card-background)',
              color: 'var(--primary-text)',
            }}
          >
            {isMobileMenuOpen ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Dropdown Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mx-6 mt-2 p-5 rounded-md shadow-2xl md:hidden z-50 flex flex-col space-y-4"
              style={{
                backgroundColor: 'var(--card-background)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs font-semibold tracking-[0.25em] uppercase py-2 px-3 rounded hover:bg-black/5 transition-colors"
                  style={{
                    color: activeSection === item.id ? 'var(--accent-color)' : 'var(--primary-text)',
                  }}
                >
                  {item.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ================= 2. MAIN HERO LAYOUT ================= */}
      <div className="relative z-20 flex-1 w-full flex flex-col md:flex-row items-center justify-between">
        
        {/* ================= LEFT-SIDE CONTENT CONTAINER ================= */}
        <div className="w-full md:w-1/2 lg:w-[48%] xl:w-[46%] h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-8 md:py-0 z-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-xl flex flex-col justify-center"
          >
            {/* Massive Condensed Headline */}
            <motion.div variants={fadeUpVariants} className="relative mb-3.5 select-none">
              <h1
                className="text-6xl sm:text-7xl md:text-7xl lg:text-[6.5rem] xl:text-[7.2rem] tracking-tight uppercase leading-[0.83]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {/* Line 1: I BUILD */}
                <span 
                  className="block text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(to bottom, var(--primary-text), var(--secondary-text))',
                  }}
                >
                  I BUILD
                </span>

                {/* Line 2: DIGITAL */}
                <span 
                  className="block text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(to bottom, var(--accent-secondary), var(--primary-text))',
                  }}
                >
                  DIGITAL
                </span>

                {/* Line 3: EXPERIENCES */}
                <span 
                  className="block text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(to bottom, var(--primary-text), var(--muted-text))',
                  }}
                >
                  EXPERIENCES
                </span>
              </h1>
            </motion.div>

            {/* Subtitle Technologies */}
            <motion.div variants={fadeUpVariants} className="mb-4">
              <p
                className="text-[10px] sm:text-[11px] md:text-xs font-bold tracking-[0.24em] sm:tracking-[0.28em] uppercase"
                style={{ 
                  fontFamily: "'Montserrat', sans-serif",
                  color: 'var(--accent-text)',
                }}
              >
                AI &amp; FULL STACK ENGINEER <span className="opacity-40 mx-1">•</span> LLM &amp; AGENTS <span className="opacity-40 mx-1">•</span> CLOUD &amp; SYSTEM DESIGN
              </p>
            </motion.div>

            {/* 3-Line Description */}
            <motion.div
              variants={fadeUpVariants}
              className="text-xs sm:text-sm md:text-[14px] font-normal leading-[1.8] tracking-wide max-w-lg mb-6 sm:mb-8 space-y-1"
              style={{ 
                fontFamily: "'Montserrat', sans-serif",
                color: 'var(--secondary-text)',
              }}
            >
              <p>
                I turn bold ideas into seamless digital experiences.
                <br />
                Where frontend meets powerful backend, and code transforms vision into impact.
              </p>
            </motion.div>

            {/* CTA Buttons with Magnetic Attraction */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap items-center gap-4 sm:gap-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {/* Explore My Work CTA */}
              <Magnetic strength={0.28}>
                <motion.a
                  href="#work"
                  data-cursor="magnetic"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center space-x-3 px-6 sm:px-7 py-3.5 text-[11px] font-semibold tracking-[0.24em] uppercase transition-all duration-300 shadow-md rounded-sm overflow-hidden"
                  style={{
                    backgroundColor: 'var(--button-primary)',
                    color: 'var(--button-text)',
                    border: '1px solid var(--button-border)',
                  }}
                >
                  <span className="relative z-10">EXPLORE MY WORK</span>
                  <span className="relative z-10 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-xs">
                    ↗
                  </span>
                  {/* Subtle shine on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </motion.a>
              </Magnetic>

              {/* Download Resume Button */}
              <Magnetic strength={0.28}>
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="magnetic"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center space-x-2 px-6 sm:px-7 py-3.5 text-[11px] font-semibold tracking-[0.24em] uppercase transition-all duration-300 shadow-xs rounded-sm hover:shadow-md"
                  style={{
                    backgroundColor: 'var(--button-secondary)',
                    color: 'var(--button-secondary-text)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <span>DOWNLOAD RESUME</span>
                  <span className="transform transition-transform duration-300 group-hover:translate-y-1 text-xs">
                    ↓
                  </span>
                </motion.a>
              </Magnetic>
            </motion.div>
          </motion.div>
        </div>

        {/* ================= RIGHT-SIDE FULL-HEIGHT CINEMATIC VIDEO ================= */}
        <div className="w-full md:absolute md:top-0 md:right-0 md:bottom-0 md:w-1/2 lg:w-[52%] xl:w-[54%] h-[420px] sm:h-[500px] md:h-full overflow-hidden flex items-center justify-end bg-[#0B0C10] z-10">
          {/* Full-Height Hero Video with Smooth Reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{
                objectPosition: '35% center',
              }}
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          </motion.div>

          {/* Floating Quote & Signature Card with Tilt & Magnetic Response */}
          <motion.div
            initial={{ opacity: 0, x: 30, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)' }}
            data-cursor="view"
            className="hidden lg:flex flex-col items-start absolute bottom-8 right-8 xl:bottom-12 xl:right-12 z-20 select-none p-5 sm:p-6 rounded-sm shadow-xl backdrop-blur-md transition-all duration-300"
            style={{
              backgroundColor: 'var(--card-background)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {/* 1. Quote Mark */}
            <span 
              className="text-2xl leading-none font-serif mb-2"
              style={{ color: 'var(--primary-text)' }}
            >
              “
            </span>

            {/* 2. Compact Two-Line Statement */}
            <div 
              className="text-[10px] font-bold tracking-[0.24em] uppercase space-y-1 mb-3"
              style={{ 
                fontFamily: "'Montserrat', sans-serif",
                color: 'var(--primary-text)',
              }}
            >
              <p>CODE IS MY CRAFT.</p>
              <p>IMPACT IS MY GOAL.</p>
            </div>

            {/* 3. Accent Line */}
            <div 
              className="w-28 h-[2px] mb-2"
              style={{
                background: 'linear-gradient(to right, var(--accent-color), transparent)',
              }}
            />

            {/* 4. Fine Monoline Calligraphy Signature */}
            <div 
              className="text-[2.2rem] font-normal leading-none -ml-0.5"
              style={{ 
                fontFamily: "'Herr Von Muellerhoff', 'Allura', cursive",
                letterSpacing: '0.04em',
                color: 'var(--primary-text)',
              }}
            >
              Kashif Shahzad
            </div>
          </motion.div>
        </div>

      </div>

      {/* Bottom Spacer */}
      <div className="h-2 relative z-20 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
