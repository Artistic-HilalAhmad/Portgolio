import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Clock, 
  MapPin, 
  Sparkles, 
  Activity, 
  Sun, 
  Moon, 
  Terminal, 
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import resumeData from '../data/resume.json';

export const PersonalHud: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const [isDayTime, setIsDayTime] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      // IST (Indian Standard Time, UTC+5:30)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setTime(formatter.format(new Date()));

      // Calculate IST hour to show sun/moon
      const istHours = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })).getHours();
      setIsDayTime(istHours >= 6 && istHours < 19);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mb-10 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
      {/* 1. Live Timezone & Local Time */}
      <div className="flex items-center justify-between rounded-2xl border theme-card px-4 py-3 shadow-xs backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 p-2 text-sky-600 dark:text-sky-400">
            {isDayTime ? <Sun className="h-4 w-4 text-amber-500 animate-spin" style={{ animationDuration: '20s' }} /> : <Moon className="h-4 w-4 text-indigo-400" />}
          </div>
          <div>
            <div className="text-[10px] theme-text-secondary uppercase font-semibold">Local Time (IST)</div>
            <div className="font-bold theme-text-primary text-xs sm:text-sm tracking-tight">{time || '12:00:00 PM'}</div>
          </div>
        </div>
        <span className="text-[10px] theme-accent font-semibold px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800">
          Srinagar, IN
        </span>
      </div>

      {/* 2. Active Status Beacon */}
      <div className="flex items-center justify-between rounded-2xl border theme-card px-4 py-3 shadow-xs backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-3.5 w-3.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="text-[10px] theme-text-secondary uppercase font-semibold">Current Status</div>
            <div className="font-bold text-emerald-600 dark:text-emerald-400 text-xs tracking-tight">Open for Opportunities</div>
          </div>
        </div>
        <span className="text-[10px] theme-text-secondary font-medium">
          Lead / Staff
        </span>
      </div>

      {/* 3. Real-Time Telemetry Uptime */}
      <div className="flex items-center justify-between rounded-2xl border theme-card px-4 py-3 shadow-xs backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 p-2 text-sky-600 dark:text-sky-400">
            <Activity className="h-4 w-4 text-sky-500" />
          </div>
          <div>
            <div className="text-[10px] theme-text-secondary uppercase font-semibold">GCP Data Pipelines</div>
            <div className="font-bold theme-text-primary text-xs tracking-tight">99.9% Uptime SLA</div>
          </div>
        </div>
        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
          Operational
        </span>
      </div>
    </div>
  );
};
