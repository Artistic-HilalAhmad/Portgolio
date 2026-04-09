import React from 'react';
import { motion } from 'motion/react';
import resumeData from '../data/resume.json';

export const Skills: React.FC = () => {
  const { skills } = resumeData;

  return (
    <section id="skills" className="relative mx-auto max-w-5xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl font-light tracking-tight text-slate-900 sm:text-4xl">Technical Arsenal</h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-sky-400" />
      </motion.div>

      <div className="grid gap-8 md:grid-cols-3">
        {skills.map((skillGroup, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="mb-6 text-xl font-medium text-slate-800">{skillGroup.group}</h3>
            <div className="flex flex-wrap gap-3">
              {skillGroup.skills.map((skill, i) => (
                <span
                  key={i}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 transition-colors hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
