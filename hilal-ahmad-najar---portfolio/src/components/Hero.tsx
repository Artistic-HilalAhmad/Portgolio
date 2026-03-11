import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Download, Mail, MapPin, Phone } from 'lucide-react';
import resumeData from '../data/resume.json';

export const Hero: React.FC = () => {
  const { basics } = resumeData;

  const handleScrollToExperience = () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          Available for new opportunities
        </motion.div>

        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl">
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
            {basics.name}
          </span>
        </h1>
        
        <h2 className="mb-8 text-2xl font-medium text-blue-400 sm:text-3xl">
          {basics.title}
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
          {basics.summary}
        </p>

        <div className="mb-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {basics.location}
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <a href={`mailto:${basics.email}`} className="hover:text-white transition-colors">{basics.email}</a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <a href={`tel:${basics.phone}`} className="hover:text-white transition-colors">{basics.phone}</a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={handleScrollToExperience}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-slate-200 hover:scale-105"
          >
            View Experience
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          </button>
          
          <button
            onClick={() => window.print()}
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105"
          >
            Download Resume
            <Download className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};
