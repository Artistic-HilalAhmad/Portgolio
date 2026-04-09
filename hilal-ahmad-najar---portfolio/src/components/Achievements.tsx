import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, TrendingUp, Zap } from 'lucide-react';
import resumeData from '../data/resume.json';

const AnimatedCounter: React.FC<{ value: number; suffix: string }> = ({ value, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalMilSecDur = 2000;
    let incrementTime = (totalMilSecDur / end) * 2;

    let timer = setInterval(() => {
      start += end > 100 ? Math.ceil(end / 50) : 1;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="text-4xl font-bold tracking-tight text-sky-600">
      {count}{suffix}
    </span>
  );
};

export const Achievements: React.FC = () => {
  const { achievements } = resumeData;

  return (
    <section id="achievements" className="relative mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl font-light tracking-tight text-slate-900 sm:text-4xl">Impact & Achievements</h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-sky-400" />
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-100"
          >
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-sky-50 blur-2xl transition-all group-hover:bg-sky-100" />
            
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-sky-50 p-2 text-sky-500">
                {index % 3 === 0 ? <TrendingUp className="h-6 w-6" /> : index % 3 === 1 ? <Zap className="h-6 w-6" /> : <Trophy className="h-6 w-6" />}
              </div>
            </div>

            <div className="mb-2">
              {achievement.number ? (
                <AnimatedCounter value={achievement.number} suffix={achievement.suffix || ''} />
              ) : (
                <span className="text-2xl font-bold text-slate-900">{achievement.item}</span>
              )}
            </div>

            <h3 className="mb-2 text-lg font-medium text-slate-800">
              {achievement.number ? achievement.item : ''}
            </h3>
            
            <p className="text-sm text-slate-500">
              {achievement.context}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
