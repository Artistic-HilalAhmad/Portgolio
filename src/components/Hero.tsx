import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowDown, 
  Download, 
  Mail, 
  MapPin, 
  Check, 
  Copy, 
  Layers, 
  ShieldCheck, 
  Database, 
  Award, 
  ExternalLink,
  Sparkles,
  Cloud,
  Cpu,
  Terminal,
  Activity
} from 'lucide-react';
import resumeData from '../data/resume.json';

export const Hero: React.FC = React.memo(() => {
  const { basics } = resumeData;
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleScrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(basics.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="hero" className="relative flex min-h-[92vh] flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">
      {/* Subtle ambient lighting gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[28rem] w-[36rem] rounded-full bg-sky-400/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="max-w-4xl relative z-10"
      >
        {/* Professional Availability Beacon Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-sky-300/60 dark:border-sky-500/30 bg-white/80 dark:bg-sky-500/10 px-5 py-2.5 text-xs sm:text-sm font-semibold theme-accent backdrop-blur-md shadow-sm"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-500 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-500"></span>
          </span>
          <span>Senior Cloud Data Engineer • Open to Lead & Staff Roles</span>
          <Sparkles className="h-4 w-4 text-sky-500" />
        </motion.div>

        {/* Hero Headline */}
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight theme-text-primary sm:text-6xl lg:text-7xl">
          Hi, I'm{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-sky-500 to-blue-700 dark:from-sky-300 dark:via-sky-200 dark:to-blue-400">
            {basics.name}
          </span>
        </h1>
        
        {/* Subtitle & Core Stack */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2 text-base sm:text-xl font-mono font-bold theme-accent">
          <span>{basics.title}</span>
          <span className="text-slate-400">•</span>
          <span>5+ Years Experience</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-700 dark:text-slate-300">GCP & Snowflake</span>
        </div>

        {/* Executive Summary */}
        <p className="mx-auto mb-9 max-w-3xl text-base leading-relaxed theme-text-secondary sm:text-lg lg:text-xl font-normal">
          {basics.summary}
        </p>

        {/* Quick Contact & Info Pills */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3.5 text-xs sm:text-sm font-mono theme-text-primary">
          <div className="flex items-center gap-2 rounded-xl border theme-card px-4 py-2.5 shadow-sm">
            <MapPin className="h-4 w-4 theme-accent" />
            <span>{basics.location}</span>
          </div>

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2 rounded-xl border theme-card theme-card-hover px-4 py-2.5 shadow-sm transition-all cursor-pointer group"
          >
            <Mail className="h-4 w-4 theme-accent" />
            <span className="font-semibold theme-text-primary">{basics.email}</span>
            {copiedEmail ? (
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                <Check className="h-3.5 w-3.5" /> Copied
              </span>
            ) : (
              <Copy className="h-3.5 w-3.5 theme-text-secondary group-hover:theme-accent transition-colors" />
            )}
          </button>

          <div className="flex items-center gap-2 rounded-xl border theme-card px-4 py-2.5 shadow-sm">
            <Activity className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">99.9% Pipeline SLA</span>
          </div>
        </div>

        {/* High-Impact Key Metrics Bento Strip */}
        <div className="mb-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="rounded-2xl border theme-card theme-card-hover p-5 shadow-sm transition-all group">
            <div className="flex items-center gap-2 theme-accent font-mono text-sm font-bold mb-1.5">
              <Database className="h-4 w-4" /> 2 TB / Day
            </div>
            <div className="text-sm font-bold theme-text-primary">CDC Striim Ingestion</div>
            <div className="text-xs theme-text-secondary mt-1">Real-time DB streams in 5-min SLAs</div>
          </div>

          <div className="rounded-2xl border theme-card theme-card-hover p-5 shadow-sm transition-all group">
            <div className="flex items-center gap-2 text-sky-500 font-mono text-sm font-bold mb-1.5">
              <Layers className="h-4 w-4" /> 100+ Models
            </div>
            <div className="text-sm font-bold theme-text-primary">dbt + Snowflake Iceberg</div>
            <div className="text-xs theme-text-secondary mt-1">Incremental CDC history tracking</div>
          </div>

          <div className="rounded-2xl border theme-card theme-card-hover p-5 shadow-sm transition-all group">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-sm font-bold mb-1.5">
              <ShieldCheck className="h-4 w-4" /> 40% Data Quality
            </div>
            <div className="text-sm font-bold theme-text-primary">Automated Audits</div>
            <div className="text-xs theme-text-secondary mt-1">Cloud Composer validation frameworks</div>
          </div>

          <div className="rounded-2xl border theme-card theme-card-hover p-5 shadow-sm transition-all group">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-mono text-sm font-bold mb-1.5">
              <Award className="h-4 w-4" /> UGC-NET Qualified
            </div>
            <div className="text-sm font-bold theme-text-primary">Computer Science</div>
            <div className="text-xs theme-text-secondary mt-1">Assistant Professor Eligibility</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-3.5 sm:flex-row">
          <button
            onClick={() => handleScrollToSection('architecture')}
            className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:scale-105 cursor-pointer"
            style={{ backgroundColor: 'var(--accent-color)' }}
          >
            <Cloud className="h-4 w-4" />
            Explore Pipeline Architecture
            <ExternalLink className="h-3.5 w-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => handleScrollToSection('experience')}
            className="group inline-flex items-center gap-2 rounded-full border theme-card theme-card-hover px-7 py-3.5 text-sm font-semibold transition-all cursor-pointer"
          >
            <Terminal className="h-4 w-4 theme-accent" />
            View Work History
            <ArrowDown className="h-4 w-4 theme-text-secondary transition-transform group-hover:translate-y-0.5" />
          </button>
          
          <a
            href="/Hilal_Ahmad_Najar_Resume.pdf"
            download="Hilal_Ahmad_Najar_Resume.pdf"
            className="group inline-flex items-center gap-2 rounded-full border theme-card theme-card-hover px-6 py-3.5 text-sm font-semibold transition-all cursor-pointer"
          >
            <Download className="h-4 w-4 theme-accent" />
            Download Resume PDF
          </a>
        </div>
      </motion.div>
    </section>
  );
});
