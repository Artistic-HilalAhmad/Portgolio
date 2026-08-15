import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  TrendingDown, 
  ShieldCheck, 
  CheckCircle, 
  Database, 
  Clock, 
  CheckCircle2, 
  Layers,
  Sparkles,
  Zap,
  Activity
} from 'lucide-react';
import resumeData from '../data/resume.json';

const iconMap: Record<number, React.FC<{ className?: string }>> = {
  0: TrendingDown,
  1: ShieldCheck,
  2: CheckCircle,
  3: Database,
  4: Clock,
  5: CheckCircle2,
  6: Layers,
};

const AnimatedCounter: React.FC<{ value: number; suffix: string }> = ({ value, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const stepTime = duration / steps;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Number(current.toFixed(1)));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="font-mono text-3xl sm:text-4xl font-extrabold theme-text-primary tracking-tight">
      {count}
      <span className="theme-accent ml-1 text-2xl sm:text-3xl font-bold">{suffix}</span>
    </span>
  );
};

export const Achievements: React.FC = React.memo(() => {
  const { achievements } = resumeData;

  return (
    <section id="achievements" className="relative mx-auto max-w-6xl px-6 py-24 z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center"
      >
        <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-sky-300/60 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 px-4 py-1.5 text-xs sm:text-sm font-mono uppercase tracking-wider theme-accent font-semibold">
          <Trophy className="h-4 w-4" /> Measured Accomplishments
        </span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight theme-text-primary sm:text-5xl">
          Quantified Impact & SLA Results
        </h2>
        <p className="mx-auto mt-4 max-w-2xl theme-text-secondary text-base sm:text-lg font-normal">
          Key performance indicators showcasing cost optimization, pipeline reliability, query throughput, and data quality.
        </p>
        <div className="mx-auto mt-6 h-1 w-20 rounded-full" style={{ backgroundColor: 'var(--accent-color)' }} />
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement, index) => {
          const Icon = iconMap[index] || Sparkles;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group relative overflow-hidden rounded-3xl border theme-card theme-card-hover p-7 backdrop-blur-xl transition-all duration-300 shadow-sm"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 p-3 theme-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-mono theme-text-secondary uppercase tracking-wider font-semibold">
                  Metric #{index + 1}
                </span>
              </div>

              <div className="mb-3">
                {achievement.number ? (
                  <AnimatedCounter value={achievement.number} suffix={achievement.suffix || ''} />
                ) : (
                  <span className="text-2xl sm:text-3xl font-bold theme-text-primary">{achievement.item}</span>
                )}
              </div>

              <h3 className="mb-2 text-base sm:text-lg font-bold theme-text-primary">
                {achievement.number ? achievement.item : ''}
              </h3>
              
              <p className="text-sm sm:text-base theme-text-secondary font-normal leading-relaxed">
                {achievement.context}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
});
