import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Search, 
  Sparkles,
  Cloud,
  Code2,
  Wrench
} from 'lucide-react';
import {
  SiGooglebigquery,
  SiGoogledataflow,
  SiGooglecloudcomposer,
  SiGooglepubsub,
  SiGooglecloud,
  SiKubernetes,
  SiRedis,
  SiSnowflake,
  SiPython,
  SiC,
  SiCplusplus,
  SiApacheairflow,
  SiJenkins,
  SiEclipseide,
  SiDocker,
  SiGithub
} from 'react-icons/si';
import { FaJava, FaDatabase } from 'react-icons/fa6';
import { DiEclipse } from 'react-icons/di';
import { TbSql, TbBrandVscode } from 'react-icons/tb';
import { VscAzureDevops } from 'react-icons/vsc';
import { SpotlightCard } from './SpotlightCard';
import resumeData from '../data/resume.json';

// Official dbt Labs Vector Icon
const DbtIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.5 7.828v8.344l-7.5 4.33-7.5-4.33V7.828l7.5-4.33 7.5 4.33zM12 5.172L6 8.636v6.728l6 3.464 6-3.464V8.636L12 5.172z" />
    <path d="M12 7.5l-4.5 2.6v5.2L12 17.9l4.5-2.6v-5.2L12 7.5zm0 1.732l3 1.732v3.464l-3 1.732-3-1.732V10.964l3-1.732z" fill="#FF694B" />
  </svg>
);

interface SkillIconMeta {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  brandColor: string;
  bgTint: string;
}

