import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, ChevronDown, ChevronUp } from 'lucide-react';
import resumeData from '../data/resume.json';

export const Experience: React.FC = () => {
  const { experience } = resumeData;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Experience</h2>
        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
      </motion.div>

      <div className="relative border-l border-white/10 pl-6 sm:pl-8">
        {experience.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-12 last:mb-0"
          >
            <div className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 ring-4 ring-slate-950">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
            </div>

            <div 
              className="group cursor-pointer rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/10"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                  <div className="mt-1 flex items-center gap-2 text-slate-400">
                    <Briefcase className="h-4 w-4" />
                    <span>{exp.company}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="text-sm">{exp.location}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-2">
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400">
                    {exp.dates}
                  </span>
                  <button className="text-slate-400 transition-colors group-hover:text-white">
                    {expandedIndex === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-6 space-y-3 text-slate-300">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
