import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award } from 'lucide-react';
import resumeData from '../data/resume.json';

export const EducationAndAwards: React.FC = () => {
  const { education, awards } = resumeData;

  return (
    <section id="education" className="relative mx-auto max-w-5xl px-6 py-24">
      <div className="grid gap-16 md:grid-cols-2">
        
        {/* Education */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <h2 className="text-3xl font-bold text-white">Education</h2>
            </div>
          </motion.div>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-blue-500"
              >
                <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                <p className="mt-1 text-slate-300">{edu.institution}</p>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                  <span className="rounded-full bg-white/5 px-3 py-1">{edu.dates}</span>
                  <span className="font-medium text-blue-400">{edu.details}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-amber-400" />
              <h2 className="text-3xl font-bold text-white">Awards</h2>
            </div>
          </motion.div>

          <div className="space-y-8">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <h3 className="text-lg font-semibold text-white">{award.title}</h3>
                <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                  <span>{award.issuer}</span>
                  <span>•</span>
                  <span>{award.date}</span>
                </div>
                <p className="mt-3 text-slate-300">{award.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
