import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Splash } from './components/Splash';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Skills } from './components/Skills';
import { EducationAndAwards } from './components/EducationAndAwards';
import resumeData from './data/resume.json';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'experience', 'achievements', 'skills', 'education'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30">
      <AnimatePresence>
        {showSplash && <Splash onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <AnimatedBackground />

      {/* Navigation / Scroll Spy */}
      <nav className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/10 bg-slate-950/80 px-6 py-3 backdrop-blur-md sm:bottom-auto sm:top-6">
        <ul className="flex items-center gap-6 text-sm font-medium">
          {['hero', 'experience', 'achievements', 'skills', 'education'].map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                className={`capitalize transition-colors hover:text-white ${
                  activeSection === section ? 'text-white' : 'text-slate-400'
                }`}
              >
                {section === 'hero' ? 'Home' : section}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="relative z-10">
        <Hero />
        <Experience />
        <Achievements />
        <Skills />
        <EducationAndAwards />
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-slate-950/50 py-12 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} {resumeData.basics.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href={resumeData.basics.links[0].url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href={`mailto:${resumeData.basics.email}`} className="text-slate-400 hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
