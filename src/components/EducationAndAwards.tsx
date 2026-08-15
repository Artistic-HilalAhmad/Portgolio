import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, Calendar, CheckCircle2, Trophy, Star, BookOpen, ShieldCheck } from 'lucide-react';
import resumeData from '../data/resume.json';

export const EducationAndAwards: React.FC = React.memo(() => {
  const { education, awards, certifications } = resumeData;

  return (
    <section id="education" className="relative mx-auto max-w-6xl px-6 py-24 z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center"
      >
        <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-sky-300/60 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 px-4 py-1.5 text-xs sm:text-sm font-mono uppercase tracking-wider theme-accent font-semibold">
          <GraduationCap className="h-4 w-4" /> Academic & Honors
        </span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight theme-text-primary sm:text-5xl">
          Education & Awards
        </h2>
        <p className="mx-auto mt-4 max-w-2xl theme-text-secondary text-base sm:text-lg font-normal">
          Academic foundation in Computer Applications, National Eligibility Test qualification, and corporate honors.
        </p>
        <div className="mx-auto mt-6 h-1 w-20 rounded-full" style={{ backgroundColor: 'var(--accent-color)' }} />
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Education (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2.5 px-2">
            <GraduationCap className="h-5 w-5 theme-accent" />
            <h3 className="text-xl font-bold theme-text-primary">Formal Degrees</h3>
          </div>

          <div className="space-y-4">
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-3xl border theme-card p-6 shadow-sm transition-all duration-300 backdrop-blur-xl"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-base sm:text-lg font-bold theme-text-primary">{edu.degree}</h4>
                  <span className="shrink-0 rounded-full bg-sky-100 dark:bg-sky-950 px-3 py-1 text-xs font-mono font-bold text-sky-700 dark:text-sky-300 border border-sky-300/60 dark:border-sky-700">
                    {edu.details}
                  </span>
                </div>
                <p className="text-sm theme-text-secondary font-medium mt-1">{edu.institution}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-mono theme-text-secondary">
                  <Calendar className="h-3.5 w-3.5 theme-accent" />
                  <span>{edu.dates}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications Box */}
          {certifications && certifications.length > 0 && (
            <div className="rounded-3xl border theme-card p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4 theme-accent" />
                <h4 className="text-sm font-mono font-bold uppercase tracking-wider theme-text-primary">
                  Continuous Certifications
                </h4>
              </div>
              <div className="space-y-2">
                {certifications.map((cert, cIdx) => (
                  <div key={cIdx} className="flex items-center gap-2 text-xs sm:text-sm font-mono theme-text-secondary">
                    <CheckCircle2 className="h-3.5 w-3.5 theme-accent shrink-0" />
                    <span>{cert.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Awards & UGC-NET (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2.5 px-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            <h3 className="text-xl font-bold theme-text-primary">Honors & National Recognition</h3>
          </div>

          <div className="space-y-4">
            {awards.map((award, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-3xl border theme-card p-6 sm:p-7 shadow-sm transition-all duration-300 backdrop-blur-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-300/60 dark:border-amber-700">
                      <Star className="h-4 w-4 fill-amber-400" />
                    </div>
                    <h4 className="text-lg font-extrabold theme-text-primary">{award.title}</h4>
                  </div>
                  
                  {award.date && (
                    <span className="text-xs font-mono font-semibold theme-accent sm:text-right">
                      {award.date}
                    </span>
                  )}
                </div>

                {award.issuer && (
                  <div className="text-xs font-mono uppercase tracking-wider theme-accent font-bold mb-2">
                    {award.issuer}
                  </div>
                )}

                <p className="text-sm sm:text-base theme-text-secondary leading-relaxed font-normal">
                  {award.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
