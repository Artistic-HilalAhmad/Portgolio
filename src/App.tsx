import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { AnimatedBackground } from './components/AnimatedBackground';
import { CursorGlow } from './components/CursorGlow';
import { Splash } from './components/Splash';
import { FloatingNav } from './components/FloatingNav';
import { Hero } from './components/Hero';
import { PipelineVisualizer } from './components/PipelineVisualizer';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Skills } from './components/Skills';
import { EducationAndAwards } from './components/EducationAndAwards';
import { ContactSection } from './components/ContactSection';
import resumeData from './data/resume.json';
import { Linkedin, Mail, ArrowUp } from 'lucide-react';

const XIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

function PortfolioApp() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.overflow = 'auto';
  }, [showSplash]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen theme-bg theme-text-primary selection:bg-sky-500/20 selection:text-sky-900 overflow-x-hidden font-sans transition-colors duration-300">
      <CursorGlow />
      <AnimatePresence>
        {showSplash && <Splash onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <AnimatedBackground />

      {/* Modern Floating Island Navigation */}
      <FloatingNav />

      <main className="relative z-10">
        <Hero />
        <PipelineVisualizer />
        <Experience />
        <Achievements />
        <Skills />
        <EducationAndAwards />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-sky-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 py-12 theme-text-secondary transition-colors duration-300 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 font-mono text-xs sm:text-sm">
            <span className="font-extrabold theme-text-primary tracking-wide">{resumeData.basics.name}</span>
            <span className="hidden sm:inline opacity-40">•</span>
            <span className="theme-accent font-semibold">Senior Cloud Data Engineer</span>
            <span className="hidden sm:inline opacity-40">•</span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <a 
              href={resumeData.basics.links.find(l => l.name === 'LinkedIn')?.url || 'https://linkedin.com'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="rounded-xl border theme-card theme-card-hover p-2.5 theme-text-primary transition-all hover:scale-105 shadow-xs"
              title="LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4 text-sky-600" />
            </a>
            <a 
              href={resumeData.basics.links.find(l => l.name === 'X')?.url || 'https://x.com/Thehilalahmad'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="rounded-xl border theme-card theme-card-hover p-2.5 theme-text-primary transition-all hover:scale-105 shadow-xs"
              title="X (Twitter) Profile"
            >
              <XIcon className="h-4 w-4" />
            </a>
            <a 
              href={`mailto:${resumeData.basics.email}`} 
              className="rounded-xl border theme-card theme-card-hover p-2.5 theme-text-primary transition-all hover:scale-105 shadow-xs"
              title="Send Email"
            >
              <Mail className="h-4 w-4 theme-accent" />
            </a>
            <button
              onClick={scrollToTop}
              className="rounded-xl border theme-card theme-card-hover p-2.5 theme-text-primary transition-all hover:scale-105 shadow-xs cursor-pointer"
              title="Scroll to Top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