const skillIconMap: Record<string, SkillIconMeta> = {
  // GCP & Cloud
  'bigquery': { icon: SiGooglebigquery, brandColor: '#4285F4', bgTint: 'rgba(66, 133, 244, 0.1)' },
  'dataflow': { icon: SiGoogledataflow, brandColor: '#1A73E8', bgTint: 'rgba(26, 115, 232, 0.1)' },
  'composer': { icon: SiGooglecloudcomposer, brandColor: '#017CEE', bgTint: 'rgba(1, 124, 238, 0.1)' },
  'pub/sub': { icon: SiGooglepubsub, brandColor: '#4285F4', bgTint: 'rgba(66, 133, 244, 0.1)' },
  'cloud sql': { icon: SiGooglecloud, brandColor: '#4285F4', bgTint: 'rgba(66, 133, 244, 0.1)' },
  'google kubernetes engine': { icon: SiKubernetes, brandColor: '#326CE5', bgTint: 'rgba(50, 108, 229, 0.1)' },
  'compute engine': { icon: SiGooglecloud, brandColor: '#4285F4', bgTint: 'rgba(66, 133, 244, 0.1)' },
  'redis': { icon: SiRedis, brandColor: '#DC382D', bgTint: 'rgba(220, 56, 45, 0.1)' },
  'snowflake': { icon: SiSnowflake, brandColor: '#29B5E8', bgTint: 'rgba(41, 181, 232, 0.1)' },
  'dbt': { icon: DbtIcon, brandColor: '#FF694B', bgTint: 'rgba(255, 105, 75, 0.1)' },

  // Languages
  'python': { icon: SiPython, brandColor: '#3776AB', bgTint: 'rgba(55, 118, 171, 0.1)' },
  'java': { icon: FaJava, brandColor: '#E76F00', bgTint: 'rgba(231, 111, 0, 0.1)' },
  'sql': { icon: TbSql, brandColor: '#00758F', bgTint: 'rgba(0, 117, 143, 0.1)' },
  'c': { icon: SiC, brandColor: '#00599C', bgTint: 'rgba(0, 89, 156, 0.1)' },
  'c++': { icon: SiCplusplus, brandColor: '#00599C', bgTint: 'rgba(0, 89, 156, 0.1)' },
  'pl/sql': { icon: FaDatabase, brandColor: '#F80000', bgTint: 'rgba(248, 0, 0, 0.1)' },

  // Tools
  'apache airflow': { icon: SiApacheairflow, brandColor: '#017CEE', bgTint: 'rgba(1, 124, 238, 0.1)' },
  'vsts': { icon: VscAzureDevops, brandColor: '#0078D7', bgTint: 'rgba(0, 120, 215, 0.1)' },
  'jenkins': { icon: SiJenkins, brandColor: '#D24939', bgTint: 'rgba(210, 73, 57, 0.1)' },
  'eclipse': { icon: DiEclipse || SiEclipseide, brandColor: '#2C2255', bgTint: 'rgba(44, 34, 85, 0.1)' },
  'vs code': { icon: TbBrandVscode, brandColor: '#007ACC', bgTint: 'rgba(0, 122, 204, 0.1)' },
  'docker': { icon: SiDocker, brandColor: '#2496ED', bgTint: 'rgba(36, 150, 237, 0.1)' },
  'github': { icon: SiGithub, brandColor: '#24292e', bgTint: 'rgba(36, 41, 46, 0.1)' },
};

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

  const getSkillMeta = (skillName: string): SkillIconMeta => {
    const key = skillName.trim().toLowerCase();
    if (skillIconMap[key]) return skillIconMap[key];
    if (key.includes('dbt')) return skillIconMap['dbt'];
    if (key.includes('airflow')) return skillIconMap['apache airflow'];
    if (key.includes('kubernetes') || key.includes('gke')) return skillIconMap['google kubernetes engine'];
    if (key.includes('bigquery')) return skillIconMap['bigquery'];
    if (key.includes('snowflake')) return skillIconMap['snowflake'];
    if (key.includes('sql')) return skillIconMap['sql'];
    if (key.includes('java')) return skillIconMap['java'];
    if (key.includes('python')) return skillIconMap['python'];
    return { icon: Sparkles, brandColor: 'var(--accent-color)', bgTint: 'rgba(2, 132, 199, 0.1)' };
  };

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
          Comprehensive stack across enterprise Cloud Data Warehouses, stream processing, orchestration, and container architectures.
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
              className={`rounded-2xl px-4 py-2 text-xs sm:text-sm font-mono font-semibold transition-all cursor-pointer ${
                selectedGroup === group
                  ? 'bg-sky-500 text-white shadow-md scale-105'
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
            className="w-full rounded-2xl border theme-card pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono theme-text-primary placeholder:theme-text-secondary focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          />
        </div>
      </div>

      {/* Skills Group Bento Grid with Spotlight Effect */}
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
              >
                <SpotlightCard className="p-6 sm:p-7 h-full flex flex-col justify-between">
                  <div>
                    <div className="mb-6 flex items-center justify-between border-b theme-border pb-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 p-2.5 theme-accent">
                          <GroupIcon className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-bold theme-text-primary">{groupData.group}</h3>
                      </div>
                      <span className="rounded-full border theme-card px-2.5 py-1 text-xs font-mono font-semibold theme-text-secondary">
                        {groupData.skills.length} Techs
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {groupData.skills.map((skill, sIdx) => {
                        const meta = getSkillMeta(skill);
                        const IconComponent = meta.icon;

                        return (
                          <motion.div
                            key={sIdx}
                            whileHover={{ scale: 1.04, y: -2 }}
                            className="group inline-flex items-center gap-2.5 rounded-2xl border border-sky-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/80 px-3.5 py-2 text-xs sm:text-sm font-mono theme-text-primary shadow-xs transition-all hover:border-sky-400 hover:shadow-md cursor-default"
                          >
                            <div 
                              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl p-1.5 transition-transform group-hover:scale-110 shadow-2xs"
                              style={{ 
                                backgroundColor: meta.bgTint,
                                border: `1px solid ${meta.brandColor}33`
                              }}
                            >
                              <IconComponent 
                                className="h-4 w-4 shrink-0 transition-colors"
                                style={{ color: meta.brandColor }}
                              />
                            </div>
                            <span className="font-bold theme-text-primary group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                              {skill}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-dashed theme-border flex items-center justify-between text-[11px] font-mono theme-text-secondary">
                    <span>Verified Production Experience</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
});
