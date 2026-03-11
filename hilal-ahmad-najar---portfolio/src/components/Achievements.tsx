import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'motion/react';
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
    <span className="text-4xl font-bold text-white">
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
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Impact & Achievements</h2>
        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-emerald-500/10"
          >
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl transition-all group-hover:bg-emerald-500/20" />
            
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-400">
                {index % 3 === 0 ? <TrendingUp className="h-6 w-6" /> : index % 3 === 1 ? <Zap className="h-6 w-6" /> : <Trophy className="h-6 w-6" />}
              </div>
            </div>

            <div className="mb-2">
              {achievement.number ? (
                <AnimatedCounter value={achievement.number} suffix={achievement.suffix || ''} />
              ) : (
                <span className="text-2xl font-bold text-white">{achievement.item}</span>
              )}
            </div>

            <h3 className="mb-2 text-lg font-medium text-slate-200">
              {achievement.number ? achievement.item : ''}
            </h3>
            
            <p className="text-sm text-slate-400">
              {achievement.context}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
