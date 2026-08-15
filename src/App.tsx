import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeSelector } from './components/ThemeSelector';
import { AnimatedBackground } from './components/AnimatedBackground';
import { CursorGlow } from './components/CursorGlow';
import { Splash } from './components/Splash';
import { Hero } from './components/Hero';
import { PipelineVisualizer } from './components/PipelineVisualizer';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Skills } from './components/Skills';
import { EducationAndAwards } from './components/EducationAndAwards';
import { ContactSection } from './components/ContactSection';
import resumeData from './data/resume.json';
import { Linkedin, Mail, Menu, X, Download, Cloud, Activity, Sparkles, ArrowUp } from 'lucide-react';

function PortfolioApp() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
      return;
    }
    
    document.body.style.overflow = 'auto';

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const sections = ['hero', 'architecture', 'experience', 'achievements', 'skills', 'education', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0.1,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [showSplash]);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'experience', label: 'Experience' },
    { id: 'achievements', label: 'Impact' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

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

      {/* Floating Header Bar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 py-3 sm:py-3.5 ${
          scrolled 
            ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-sky-200/80 dark:border-slate-800 shadow-sm' 
            : 'bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-b border-sky-100 dark:border-slate-800/60'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <motion.a 
            href="#hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-3 font-mono text-sm sm:text-base tracking-wider theme-text-primary uppercase font-extrabold group"
          >
            <div 
              className="flex h-9 w-9 items-center justify-center rounded-xl text-white font-black text-xs shadow-sm group-hover:scale-105 transition-transform" 
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              HA
            </div>
            <div className="flex flex-col">
              <span className="leading-tight">{resumeData.basics.name}</span>
              <span className="text-[10px] theme-accent font-semibold tracking-normal normal-case">Cloud Data Engineer</span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase theme-text-secondary bg-sky-50/70 dark:bg-slate-900/60 p-1.5 rounded-2xl border border-sky-200/60 dark:border-slate-800">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.li 
                    key={item.id}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.05, duration: 0.3 }}
                  >
                    <a
                      href={`#${item.id}`}
                      className={`transition-all duration-200 px-3.5 py-1.5 rounded-xl font-bold block ${
                        isActive 
                          ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-xs border border-sky-200 dark:border-slate-700' 
                          : 'hover:theme-text-primary hover:bg-white/50 dark:hover:bg-slate-800/50 theme-text-secondary'
                      }`}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            <ThemeSelector />

            <a
              href="/Hilal_Ahmad_Najar_Resume.pdf"
              download="Hilal_Ahmad_Najar_Resume.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border theme-card theme-card-hover px-3.5 py-2 text-xs font-mono font-bold theme-text-primary transition-all shadow-xs cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 theme-accent" /> Resume
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-xl border theme-card p-2 theme-text-primary"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t theme-border bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-6 py-4 mt-3 rounded-2xl shadow-xl"
            >
              <ul className="flex flex-col gap-1 font-mono text-xs uppercase">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-2.5 rounded-xl font-bold ${
                        activeSection === item.id 
                          ? 'bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800' 
                          : 'theme-text-secondary hover:bg-slate-100 dark:hover:bg-slate-900'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li className="mt-2 pt-2 border-t theme-border">
                  <a
                    href="/Hilal_Ahmad_Najar_Resume.pdf"
                    download="Hilal_Ahmad_Najar_Resume.pdf"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white text-center text-xs shadow-sm"
                    style={{ backgroundColor: 'var(--accent-color)' }}
                  >
                    <Download className="h-4 w-4" /> Download Resume PDF
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10 pt-16">
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
              href={resumeData.basics.links[0]?.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="rounded-xl border theme-card theme-card-hover p-2.5 theme-text-primary transition-all hover:scale-105 shadow-xs"
              title="LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4 text-sky-600" />
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
