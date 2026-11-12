import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import type { ProjectData } from './ProjectDoorsGallery';

interface CinematicDoorPortalProps {
  project: ProjectData;
  isSelected: boolean;
  onSelect: () => void;
}

export const CinematicDoorPortal: React.FC<CinematicDoorPortalProps> = ({
  project,
  isSelected,
  onSelect,
}) => {
  const portalRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ambientLightRef = useRef<HTMLDivElement>(null);
  const leftShadowRef = useRef<HTMLDivElement>(null);
  const rightShadowRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // Initialize GSAP 3D Door Rotation & Content Reveal Timeline
  useEffect(() => {
    if (
      !portalRef.current ||
      !leftPanelRef.current ||
      !rightPanelRef.current ||
      !contentRef.current ||
      !ambientLightRef.current ||
      !leftShadowRef.current ||
      !rightShadowRef.current
    ) {
      return;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: {
          duration: prefersReducedMotion ? 0.05 : 0.95,
          ease: 'power3.out',
        },
      });

      // 1. Left Door Leaf: Rotates outward to -84 degrees
      tl.to(
        leftPanelRef.current,
        {
          rotationY: -84,
          transformOrigin: 'left center',
          boxShadow: '-8px 12px 24px rgba(0, 0, 0, 0.75)',
        },
        0
      );

      // 2. Right Door Leaf: Rotates outward to +84 degrees
      tl.to(
        rightPanelRef.current,
        {
          rotationY: 84,
          transformOrigin: 'right center',
          boxShadow: '8px 12px 24px rgba(0, 0, 0, 0.75)',
        },
        0
      );

      // 3. Directional Shadows on the inner door frame
      tl.to(
        leftShadowRef.current,
        {
          opacity: 0.8,
          scaleX: 1,
        },
        0
      );

      tl.to(
        rightShadowRef.current,
        {
          opacity: 0.8,
          scaleX: 1,
        },
        0
      );

      // 4. Ambient Portal Glow from inside
      tl.to(
        ambientLightRef.current,
        {
          opacity: 0.75,
          scale: 1.25,
          duration: 0.85,
        },
        0.05
      );

      // 5. Interior Project Content: Clip-path & Opacity reveal
      tl.fromTo(
        contentRef.current,
        {
          opacity: 0,
          scale: 0.93,
          clipPath: 'polygon(12% 12%, 88% 12%, 88% 88%, 12% 88%)',
        },
        {
          opacity: 1,
          scale: 1,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.9,
          ease: 'power2.out',
        },
        0.1
      );

      timelineRef.current = tl;
    }, portalRef);

    return () => ctx.revert();
  }, []);

  // Sync timeline with hover, selection, and mobile tap states
  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;

    if (isHovered || isSelected || isOpenMobile) {
      tl.timeScale(1.0).play();
    } else {
      tl.timeScale(1.15).reverse();
    }
  }, [isHovered, isSelected, isOpenMobile]);

  // Handle portal click
  const handlePortalClick = (_e: React.MouseEvent) => {
    // On mobile / touch screens, toggle open state first
    if (window.innerWidth < 1024) {
      if (!isOpenMobile) {
        setIsOpenMobile(true);
        return;
      }
    }
    // If already open or on desktop, open the detailed view
    onSelect();
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  return (
    <div
      ref={portalRef}
      tabIndex={0}
      role="button"
      aria-label={`Open 3D Portal for ${project.title}`}
      className="relative flex flex-col items-center flex-shrink-0 select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-t-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsOpenMobile(false);
      }}
      onClick={handlePortalClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handlePortalClick(e as unknown as React.MouseEvent);
        }
      }}
      data-cursor="door"
    >
      {/* ================= 1. ARCHITECTURAL PORTAL CASING ================= */}
      <div
        className="relative p-2.5 sm:p-3 rounded-t-full transition-all duration-300 cursor-pointer shadow-2xl"
        style={{
          background: 'linear-gradient(180deg, #3D4452 0%, #262B37 45%, #151821 100%)',
          border: '1.5px solid rgba(255, 255, 255, 0.16)',
          boxShadow:
            isHovered || isSelected || isOpenMobile
              ? `0 28px 56px rgba(0,0,0,0.95), 0 0 25px ${project.doorColor.accent}33, inset 0 1px 2px rgba(255,255,255,0.3)`
              : '0 16px 36px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.18)',
        }}
      >
        {/* Arch Keystone Header */}
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-4 rounded-b-sm z-30 pointer-events-none flex items-center justify-center shadow-md"
          style={{
            background: 'linear-gradient(180deg, #565E70 0%, #2E3442 100%)',
            border: '1px solid rgba(255,255,255,0.22)',
            clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
          }}
        >
          <div className="w-2.5 h-[1px] bg-white/40" />
        </div>

        {/* Base Plinth Blocks (Left & Right) */}
        <div
          className="absolute -left-1.5 -bottom-0.5 w-4 sm:w-4.5 h-7 sm:h-8 rounded-xs z-30 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, #4A5162 0%, #282D3A 60%, #151821 100%)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.3)',
          }}
        />
        <div
          className="absolute -right-1.5 -bottom-0.5 w-4 sm:w-4.5 h-7 sm:h-8 rounded-xs z-30 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, #4A5162 0%, #282D3A 60%, #151821 100%)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.3)',
          }}
        />

        {/* ================= 2. 3D PERSPECTIVE STAGE ================= */}
        <div
          className="relative w-[190px] sm:w-[215px] md:w-[230px] lg:w-[250px] h-[390px] sm:h-[430px] md:h-[460px] lg:h-[485px] rounded-t-full overflow-hidden bg-[#07090E]"
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Ambient Light Burst */}
          <div
            ref={ambientLightRef}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full pointer-events-none blur-3xl opacity-0 z-0"
            style={{
              background: `radial-gradient(circle, ${project.doorColor.accent}88 0%, ${project.doorColor.base}44 50%, transparent 75%)`,
            }}
          />

          {/* Left Directional Cast Shadow */}
          <div
            ref={leftShadowRef}
            className="absolute top-0 left-0 bottom-0 w-8 z-10 pointer-events-none opacity-0"
            style={{
              background: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, transparent 100%)',
              transformOrigin: 'left center',
            }}
          />

          {/* Right Directional Cast Shadow */}
          <div
            ref={rightShadowRef}
            className="absolute top-0 right-0 bottom-0 w-8 z-10 pointer-events-none opacity-0"
            style={{
              background: 'linear-gradient(270deg, rgba(0,0,0,0.85) 0%, transparent 100%)',
              transformOrigin: 'right center',
            }}
          />

          {/* ================= 3. REVEALED PROJECT PREVIEW INTERIOR ================= */}
          <div
            ref={contentRef}
            className={`absolute inset-0 w-full h-full rounded-t-full overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 opacity-0 ${
              isHovered || isSelected || isOpenMobile ? 'z-25 pointer-events-auto' : 'z-0 pointer-events-none'
            }`}
            style={{
              background: 'linear-gradient(180deg, #0F141F 0%, #090C13 100%)',
            }}
          >
            {/* Top Bar: Door ID & Category */}
            <div className="pt-6 border-b border-white/10 pb-2 flex items-center justify-between">
              <span
                className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-xs"
                style={{
                  backgroundColor: `${project.doorColor.base}33`,
                  color: project.doorColor.accent,
                  border: `1px solid ${project.doorColor.base}77`,
                }}
              >
                PORTAL 0{project.number}
              </span>

              <span className="text-[8.5px] font-mono text-emerald-400 font-bold tracking-wider flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE</span>
              </span>
            </div>

            {/* Authentic Project Preview Card / Address Bar */}
            <div className="my-auto py-1 text-left space-y-2.5">
              {/* Mini Browser Mockup Header */}
              <div className="rounded-md border border-white/10 bg-[#06080D] p-2 space-y-1.5 shadow-inner">
                <div className="flex items-center justify-between border-b border-white/10 pb-1 text-[8px] font-mono text-neutral-400">
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-neutral-300 truncate max-w-[120px]">
                    {project.mockup.appName}
                  </span>
                  <span className="text-sky-400 text-[7px] uppercase font-bold">Verified</span>
                </div>

                <div className="text-[8px] font-mono text-sky-300 truncate font-semibold">
                  {project.mockup.screenTitle}
                </div>

                <div className="grid grid-cols-2 gap-1 text-[7.5px] font-mono text-neutral-400">
                  {project.metrics.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="bg-white/5 px-1.5 py-0.5 rounded-xs truncate">
                      <span className="text-white font-bold">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <span className="block text-[8px] font-mono tracking-wider uppercase font-semibold text-neutral-400 mb-0.5">
                  {project.category}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-tight font-sans">
                  {project.title}
                </h4>
                <p className="text-[9.5px] sm:text-[10px] text-neutral-300 line-clamp-3 mt-1 leading-relaxed font-sans">
                  {project.summary}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-1.5 py-0.5 text-[8px] font-mono rounded-xs bg-white/5 text-neutral-300 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* View Project Action Button */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={handleActionClick}
                className="w-full py-2 px-3 rounded-sm font-mono text-[9.5px] font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-center space-x-1.5 cursor-pointer shadow-md hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, ${project.doorColor.base} 0%, ${project.doorColor.dark} 100%)`,
                  color: '#FFFFFF',
                  border: `1px solid ${project.doorColor.accent}88`,
                }}
              >
                <span>VIEW PROJECT</span>
                <span className="text-xs">↗</span>
              </button>
            </div>
          </div>

          {/* ================= 4. LEFT 3D DOOR LEAF ================= */}
          <div
            ref={leftPanelRef}
            className="absolute top-0 left-0 bottom-0 w-1/2 rounded-tl-full z-20 overflow-hidden cursor-pointer"
            style={{
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
              background: `linear-gradient(180deg, ${project.doorColor.light} 0%, ${project.doorColor.base} 45%, ${project.doorColor.dark} 100%)`,
              boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.4), inset -2px 0 4px rgba(0,0,0,0.6)',
              borderRight: '1px solid rgba(0,0,0,0.6)',
            }}
          >
            {/* Left Brass Hinge Plates */}
            <div className="absolute left-0.5 top-16 w-1.5 h-6 bg-gradient-to-r from-[#D4AF37] to-[#AA820A] rounded-l-xs border-l border-y border-white/60 shadow-xs z-30 pointer-events-none">
              <div className="absolute top-1 left-0.5 w-0.5 h-0.5 rounded-full bg-[#5C4505]" />
              <div className="absolute bottom-1 left-0.5 w-0.5 h-0.5 rounded-full bg-[#5C4505]" />
            </div>
            <div className="absolute left-0.5 bottom-16 w-1.5 h-6 bg-gradient-to-r from-[#D4AF37] to-[#AA820A] rounded-l-xs border-l border-y border-white/60 shadow-xs z-30 pointer-events-none">
              <div className="absolute top-1 left-0.5 w-0.5 h-0.5 rounded-full bg-[#5C4505]" />
              <div className="absolute bottom-1 left-0.5 w-0.5 h-0.5 rounded-full bg-[#5C4505]" />
            </div>

            {/* Vertical Fluted Texture Lines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-25"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(0,0,0,0.3) 6px, rgba(0,0,0,0.3) 7.5px, rgba(255,255,255,0.15) 7.5px, rgba(255,255,255,0.15) 8.5px)',
              }}
            />

            {/* Arched Inner Molding */}
            <div
              className="absolute inset-2 rounded-tl-full pointer-events-none"
              style={{
                border: '1px solid rgba(0,0,0,0.4)',
                borderRight: 'none',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.4), 0 1px 1px rgba(255,255,255,0.2)',
              }}
            />

            {/* Left Brass Plaque (Roman / Door Number) */}
            <div className="absolute top-20 right-2 left-3 flex justify-center z-20">
              <div
                className="w-full max-w-[85px] h-6 rounded-xs flex items-center justify-center px-1 shadow-md"
                style={{
                  background:
                    'linear-gradient(135deg, #FFF7D2 0%, #E8C159 28%, #A87E18 55%, #FDECA4 82%, #C79523 100%)',
                  border: '1px solid #FFEAA0',
                  boxShadow:
                    '0 2px 4px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.9), inset 0 -1px 1px rgba(0,0,0,0.4)',
                }}
              >
                <span className="text-[7.5px] font-sans font-black tracking-widest uppercase text-[#382502] truncate">
                  DOOR 0{project.number}
                </span>
              </div>
            </div>

            {/* Left Brass Pull Ring (Center Meeting Stile) */}
            <div className="absolute right-2 top-[56%] -translate-y-1/2 flex items-center justify-center z-20 pointer-events-none">
              <div
                className="w-3.5 h-3.5 rounded-full shadow-md flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #FFF0B0, #DCA92E, #8C6207)',
                  border: '0.5px solid #FFF5D0',
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#382502]" />
              </div>
            </div>
          </div>

          {/* ================= 5. RIGHT 3D DOOR LEAF ================= */}
          <div
            ref={rightPanelRef}
            className="absolute top-0 right-0 bottom-0 w-1/2 rounded-tr-full z-20 overflow-hidden cursor-pointer"
            style={{
              transformOrigin: 'right center',
              transformStyle: 'preserve-3d',
              background: `linear-gradient(180deg, ${project.doorColor.light} 0%, ${project.doorColor.base} 45%, ${project.doorColor.dark} 100%)`,
              boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.4), inset 2px 0 4px rgba(0,0,0,0.6)',
              borderLeft: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {/* Right Brass Hinge Plates */}
            <div className="absolute right-0.5 top-16 w-1.5 h-6 bg-gradient-to-r from-[#AA820A] to-[#D4AF37] rounded-r-xs border-r border-y border-white/60 shadow-xs z-30 pointer-events-none">
              <div className="absolute top-1 right-0.5 w-0.5 h-0.5 rounded-full bg-[#5C4505]" />
              <div className="absolute bottom-1 right-0.5 w-0.5 h-0.5 rounded-full bg-[#5C4505]" />
            </div>
            <div className="absolute right-0.5 bottom-16 w-1.5 h-6 bg-gradient-to-r from-[#AA820A] to-[#D4AF37] rounded-r-xs border-r border-y border-white/60 shadow-xs z-30 pointer-events-none">
              <div className="absolute top-1 right-0.5 w-0.5 h-0.5 rounded-full bg-[#5C4505]" />
              <div className="absolute bottom-1 right-0.5 w-0.5 h-0.5 rounded-full bg-[#5C4505]" />
            </div>

            {/* Vertical Fluted Texture Lines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-25"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(0,0,0,0.3) 6px, rgba(0,0,0,0.3) 7.5px, rgba(255,255,255,0.15) 7.5px, rgba(255,255,255,0.15) 8.5px)',
              }}
            />

            {/* Arched Inner Molding */}
            <div
              className="absolute inset-2 rounded-tr-full pointer-events-none"
              style={{
                border: '1px solid rgba(0,0,0,0.4)',
                borderLeft: 'none',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.4), 0 1px 1px rgba(255,255,255,0.2)',
              }}
            />

            {/* Right Brass Plaque (Category / Badge) */}
            <div className="absolute top-20 left-2 right-3 flex justify-center z-20">
              <div
                className="w-full max-w-[85px] h-6 rounded-xs flex items-center justify-center px-1 shadow-md"
                style={{
                  background:
                    'linear-gradient(135deg, #FFF7D2 0%, #E8C159 28%, #A87E18 55%, #FDECA4 82%, #C79523 100%)',
                  border: '1px solid #FFEAA0',
                  boxShadow:
                    '0 2px 4px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.9), inset 0 -1px 1px rgba(0,0,0,0.4)',
                }}
              >
                <span className="text-[7.5px] font-sans font-black tracking-widest uppercase text-[#382502] truncate">
                  {project.plaque}
                </span>
              </div>
            </div>

            {/* Right Heavy Brass Lever Handle & Escutcheon */}
            <div className="absolute left-2 top-[56%] -translate-y-1/2 flex flex-col items-start z-20 pointer-events-none">
              {/* Rosette */}
              <div
                className="w-3.5 h-3.5 rounded-full shadow-md flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #FFF0B0, #DCA92E, #8C6207)',
                  border: '0.5px solid #FFF5D0',
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#382502]" />
              </div>

              {/* Lever Bar */}
              <div
                className="w-6 h-2 -mt-2.5 ml-2 rounded-r-full shadow-md"
                style={{
                  background:
                    'linear-gradient(180deg, #FFF9DA 0%, #E4B53E 35%, #9E6E0F 80%, #684603 100%)',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.7)',
                }}
              />

              {/* Keyhole Plate */}
              <div
                className="w-2 h-3 rounded-xs mt-1 shadow-xs flex flex-col items-center justify-center p-0.5"
                style={{
                  background: 'linear-gradient(135deg, #FFE89C, #C9961F, #825C07)',
                  border: '0.5px solid #FFF5D0',
                }}
              >
                <div className="w-0.5 h-0.5 rounded-full bg-[#201401]" />
                <div className="w-0.5 h-1 bg-[#201401] -mt-0.5" />
              </div>
            </div>
          </div>

          {/* Central Meeting Astragal Bead (Shadow Line when closed) */}
          <div
            className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] z-30 pointer-events-none transition-opacity duration-300 ${
              isHovered || isSelected || isOpenMobile ? 'opacity-0' : 'opacity-80'
            }`}
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)',
            }}
          />
        </div>
      </div>

      {/* Cast Floor Drop Shadow */}
      <div
        className="w-full max-w-[210px] h-2.5 mt-1.5 rounded-full blur-xs pointer-events-none transition-all duration-300"
        style={{
          background:
            isHovered || isSelected || isOpenMobile
              ? `radial-gradient(ellipse at center, ${project.doorColor.accent}44 0%, rgba(0,0,0,0.7) 60%, transparent 80%)`
              : 'rgba(0,0,0,0.6)',
          transform: isHovered || isSelected || isOpenMobile ? 'scale(1.15)' : 'scale(1)',
        }}
      />

      {/* Subtle Hover / Tap Hint Pill */}
      <div className="mt-2 text-center pointer-events-none">
        <span
          className="text-[9px] font-mono tracking-widest uppercase transition-colors duration-200"
          style={{
            color:
              isHovered || isSelected || isOpenMobile
                ? project.doorColor.accent
                : 'rgba(255, 255, 255, 0.4)',
          }}
        >
          {isSelected ? '● ACTIVE REALM' : isHovered || isOpenMobile ? 'OPENING...' : 'HOVER TO OPEN'}
        </span>
      </div>
    </div>
  );
};

export default CinematicDoorPortal;