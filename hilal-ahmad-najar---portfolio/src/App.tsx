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
    <div className="min-h-screen bg-white text-slate-900 selection:bg-sky-200">
      <AnimatePresence>
        {showSplash && <Splash onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <AnimatedBackground />

      {/* Header / Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-sky-100 bg-sky-50/90 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="text-xl font-medium tracking-tight text-slate-800">
            {resumeData.basics.name}
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8 text-sm font-medium">
              {['hero', 'experience', 'achievements', 'skills', 'education'].map((section) => (
                <li key={section}>
                  <a
                    href={`#${section}`}
                    className={`capitalize transition-colors hover:text-sky-600 ${
                      activeSection === section ? 'text-sky-600' : 'text-slate-500'
                    }`}
                  >
                    {section === 'hero' ? 'Home' : section}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="relative z-10 pt-20">
        <Hero />
        <Experience />
        <Achievements />
        <Skills />
        <EducationAndAwards />
      </main>

      {/* Trailer / Footer */}
      <footer className="relative z-10 bg-slate-800 py-12 text-slate-300">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
          <p className="text-sm">
            © {new Date().getFullYear()} {resumeData.basics.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href={resumeData.basics.links[0].url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href={`mailto:${resumeData.basics.email}`} className="hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
