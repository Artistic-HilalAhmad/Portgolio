import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Workflow, 
  Briefcase, 
  Trophy, 
  Terminal, 
  GraduationCap, 
  Mail, 
  Download, 
  Menu, 
  X, 
  Sparkles,
  Layers
} from 'lucide-react';
import { ThemeSelector } from './ThemeSelector';
import resumeData from '../data/resume.json';

interface NavItem {
  id: string;
  label: string;
  icon: React.FC<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'architecture', label: 'Architecture', icon: Workflow },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'achievements', label: 'Impact', icon: Trophy },
  { id: 'skills', label: 'Skills', icon: Terminal },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export const FloatingNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const sections = navItems.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-25% 0px -40% 0px',
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
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.div 
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 rounded-full border px-3.5 sm:px-5 py-2.5 transition-all duration-300 backdrop-blur-2xl shadow-lg ${
          scrolled 
            ? 'bg-white/85 dark:bg-slate-950/85 border-sky-300/60 dark:border-slate-700/80 shadow-sky-500/5 ring-1 ring-black/5 dark:ring-white/5' 
            : 'bg-white/70 dark:bg-slate-950/70 border-sky-200/50 dark:border-slate-800/60 shadow-xs'
        }`}
      >
        {/* Monogram Badge */}
        <a 
          href="#hero"
          className="flex items-center gap-2 font-mono font-black text-xs uppercase tracking-wider theme-text-primary group"
        >
          <div 
            className="flex h-8 w-8 items-center justify-center rounded-full text-white font-extrabold text-[11px] shadow-sm transition-transform group-hover:scale-105"
            style={{ backgroundColor: 'var(--accent-color)' }}
          >
            HA
          </div>
          <span className="hidden lg:inline font-bold tracking-tight text-sm">
            Hilal Ahmad
          </span>
        </a>

        {/* Desktop Navigation Pill List */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-1 text-xs font-mono">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;

              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold transition-all duration-200 ${
                      isActive
                        ? 'text-sky-600 dark:text-sky-300'
                        : 'theme-text-secondary hover:theme-text-primary'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.label}</span>
                  </a>

                  {/* Animated Active Pill Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 z-0 rounded-full bg-sky-100/90 dark:bg-sky-500/20 border border-sky-300/80 dark:border-sky-500/40 shadow-xs"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <ThemeSelector />

          <a
            href="/Hilal_Ahmad_Najar_Resume.pdf"
            download="Hilal_Ahmad_Najar_Resume.pdf"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-sky-500 hover:bg-sky-600 active:scale-95 text-white px-3.5 py-1.5 text-xs font-mono font-bold transition-all shadow-xs cursor-pointer"
          >
            <Download className="h-3 w-3" />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-full border theme-card p-1.5 theme-text-primary"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="pointer-events-auto absolute top-16 left-4 right-4 max-w-sm mx-auto rounded-3xl border theme-card bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl p-4 shadow-2xl z-50 md:hidden"
          >
            <div className="flex flex-col gap-1 font-mono text-xs">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                const Icon = item.icon;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-bold transition-all ${
                      isActive 
                        ? 'bg-sky-500 text-white shadow-xs' 
                        : 'theme-text-secondary hover:theme-text-primary hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
              <div className="mt-2 pt-2 border-t theme-border">
                <a
                  href="/Hilal_Ahmad_Najar_Resume.pdf"
                  download="Hilal_Ahmad_Najar_Resume.pdf"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl font-bold text-white text-xs shadow-xs bg-sky-500 hover:bg-sky-600 transition-all"
                >
                  <Download className="h-3.5 w-3.5" /> Download Resume PDF
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
