import React from 'react';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { CustomCursor } from './components/CustomCursor';
import { SmoothScroll } from './components/SmoothScroll';
import { Chatbot } from './components/Chatbot';

function App() {
  return (
    <SmoothScroll>
      <div
        className="w-full min-h-screen antialiased selection:bg-[#14213D] selection:text-[#F4EDE0]"
        style={{
          backgroundColor: 'var(--primary-background)',
          color: 'var(--primary-text)',
        }}
      >
        <CustomCursor />
        <Chatbot />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    </SmoothScroll>
  );
}

export default App;
