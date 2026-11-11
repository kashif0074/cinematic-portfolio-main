import React, { useEffect, useState, useRef } from 'react';
import { animationConfig } from '../config/animationConfig';

type CursorMode = 'default' | 'pointer' | 'magnetic' | 'view' | 'door' | 'text';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [isTouch, setIsTouch] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Position references for smooth lerp physics
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Check touch and reduced motion
    const touchMedia = window.matchMedia('(pointer: coarse), (hover: none)');
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

    const checkPreferences = () => {
      setIsTouch(touchMedia.matches);
      setReducedMotion(motionMedia.matches);
    };

    checkPreferences();
    touchMedia.addEventListener('change', checkPreferences);
    motionMedia.addEventListener('change', checkPreferences);

    if (touchMedia.matches || motionMedia.matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      // Direct positioning for inner dot to avoid latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Spotlight glow tracks smoothly
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Detect hover target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'button, a, input, textarea, [data-cursor], .cursor-pointer, [role="button"]'
      ) as HTMLElement | null;

      if (interactive) {
        const customType = interactive.getAttribute('data-cursor');
        if (customType === 'door') {
          setCursorMode('door');
        } else if (customType === 'view') {
          setCursorMode('view');
        } else if (customType === 'magnetic' || interactive.tagName === 'BUTTON') {
          setCursorMode('magnetic');
        } else if (interactive.tagName === 'INPUT' || interactive.tagName === 'TEXTAREA') {
          setCursorMode('text');
        } else {
          setCursorMode('pointer');
        }
      } else {
        setCursorMode('default');
      }
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };
    const onMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    // High performance RAF loop with Lerp for outer ring
    let rafId: number;
    const lerpSpeed = animationConfig.cursor.smoothing;

    const render = () => {
      // Lerp calculation: ring = ring + (target - ring) * speed
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpSpeed;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpSpeed;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
      touchMedia.removeEventListener('change', checkPreferences);
      motionMedia.removeEventListener('change', checkPreferences);
    };
  }, []);

  // Don't render on mobile/tablet touch devices or if user prefers reduced motion
  if (isTouch || reducedMotion) return null;

  // Determine ring styling based on mode
  let ringSize = animationConfig.cursor.ringSize;
  let ringBg = 'transparent';
  let ringBorder = 'rgba(20, 33, 61, 0.45)';
  let dotScale = 1;
  let dotOpacity = 1;
  let labelText = '';

  if (cursorMode === 'pointer') {
    ringSize = 52;
    ringBg = 'rgba(20, 33, 61, 0.08)';
    ringBorder = 'rgba(20, 33, 61, 0.65)';
    dotScale = 0.5;
  } else if (cursorMode === 'magnetic') {
    ringSize = 62;
    ringBg = 'rgba(20, 33, 61, 0.12)';
    ringBorder = 'rgba(20, 33, 61, 0.8)';
    dotScale = 0.4;
  } else if (cursorMode === 'door' || cursorMode === 'view') {
    ringSize = 74;
    ringBg = 'rgba(244, 237, 224, 0.95)';
    ringBorder = 'rgba(244, 237, 224, 1)';
    dotOpacity = 0;
    labelText = cursorMode === 'door' ? 'OPEN' : 'VIEW';
  } else if (cursorMode === 'text') {
    ringSize = 24;
    ringBorder = 'rgba(20, 33, 61, 0.25)';
    dotScale = 0.6;
  }

  return (
    <>
      {/* 1. Subtle Ambient Spotlight Glow */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9997] transition-opacity duration-500 will-change-transform"
        style={{
          width: '450px',
          height: '450px',
          marginLeft: '-225px',
          marginTop: '-225px',
          opacity: isVisible ? 0.08 : 0,
          background:
            'radial-gradient(circle, rgba(20, 33, 61, 0.85) 0%, rgba(20, 33, 61, 0.15) 45%, transparent 70%)',
          borderRadius: '50%',
          mixBlendMode: 'multiply',
        }}
      />

      {/* 2. Outer Follower Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full will-change-transform flex items-center justify-center transition-[width,height,background-color,border-color] duration-300 ease-out select-none"
        style={{
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          marginLeft: `-${ringSize / 2}px`,
          marginTop: `-${ringSize / 2}px`,
          opacity: isVisible ? 1 : 0,
          backgroundColor: ringBg,
          border: `1.5px solid ${ringBorder}`,
          backdropFilter: cursorMode === 'door' || cursorMode === 'view' ? 'blur(4px)' : 'none',
        }}
      >
        {labelText && (
          <span
            ref={labelRef}
            className="text-[9px] font-bold tracking-[0.2em] uppercase select-none text-[#14213D] animate-fade-in"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {labelText}
          </span>
        )}
      </div>

      {/* 3. Inner Precision Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full will-change-transform select-none transition-transform duration-150 ease-out"
        style={{
          width: `${animationConfig.cursor.dotSize}px`,
          height: `${animationConfig.cursor.dotSize}px`,
          marginLeft: `-${animationConfig.cursor.dotSize / 2}px`,
          marginTop: `-${animationConfig.cursor.dotSize / 2}px`,
          opacity: isVisible ? dotOpacity : 0,
          transform: `scale(${dotScale})`,
          backgroundColor: '#14213D',
          boxShadow: '0 0 6px rgba(20, 33, 61, 0.4)',
        }}
      />
    </>
  );
};
