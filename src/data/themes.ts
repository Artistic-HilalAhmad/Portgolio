export interface Theme {
  id: string;
  name: string;
  description: string;
  type: 'light' | 'dark';
  badgeBg: string;
  colors: {
    bg: string;
    bgCard: string;
    bgCardHover: string;
    border: string;
    borderHover: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    accentGlow: string;
    accentBg: string;
    canvasBg: string;
    particleColor: string;
    lineColor: string;
  };
}

export const THEMES: Record<string, Theme> = {
  azureLight: {
    id: 'azureLight',
    name: 'Executive Azure Light',
    description: 'Crisp porcelain white with modern light-blue & ocean azure highlights (Default)',
    type: 'light',
    badgeBg: 'bg-sky-500',
    colors: {
      bg: '#f0f7ff',
      bgCard: '#ffffff',
      bgCardHover: '#f5f9ff',
      border: '#dbeafe',
      borderHover: '#0284c7',
      textPrimary: '#0f172a',
      textSecondary: '#334155',
      accent: '#0284c7',
      accentGlow: 'rgba(2, 132, 199, 0.18)',
      accentBg: 'rgba(2, 132, 199, 0.08)',
      canvasBg: '#f0f7ff',
      particleColor: 'rgba(2, 132, 199, 0.22)',
      lineColor: 'rgba(2, 132, 199, 0.1)',
    },
  },
  snowflakeLight: {
    id: 'snowflakeLight',
    name: 'Snowflake Arctic White',
    description: 'Pure ice-white canvas with cyan-blue Snowflake Data Cloud accents',
    type: 'light',
    badgeBg: 'bg-cyan-500',
    colors: {
      bg: '#f4f9fd',
      bgCard: '#ffffff',
      bgCardHover: '#eef6fc',
      border: '#cce3f5',
      borderHover: '#0284c7',
      textPrimary: '#0c1a2e',
      textSecondary: '#2d4564',
      accent: '#0284c7',
      accentGlow: 'rgba(14, 165, 233, 0.18)',
      accentBg: 'rgba(14, 165, 233, 0.08)',
      canvasBg: '#f4f9fd',
      particleColor: 'rgba(14, 165, 233, 0.22)',
      lineColor: 'rgba(14, 165, 233, 0.09)',
    },
  },
  gcpCloud: {
    id: 'gcpCloud',
    name: 'Google Cloud Enterprise',
    description: 'Clean cloud white with Google Cloud blue and deep slate typography',
    type: 'light',
    badgeBg: 'bg-blue-600',
    colors: {
      bg: '#f8fafc',
      bgCard: '#ffffff',
      bgCardHover: '#f1f5f9',
      border: '#e2e8f0',
      borderHover: '#2563eb',
      textPrimary: '#0f172a',
      textSecondary: '#475569',
      accent: '#2563eb',
      accentGlow: 'rgba(37, 99, 235, 0.15)',
      accentBg: 'rgba(37, 99, 235, 0.08)',
      canvasBg: '#f8fafc',
      particleColor: 'rgba(37, 99, 235, 0.18)',
      lineColor: 'rgba(37, 99, 235, 0.08)',
    },
  },
  nordicSlate: {
    id: 'nordicSlate',
    name: 'Nordic Minimal Teal',
    description: 'Crisp architectural light grey with cool slate teal accents',
    type: 'light',
    badgeBg: 'bg-teal-600',
    colors: {
      bg: '#f8fafc',
      bgCard: '#ffffff',
      bgCardHover: '#f1f5f9',
      border: '#cbd5e1',
      borderHover: '#0d9488',
      textPrimary: '#0f172a',
      textSecondary: '#334155',
      accent: '#0d9488',
      accentGlow: 'rgba(13, 148, 136, 0.15)',
      accentBg: 'rgba(13, 148, 136, 0.08)',
      canvasBg: '#f8fafc',
      particleColor: 'rgba(13, 148, 136, 0.18)',
      lineColor: 'rgba(13, 148, 136, 0.08)',
    },
  },
  midnightSapphire: {
    id: 'midnightSapphire',
    name: 'Midnight Sapphire (Dark)',
    description: 'Executive dark navy with vibrant electric blue highlights',
    type: 'dark',
    badgeBg: 'bg-sky-400',
    colors: {
      bg: '#070d18',
      bgCard: '#0f172a',
      bgCardHover: '#1e293b',
      border: '#1e293b',
      borderHover: '#38bdf8',
      textPrimary: '#f8fafc',
      textSecondary: '#94a3b8',
      accent: '#38bdf8',
      accentGlow: 'rgba(56, 189, 248, 0.2)',
      accentBg: 'rgba(56, 189, 248, 0.1)',
      canvasBg: '#070d18',
      particleColor: 'rgba(56, 189, 248, 0.25)',
      lineColor: 'rgba(56, 189, 248, 0.08)',
    },
  },
  obsidianSky: {
    id: 'obsidianSky',
    name: 'Obsidian Cloud (Dark)',
    description: 'OLED dark slate canvas with azure and electric cyan accents',
    type: 'dark',
    badgeBg: 'bg-sky-500',
    colors: {
      bg: '#0b0f19',
      bgCard: '#111827',
      bgCardHover: '#1f2937',
      border: '#1e293b',
      borderHover: '#38bdf8',
      textPrimary: '#f8fafc',
      textSecondary: '#94a3b8',
      accent: '#38bdf8',
      accentGlow: 'rgba(56, 189, 248, 0.18)',
      accentBg: 'rgba(56, 189, 248, 0.1)',
      canvasBg: '#0b0f19',
      particleColor: 'rgba(56, 189, 248, 0.25)',
      lineColor: 'rgba(56, 189, 248, 0.08)',
    },
  },
};
