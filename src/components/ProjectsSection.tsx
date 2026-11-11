import React from 'react';
import { motion } from 'framer-motion';
import { ProjectDoorsGallery } from './ProjectDoorsGallery';
import { animationConfig } from '../config/animationConfig';

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="work"
      className="relative w-full font-sans pt-16 pb-24 sm:pt-20 sm:pb-28 px-4 sm:px-8 lg:px-16 overflow-hidden"
      style={{
        backgroundColor: '#11131A',
        color: '#FFFFFF',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Subtle Studio Ambient Glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[44rem] h-[24rem] rounded-full blur-[180px] pointer-events-none opacity-20 animate-ambient-pulse"
        style={{ backgroundColor: '#38BDF8' }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Heading: Exactly as in Reference Video (Frame 00:05) with Smooth Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: animationConfig.durations.slow, ease: animationConfig.easings.luxury }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="text-[11px] font-mono tracking-[0.35em] text-sky-400 uppercase font-semibold block mb-2">
            FEATURED ARCHITECTURES
          </span>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white select-none"
          >
            Magic happens behind the doors
          </h2>
        </motion.div>

        {/* 4 Interactive Arched Doors Gallery */}
        <ProjectDoorsGallery />

      </div>
    </section>
  );
};

export default ProjectsSection;
