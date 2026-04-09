import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const Splash: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1500; // 1.5s
    const interval = 30;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 300); // slight delay after reaching 100%
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-sky-50 text-slate-900"
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center gap-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-sky-200 bg-white shadow-lg"
        >
          <span className="font-serif text-4xl font-medium tracking-tight text-sky-800">
            HN
          </span>
        </motion.div>

        <div className="w-48 h-1 overflow-hidden rounded-full bg-sky-200/50">
          <motion.div
            className="h-full bg-sky-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};
