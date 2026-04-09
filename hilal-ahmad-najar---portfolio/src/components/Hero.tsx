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
    <section id="hero" className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 text-center">
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
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm text-sky-800 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
          </span>
          Available for new opportunities
        </motion.div>

        <h1 className="mb-6 text-4xl font-light tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
          Building robust <span className="font-semibold text-sky-600">Data Pipelines</span> & Cloud Solutions
        </h1>
        
        <h2 className="mb-8 text-xl font-medium text-slate-500 sm:text-2xl">
          {basics.title}
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
          {basics.summary}
        </p>

        <div className="mb-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-sky-500" />
            {basics.location}
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-sky-500" />
            <a href={`mailto:${basics.email}`} className="hover:text-sky-600 transition-colors">{basics.email}</a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-sky-500" />
            <a href={`tel:${basics.phone}`} className="hover:text-sky-600 transition-colors">{basics.phone}</a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={handleScrollToExperience}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-sky-600 px-8 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-sky-700 hover:shadow-lg hover:-translate-y-0.5"
          >
            View Experience
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          </button>
          
          <button
            onClick={() => window.print()}
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5"
          >
            Download Resume
            <Download className="h-4 w-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};
