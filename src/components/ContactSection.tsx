import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, MapPin, Send, Check, Copy, MessageSquare, ExternalLink } from 'lucide-react';
import resumeData from '../data/resume.json';

const XIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const ContactSection: React.FC = React.memo(() => {
  const { basics } = resumeData;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(basics.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name || 'Cloud Leader'}`);
    const body = encodeURIComponent(`Hi Hilal,\n\n${message}\n\nFrom: ${name} (${senderEmail})`);
    window.location.href = `mailto:${basics.email}?subject=${subject}&body=${body}`;
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 4000);
  };

  return (
    <section id="contact" className="relative mx-auto max-w-5xl px-6 py-24 z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center"
      >
        <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-sky-300/60 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 px-4 py-1.5 text-xs sm:text-sm font-mono uppercase tracking-wider theme-accent font-semibold">
          <MessageSquare className="h-4 w-4" /> Get In Touch
        </span>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight theme-text-primary sm:text-5xl">
          Let's Build Robust Cloud Pipelines
        </h2>
        <p className="mx-auto mt-4 max-w-2xl theme-text-secondary text-base sm:text-lg font-normal">
          Interested in discussing Senior Cloud Data Engineering opportunities, dbt modeling, or GCP & Snowflake architecture? Let's connect.
        </p>
        <div className="mx-auto mt-6 h-1 w-20 rounded-full" style={{ backgroundColor: 'var(--accent-color)' }} />
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Contact Info Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Email card */}
          <div className="rounded-3xl border theme-card p-6 shadow-sm backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 p-2.5 theme-accent">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-mono theme-text-secondary uppercase font-bold">Direct Email</span>
                <div className="text-sm sm:text-base font-bold theme-text-primary truncate">{basics.email}</div>
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="mt-3 flex items-center justify-center gap-2 w-full rounded-xl border theme-card theme-card-hover py-2.5 text-xs font-mono font-semibold transition-all cursor-pointer"
            >
              {copiedEmail ? (
                <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                  <Check className="h-3.5 w-3.5" /> Email Copied to Clipboard
                </span>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 theme-accent" />
                  <span>Copy Email Address</span>
                </>
              )}
            </button>
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* LinkedIn card */}
            <div className="rounded-3xl border theme-card p-5 sm:p-6 shadow-sm backdrop-blur-xl flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 p-2.5 text-sky-600 dark:text-sky-400">
                  <Linkedin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-mono theme-text-secondary uppercase font-bold">Network</span>
                  <div className="text-sm font-bold theme-text-primary">LinkedIn</div>
                </div>
              </div>
              <a
                href={basics.links.find(l => l.name === 'LinkedIn')?.url || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 w-full rounded-xl border theme-card theme-card-hover py-2 text-xs font-mono font-semibold theme-text-primary transition-all"
              >
                <Linkedin className="h-3.5 w-3.5 text-sky-600" />
                <span>Connect</span>
              </a>
            </div>

            {/* X (Twitter) card */}
            <div className="rounded-3xl border theme-card p-5 sm:p-6 shadow-sm backdrop-blur-xl flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-2.5 theme-text-primary">
                  <XIcon className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-mono theme-text-secondary uppercase font-bold">Updates & Cloud</span>
                  <div className="text-sm font-bold theme-text-primary">X (Twitter)</div>
                </div>
              </div>
              <a
                href={basics.links.find(l => l.name === 'X')?.url || 'https://x.com/Thehilalahmad'}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 w-full rounded-xl border theme-card theme-card-hover py-2 text-xs font-mono font-semibold theme-text-primary transition-all"
              >
                <XIcon className="h-3.5 w-3.5" />
                <span>Follow @Thehilalahmad</span>
              </a>
            </div>
          </div>

          {/* Location card */}
          <div className="rounded-3xl border theme-card p-6 shadow-sm backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 p-2.5 theme-accent">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-mono theme-text-secondary uppercase font-bold">Location & Availability</span>
                <div className="text-sm sm:text-base font-bold theme-text-primary">{basics.location} (Open to Remote / Relocation)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Composer Form (7 cols) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSendMessage} className="rounded-3xl border theme-card p-7 sm:p-8 shadow-sm backdrop-blur-xl">
            <h3 className="text-xl font-bold theme-text-primary mb-4 flex items-center gap-2">
              <Send className="h-5 w-5 theme-accent" /> Send an Direct Message
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider theme-text-secondary font-semibold mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border theme-card px-4 py-2.5 text-sm font-mono theme-text-primary placeholder:theme-text-secondary focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider theme-text-secondary font-semibold mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. recruiter@company.com"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full rounded-xl border theme-card px-4 py-2.5 text-sm font-mono theme-text-primary placeholder:theme-text-secondary focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider theme-text-secondary font-semibold mb-1.5">
                  Message / Role Details
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Hi Hilal, we have an exciting Data Engineering / Cloud Architect role..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border theme-card px-4 py-2.5 text-sm font-mono theme-text-primary placeholder:theme-text-secondary focus:outline-none focus:ring-2 focus:ring-sky-500/40 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.01] cursor-pointer"
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                <Send className="h-4 w-4" />
                {sentSuccess ? 'Opening Email Client...' : 'Send Message to Hilal'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
});
