import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const ThemePullCord: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isPulling, setIsPulling] = useState(false);
  const [showLightBurst, setShowLightBurst] = useState(false);

  // Synthesize a realistic mechanical ceiling fan / lamp pull-cord click using Web Audio API
  const playClickSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Sharp mechanical pull snap
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(isDark ? 920 : 1150, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.045);
      gain1.gain.setValueAtTime(0.25, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.05);

      // Warm resonance click
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(isDark ? 280 : 340, ctx.currentTime + 0.02);
      osc2.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.08);
      gain2.gain.setValueAtTime(0.18, ctx.currentTime + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.02);
      osc2.stop(ctx.currentTime + 0.09);
    } catch {
      // Audio autoplay restrictions or unsupported
    }
  };

  const handlePull = () => {
    if (isPulling) return;
    setIsPulling(true);
    playClickSound();

    // Trigger visual light pulse
    setShowLightBurst(true);
    setTimeout(() => setShowLightBurst(false), 500);

    // Switch theme at maximum pull extension
    setTimeout(() => {
      toggleTheme();
    }, 120);

    // Release pull cord with spring snapback
    setTimeout(() => {
      setIsPulling(false);
    }, 280);
  };

  return (
    <div className="fixed top-0 right-5 sm:right-10 lg:right-16 z-50 pointer-events-auto select-none flex flex-col items-center">
      
      {/* ================= 1. AMBIENT LIGHT BURST ON PULL ================= */}
      <AnimatePresence>
        {showLightBurst && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: isDark ? 0.45 : 0.25, scale: 1.4 }}
            exit={{ opacity: 0, scale: 1.8 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="absolute -top-12 -left-16 w-36 h-36 rounded-full pointer-events-none blur-2xl"
            style={{
              backgroundColor: isDark ? '#668CFF' : '#FDE047',
            }}
          />
        )}
      </AnimatePresence>

      {/* ================= 2. CEILING MOUNT BRACKET ================= */}
      <div 
        className="w-4 h-2 rounded-b-xs shadow-md z-30"
        style={{
          background: isDark 
            ? 'linear-gradient(180deg, #475569 0%, #1E293B 100%)' 
            : 'linear-gradient(180deg, #B45309 0%, #78350F 100%)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
        }}
      />

      {/* ================= 3. ANIMATED PULL CORD & FOB ================= */}
      <motion.div
        animate={{
          y: isPulling ? 32 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 550,
          damping: 14,
          mass: 0.7,
        }}
        onClick={handlePull}
        data-cursor="magnetic"
        className="flex flex-col items-center cursor-pointer group"
      >
        {/* Cord / String (Taut Beaded Line) */}
        <motion.div
          animate={{
            height: isPulling ? 130 : 96,
          }}
          transition={{
            type: 'spring',
            stiffness: 550,
            damping: 14,
            mass: 0.7,
          }}
          className="w-[1.75px] transition-colors duration-300 relative"
          style={{
            background: isDark
              ? 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(200,215,245,0.9) 70%, rgba(102,140,255,1) 100%)'
              : 'linear-gradient(180deg, rgba(20,33,61,0.5) 0%, rgba(180,83,9,0.85) 70%, rgba(146,64,14,1) 100%)',
            boxShadow: isDark 
              ? '0 0 6px rgba(102,140,255,0.4)' 
              : '0 0 4px rgba(0,0,0,0.2)',
          }}
        />

        {/* Small Connector Ring */}
        <div 
          className="w-2 h-2 rounded-full -my-0.5 z-20 transition-transform duration-200 group-hover:scale-110"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, #94A3B8 0%, #475569 100%)'
              : 'linear-gradient(135deg, #FDE68A 0%, #B45309 100%)',
            border: isDark ? '1px solid #CBD5E1' : '1px solid #78350F',
          }}
        />

        {/* ================= 4. ORNAMENTAL DROP FOB (ACORN FINIAL) ================= */}
        <motion.div
          whileHover={{
            scale: 1.12,
            rotate: [0, -3, 3, -1, 0],
            transition: { duration: 0.4 },
          }}
          whileTap={{ scale: 0.95 }}
          className="relative flex flex-col items-center pt-0.5"
          title={isDark ? 'Pull for Light Mode' : 'Pull for Dark Mode'}
        >
          {/* Main Metallic Teardrop / Acorn Pendant */}
          <div
            className="w-4 sm:w-4.5 h-8 sm:h-9 rounded-b-full shadow-lg transition-all duration-300 relative overflow-hidden"
            style={{
              background: isDark
                ? 'linear-gradient(135deg, #93C5FD 0%, #3B82F6 40%, #1E3A8A 100%)'
                : 'linear-gradient(135deg, #FDE047 0%, #D97706 45%, #78350F 100%)',
              border: isDark
                ? '1px solid rgba(255,255,255,0.45)'
                : '1px solid rgba(255,255,255,0.6)',
              boxShadow: isDark
                ? '0 6px 14px rgba(0,0,0,0.7), inset 0 2px 2px rgba(255,255,255,0.6), 0 0 10px rgba(102,140,255,0.3)'
                : '0 6px 14px rgba(0,0,0,0.25), inset 0 2px 2px rgba(255,255,255,0.7), 0 0 8px rgba(245,158,11,0.25)',
              clipPath: 'polygon(20% 0%, 80% 0%, 100% 35%, 85% 75%, 50% 100%, 15% 75%, 0% 35%)',
            }}
          >
            {/* Fine Metallic Specular Reflection */}
            <div className="absolute top-1 left-0.5 w-1 h-4 bg-white/60 rounded-full blur-[0.5px] pointer-events-none transform -rotate-12" />
          </div>

          {/* Minimal Hover Pull Pill Indicator */}
          <div
            className="absolute top-full mt-2 hidden sm:flex items-center space-x-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md"
            style={{
              backgroundColor: isDark ? 'rgba(18,29,43,0.92)' : 'rgba(255,255,255,0.92)',
              color: isDark ? '#668CFF' : '#B45309',
              border: isDark ? '1px solid #26364A' : '1px solid #D8D8D8',
            }}
          >
            <span>{isDark ? '☀️ LIGHT' : '🌙 DARK'}</span>
            <span className="text-[10px]">↓</span>
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
};

export default ThemePullCord;
