import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Cloud, Terminal, Wrench, Search, CheckCircle2, Sparkles, Cpu } from 'lucide-react';
import resumeData from '../data/resume.json';

const groupIcons: Record<string, React.FC<{ className?: string }>> = {
  'GCP And Cloud': Cloud,
  'Languages': Code2,
  'Tools': Wrench,
};

export const Skills: React.FC = React.memo(() => {
  const { skills } = resumeData;
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const groups = ['All', ...skills.map((g) => g.group)];

  const filteredSkills = skills
    .filter((g) => selectedGroup === 'All' || g.group === selectedGroup)
    .map((g) => ({
      ...g,
      skills: g.skills.filter((s) => s.toLowerCase().includes(searchQuery.toLowerCase())),
    }))
    .filter((g) => g.skills.length > 0);

  const totalSkillCount = skills.reduce((acc, curr) => acc + curr.skills.length, 0);

  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-24 z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center"
      >
        <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-sky-300/60 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 px-4 py-1.5 text-xs sm:text-sm font-mono uppercase tracking-wider theme-accent font-semibold">
          <Terminal className="h-4 w-4" /> Technical Arsenal
        </span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight theme-text-primary sm:text-5xl">
          Skills & Technologies
        </h2>
        <p className="mx-auto mt-4 max-w-2xl theme-text-secondary text-base sm:text-lg font-normal">
          Comprehensive stack across enterprise Cloud Data Warehousing, orchestration, CDC streaming, and container engines.
        </p>
        <div className="mx-auto mt-6 h-1 w-20 rounded-full" style={{ backgroundColor: 'var(--accent-color)' }} />
      </motion.div>

      {/* Search & Filter Toolbar */}
      <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {groups.map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-mono font-semibold transition-all cursor-pointer ${
                selectedGroup === group
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'border theme-card theme-card-hover theme-text-secondary'
              }`}
            >
              {group}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 theme-text-secondary" />
          <input
            type="text"
            placeholder={`Search ${totalSkillCount} technologies...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border theme-card pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono theme-text-primary placeholder:theme-text-secondary focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          />
        </div>
      </div>

      {/* Skills Group Bento Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredSkills.map((groupData) => {
            const GroupIcon = groupIcons[groupData.group] || Code2;

            return (
              <motion.div
                key={groupData.group}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="rounded-3xl border theme-card p-6 sm:p-7 shadow-sm transition-all duration-300 backdrop-blur-xl"
              >
                <div className="mb-6 flex items-center justify-between border-b theme-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 p-2.5 theme-accent">
                      <GroupIcon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold theme-text-primary">{groupData.group}</h3>
                  </div>
                  <span className="rounded-full border theme-card px-2.5 py-1 text-xs font-mono font-semibold theme-text-secondary">
                    {groupData.skills.length} Stack
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {groupData.skills.map((skill, sIdx) => (
                    <motion.span
                      key={sIdx}
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-sky-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 px-3.5 py-2 text-xs sm:text-sm font-mono theme-text-primary shadow-xs transition-colors hover:border-sky-400 hover:text-sky-600 dark:hover:text-sky-400 font-medium"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
});
