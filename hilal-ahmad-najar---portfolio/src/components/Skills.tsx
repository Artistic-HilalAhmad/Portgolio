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
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Technical Arsenal</h2>
        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-400" />
      </motion.div>

      <div className="grid gap-8 md:grid-cols-3">
        {skills.map((skillGroup, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
          >
            <h3 className="mb-6 text-xl font-semibold text-white">{skillGroup.group}</h3>
            <div className="flex flex-wrap gap-3">
              {skillGroup.skills.map((skill, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-white"
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
