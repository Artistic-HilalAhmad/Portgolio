import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Check, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { THEMES } from '../data/themes';

export const ThemeSelector: React.FC = () => {
  const { themeId, theme, setThemeId } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeList = Object.values(THEMES);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-xl border theme-card theme-card-hover px-3 py-2 text-xs font-mono font-semibold theme-text-primary transition-all cursor-pointer backdrop-blur-md shadow-sm"
        title="Theme Switcher"
      >
        <Palette className="h-4 w-4 theme-accent" />
        <span className="hidden sm:inline">{theme.name}</span>
        {theme.type === 'light' ? (
          <Sun className="h-3.5 w-3.5 text-amber-500" />
        ) : (
          <Moon className="h-3.5 w-3.5 text-sky-400" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl border theme-card p-3 shadow-2xl backdrop-blur-xl z-50 theme-text-primary"
          >
            <div className="px-2 py-1.5 mb-2 border-b theme-border flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider theme-text-secondary">
                Select Theme Palette
              </span>
              <span className="text-[10px] font-mono theme-accent border border-sky-300/40 bg-sky-500/10 px-2 py-0.5 rounded-full font-bold">
                {themeList.length} Presets
              </span>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-1.5 pr-1">
              {themeList.map((t) => {
                const isSelected = themeId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setThemeId(t.id);
                      setIsOpen(false);
                    }}
                    className={`group relative flex items-start gap-3 rounded-xl p-2.5 text-left transition-all cursor-pointer w-full ${
                      isSelected
                        ? 'border shadow-md ring-1 ring-sky-400/40'
                        : 'border border-transparent hover:border-sky-200 hover:bg-sky-50/50 dark:hover:bg-slate-800/50'
                    }`}
                    style={
                      isSelected
                        ? { backgroundColor: 'var(--bg-card-hover)', borderColor: 'var(--accent-color)' }
                        : {}
                    }
                  >
                    {/* Color Preview Swatch */}
                    <div
                      className="mt-0.5 h-6 w-6 shrink-0 rounded-lg border border-slate-300 dark:border-slate-700 shadow-inner flex items-center justify-center overflow-hidden"
                      style={{ backgroundColor: t.colors.bg }}
                    >
                      <div
                        className="h-3 w-3 rounded-full shadow-sm"
                        style={{ backgroundColor: t.colors.accent }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono text-xs font-bold theme-text-primary group-hover:theme-accent transition-colors truncate">
                          {t.name}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-200/60 dark:bg-slate-800 theme-text-secondary uppercase">
                            {t.type}
                          </span>
                          {isSelected && (
                            <Check className="h-3.5 w-3.5 theme-accent shrink-0" />
                          )}
                        </div>
                      </div>
                      <p className="text-[11px] theme-text-secondary line-clamp-2 mt-0.5 leading-snug">
                        {t.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
