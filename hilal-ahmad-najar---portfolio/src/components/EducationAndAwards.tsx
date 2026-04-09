import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, BadgeCheck } from 'lucide-react';
import resumeData from '../data/resume.json';

export const EducationAndAwards: React.FC = () => {
  const { education, awards, certifications } = resumeData;

  return (
    <section id="education" className="relative mx-auto max-w-5xl px-6 py-24">
      <div className="grid gap-16 md:grid-cols-2">
        
        {/* Left Column: Education & Certifications */}
        <div className="space-y-16">
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
                <GraduationCap className="h-8 w-8 text-sky-500" />
                <h2 className="text-3xl font-light tracking-tight text-slate-900">Education</h2>
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
                  className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-sky-400"
                >
                  <h3 className="text-xl font-medium text-slate-900">{edu.degree}</h3>
                  <p className="mt-1 text-slate-600">{edu.institution}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">{edu.dates}</span>
                    <span className="font-medium text-sky-600">{edu.details}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-10"
              >
                <div className="flex items-center gap-3">
                  <BadgeCheck className="h-8 w-8 text-sky-500" />
                  <h2 className="text-3xl font-light tracking-tight text-slate-900">Certifications</h2>
                </div>
              </motion.div>

              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-sky-200 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-500">
                      <BadgeCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-slate-900">{cert.title}</h3>
                      {cert.issuer && <p className="text-sm text-slate-500">{cert.issuer}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Honors & Awards */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-sky-500" />
              <h2 className="text-3xl font-light tracking-tight text-slate-900">Honors-Awards</h2>
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
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-sky-200 hover:shadow-md"
              >
                <h3 className="text-lg font-medium text-slate-900">{award.title}</h3>
                {(award.issuer || award.date) && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    {award.issuer && <span className="font-medium">{award.issuer}</span>}
                    {award.issuer && award.date && <span>•</span>}
                    {award.date && <span>{award.date}</span>}
                  </div>
                )}
                {award.description && <p className="mt-3 text-slate-600 leading-relaxed">{award.description}</p>}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
