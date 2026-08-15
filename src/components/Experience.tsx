import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, ChevronDown, ChevronUp, MapPin, Calendar, CheckCircle2, Building, Sparkles } from 'lucide-react';
import resumeData from '../data/resume.json';

const roleTechStack: Record<number, string[]> = {
  0: ['dbt Core', 'Snowflake (Iceberg)', 'GKE (Kubernetes Engine)', 'BigQuery', 'Cloud Composer', 'CDC Striim'],
  1: ['Striim CDC', 'Google BigQuery', 'Cloud Dataflow', 'Cloud Composer', 'SQL Optimization', 'GCP'],
  2: ['Python', 'Unix Shell', 'Dataflow Pipelines', 'Cloud Composer', 'BigQuery', 'Batch ETL']
};

export const Experience: React.FC = React.memo(() => {
  const { experience } = resumeData;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-6 py-24 z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center"
      >
        <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-sky-300/60 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 px-4 py-1.5 text-xs sm:text-sm font-mono uppercase tracking-wider theme-accent font-semibold">
          <Briefcase className="h-4 w-4" /> Career Journey
        </span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight theme-text-primary sm:text-5xl">
          Professional Experience
        </h2>
        <p className="mx-auto mt-4 max-w-2xl theme-text-secondary text-base sm:text-lg font-normal">
          5+ continuous years at Bitwise Solutions delivering enterprise data pipelines, dbt modeling, and cloud infrastructure optimizations.
        </p>
        <div className="mx-auto mt-6 h-1 w-20 rounded-full" style={{ backgroundColor: 'var(--accent-color)' }} />
      </motion.div>

      <div className="relative border-l-2 border-sky-300 dark:border-sky-500/30 pl-6 sm:pl-8 ml-2 sm:ml-4">
        {experience.map((exp, index) => {
          const techStack = roleTechStack[index] || [];
          const isExpanded = expandedIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-12 last:mb-0 relative"
            >
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-6 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-slate-900 border-2 border-sky-500 shadow-md">
                <div className="h-3 w-3 rounded-full bg-sky-500" />
              </div>

              <div 
                className={`group cursor-pointer rounded-3xl border transition-all duration-300 backdrop-blur-xl p-6 sm:p-8 shadow-sm ${
                  isExpanded
                    ? 'border-sky-400 dark:border-sky-500/40 theme-card shadow-lg ring-1 ring-sky-400/20'
                    : 'theme-card theme-card-hover'
                }`}
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 theme-accent" />
                      <span className="text-sm font-mono font-bold uppercase tracking-wider theme-accent">
                        {exp.company}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold theme-text-primary mt-1">{exp.role}</h3>
                    
                    <div className="mt-2.5 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-mono theme-text-secondary">
                      <span className="flex items-center gap-1.5 font-medium">
                        <MapPin className="h-3.5 w-3.5 theme-accent" />
                        {exp.location}
                      </span>
                      <span className="hidden sm:inline opacity-40">•</span>
                      <span className="flex items-center gap-1.5 font-semibold theme-text-primary">
                        <Calendar className="h-3.5 w-3.5 theme-accent" />
                        {exp.dates}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-3">
                    <button className="flex items-center gap-2 rounded-full border theme-card px-4 py-2 text-xs sm:text-sm font-mono font-semibold theme-text-primary transition-colors">
                      <span>{isExpanded ? 'Hide Details' : 'Expand Details'}</span>
                      {isExpanded ? <ChevronUp className="h-4 w-4 theme-accent" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t theme-border">
                  {techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-xl border border-sky-200 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-500/10 px-3 py-1.5 text-xs sm:text-sm font-mono font-medium theme-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-6 space-y-4 border-t theme-border pt-6">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-3.5 text-sm sm:text-base leading-relaxed font-normal">
                            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-sky-500" />
                            <span className="theme-text-primary">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
});
