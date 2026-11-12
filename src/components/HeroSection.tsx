import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Magnetic } from './Magnetic';
import { animationConfig } from '../config/animationConfig';
import { useTheme } from '../context/ThemeContext';

const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.08,
    },
  },
};

const letterContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.038,
      delayChildren: 0.05,
    },
  },
};

const letterVariants: Variants = {
  hidden: { y: '115%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const engineerVariants: Variants = {
  hidden: { y: 32, opacity: 0, filter: 'blur(10px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const specializationVariants: Variants = {
  hidden: { x: -36, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
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
  const { isDark, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // High-precision scroll-based active section detection
  useEffect(() => {
    const updateActiveSection = () => {
      if (window.scrollY < 220) {
        setActiveSection('');
        return;
      }

      const viewportAnchor = window.innerHeight * 0.35;
      let currentSection = '';

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportAnchor && rect.bottom >= viewportAnchor) {
            currentSection = item.id;
            break;
          }
        }
      }

      // If scrolled near page bottom, ensure contact is active
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (isBottom) {
        currentSection = 'contact';
      }

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <section 
      className="relative w-full min-h-screen overflow-hidden font-sans flex flex-col justify-between"
      style={{
        backgroundColor: 'var(--primary-background)',
        color: 'var(--primary-text)',
      }}
    >
      {/* ================= 1. TOP NAVIGATION BAR ================= */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 flex items-center justify-between w-full px-6 sm:px-12 lg:px-16 pt-6 pb-2 pointer-events-auto"
      >
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
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          {/* Animated Sun / Moon Theme Toggle */}
          <Magnetic strength={0.3}>
            <button
              onClick={toggleTheme}
              data-cursor="magnetic"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 sm:p-2.5 rounded-sm border transition-all duration-300 cursor-pointer flex items-center justify-center shadow-xs hover:shadow-md"
              style={{
                borderColor: 'var(--border-subtle)',
                backgroundColor: 'var(--button-secondary)',
                color: 'var(--primary-text)',
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.svg
                    key="sun"
                    initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-4 h-4 text-amber-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="moon"
                    initial={{ rotate: 90, scale: 0.6, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: -90, scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-4 h-4 text-sky-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>
          </Magnetic>

          <Magnetic strength={0.3}>
            <a
              href="#contact"
              data-cursor="magnetic"
              className="group flex items-center space-x-2 text-[11px] tracking-[0.24em] font-semibold uppercase py-2.5 px-4 sm:px-6 transition-all duration-300 shadow-xs rounded-sm hover:shadow-md"
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
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
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
            <>
              {/* Tap backdrop to close */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
                aria-hidden="true"
              />
              <motion.div
                id="mobile-nav-menu"
                role="navigation"
                aria-label="Mobile Navigation"
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mx-4 sm:mx-6 mt-2 p-5 rounded-md shadow-2xl md:hidden z-50 flex flex-col space-y-4"
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
                    className="text-xs font-semibold tracking-[0.25em] uppercase py-2.5 px-3 rounded hover:bg-black/5 transition-colors min-h-[44px] flex items-center"
                    style={{
                      color: activeSection === item.id ? 'var(--accent-color)' : 'var(--primary-text)',
                    }}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between px-3">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--secondary-text)]">
                    {isDark ? 'Dark Mode' : 'Light Mode'}
                  </span>
                  <button
                    onClick={toggleTheme}
                    className="px-3 py-1.5 rounded text-xs font-semibold uppercase flex items-center space-x-1.5 border border-[var(--border-subtle)] cursor-pointer"
                    style={{
                      backgroundColor: 'var(--button-secondary)',
                      color: 'var(--primary-text)',
                    }}
                  >
                    <span>{isDark ? '☀️ Light' : '🌙 Dark'}</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ================= 2. MAIN HERO LAYOUT ================= */}
      <div className="relative z-20 flex-1 w-full flex flex-col md:flex-row items-center justify-between">
        
        {/* ================= LEFT-SIDE CONTENT CONTAINER ================= */}
        <div className="w-full md:w-1/2 lg:w-[48%] xl:w-[46%] flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-8 sm:py-10 md:py-12 z-20">
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-xl flex flex-col justify-center my-auto"
          >
            {/* Massive Condensed Headline with 5 Combined Animation Techniques */}
            <div className="relative mb-2.5 sm:mb-3.5 select-none">
              <h1
                className="text-5xl sm:text-6xl md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] tracking-tight uppercase leading-[0.88]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {/* Line 1: AI & FULL STACK (Character-by-character reveal from below) */}
                <motion.span
                  variants={letterContainerVariants}
                  className="block leading-[0.9] mb-1 sm:mb-2 overflow-hidden"
                >
                  {["AI", "&", "FULL", "STACK"].map((word, wIdx) => (
                    <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.28em] overflow-hidden">
                      {word.split("").map((char, cIdx) => (
                        <motion.span
                          key={cIdx}
                          variants={letterVariants}
                          className="inline-block text-transparent bg-clip-text"
                          style={{
                            backgroundImage: 'linear-gradient(to bottom, var(--primary-text), var(--secondary-text))',
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </motion.span>

                {/* Line 2: ENGINEER (Vertical upward reveal + blur-to-sharp + slow traveling blue gradient) */}
                <motion.span
                  variants={engineerVariants}
                  className="block text-transparent bg-clip-text animate-gradient-travel select-none overflow-hidden"
                  style={{
                    backgroundImage: isDark
                      ? 'linear-gradient(90deg, #F4F7FB 0%, #668CFF 28%, #35D6BE 50%, #668CFF 72%, #F4F7FB 100%)'
                      : 'linear-gradient(90deg, #14213D 0%, #2563EB 28%, #0D9488 50%, #2563EB 72%, #14213D 100%)',
                    backgroundSize: '250% 100%',
                  }}
                >
                  ENGINEER
                </motion.span>
              </h1>
            </div>

            {/* Specialization Line: Horizontal slide-in from the left */}
            <motion.div variants={specializationVariants} className="mb-3 sm:mb-4">
              <p
                className="text-[10px] sm:text-[11px] md:text-xs font-bold tracking-[0.22em] sm:tracking-[0.26em] uppercase flex items-center flex-wrap gap-y-1"
                style={{ 
                  fontFamily: "'Montserrat', sans-serif",
                  color: 'var(--accent-text)',
                }}
              >
                <span>LLM &amp; AGENTS</span>
                <span className="opacity-40 mx-2">•</span>
                <span>CLOUD &amp; SYSTEM DESIGN</span>
              </p>
            </motion.div>

            {/* 3-Line Description */}
            <motion.div
              variants={fadeUpVariants}
              className="text-xs sm:text-[13px] md:text-sm font-normal leading-[1.65] tracking-wide max-w-lg mb-5 sm:mb-6 space-y-1"
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
              className="flex flex-wrap items-center gap-3.5 sm:gap-5"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {/* Explore My Work CTA */}
              <Magnetic strength={0.28}>
                <motion.a
                  href="#work"
                  data-cursor="magnetic"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center space-x-2.5 px-5 sm:px-6 py-3 text-[10.5px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 shadow-md rounded-sm overflow-hidden"
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
                  className="group relative inline-flex items-center space-x-2 px-5 sm:px-6 py-3 text-[10.5px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 shadow-xs rounded-sm hover:shadow-md"
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
            className="hidden lg:flex flex-col items-start absolute bottom-6 right-6 xl:bottom-9 xl:right-9 z-20 select-none p-4 sm:p-5 rounded-sm shadow-xl backdrop-blur-md transition-all duration-300"
            style={{
              backgroundColor: 'var(--card-background)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {/* 1. Quote Mark */}
            <span 
              className="text-2xl leading-none font-serif mb-1.5"
              style={{ color: 'var(--primary-text)' }}
            >
              “
            </span>

            {/* 2. Compact Two-Line Statement */}
            <div 
              className="text-[9.5px] sm:text-[10px] font-bold tracking-[0.24em] uppercase space-y-0.5 mb-2.5"
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
              className="w-24 h-[1.5px] mb-1.5"
              style={{
                background: 'linear-gradient(to right, var(--accent-color), transparent)',
              }}
            />

            {/* 4. Fine Monoline Calligraphy Signature */}
            <div 
              className="text-[2rem] font-normal leading-none -ml-0.5"
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
      <div className="h-4 sm:h-6 relative z-20 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
