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
import { ThemeProvider } from './context/ThemeContext';
import { ThemePullCord } from './components/ThemePullCord';

function App() {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <div
          className="w-full min-h-screen antialiased selection:bg-[#668CFF] selection:text-[#080B12]"
          style={{
            backgroundColor: 'var(--primary-background)',
            color: 'var(--primary-text)',
          }}
        >
          <ThemePullCord />
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
    </ThemeProvider>
  );
}

export default App;
