import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Database, Layers, ShieldCheck, Zap } from 'lucide-react';

interface SplashProps {
  onComplete: () => void;
}

export const Splash: React.FC<SplashProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    { label: 'Initializing Cloud Architecture...', icon: Database },
    { label: 'Verifying Snowflake & dbt DAGs...', icon: Layers },
    { label: 'Connecting Real-time CDC Pipeline...', icon: Zap },
    { label: 'Portfolio Engine Ready', icon: ShieldCheck },
  ];

  useEffect(() => {
    const duration = 1400; // ms
    const interval = 20; // ms
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 350);
          return 100;
        }
        if (next > 75) setStepIndex(3);
        else if (next > 50) setStepIndex(2);
        else if (next > 25) setStepIndex(1);
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const CurrentIcon = steps[stepIndex].icon;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
    >
      {/* Background radial glow */}
      <div 
        className="absolute h-96 w-96 rounded-full blur-[120px] pointer-events-none opacity-40"
        style={{ backgroundColor: 'var(--accent-color)' }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        {/* Monogram Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative flex h-20 w-20 items-center justify-center rounded-2xl border theme-card shadow-xl backdrop-blur-xl"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-400/20 via-transparent to-blue-500/10 pointer-events-none" />
          <span className="font-mono text-2xl font-extrabold tracking-wider theme-accent">
            HA
          </span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="font-mono text-base tracking-wider theme-text-primary uppercase font-extrabold">
            Hilal Ahmad Najar
          </span>
          <span className="font-mono text-xs theme-accent tracking-wide font-semibold flex items-center gap-1.5">
            <CurrentIcon className="h-3.5 w-3.5" />
            Senior Cloud Data Engineer
          </span>
        </motion.div>

        {/* Progress Bar & Status */}
        <div className="flex flex-col items-center gap-3 mt-2">
          <div className="w-64 h-2 overflow-hidden rounded-full border theme-border p-0.5 bg-sky-100/60 dark:bg-slate-800">
            <motion.div
              className="h-full rounded-full shadow-sm"
              style={{ width: `${progress}%`, backgroundColor: 'var(--accent-color)' }}
            />
          </div>
          <span className="font-mono text-xs theme-text-secondary tracking-wider font-semibold">
            {steps[stepIndex].label} {Math.round(progress)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};
