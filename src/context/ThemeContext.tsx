import React, { createContext, useContext, useState, useEffect } from 'react';
import { THEMES, Theme } from '../data/themes';

interface ThemeContextType {
  themeId: string;
  theme: Theme;
  setThemeId: (id: string) => void;
}

const DEFAULT_THEME_ID = 'azureLight';

const ThemeContext = createContext<ThemeContextType>({
  themeId: DEFAULT_THEME_ID,
  theme: THEMES[DEFAULT_THEME_ID],
  setThemeId: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeIdState] = useState<string>(() => {
    const saved = localStorage.getItem('portfolio_theme_v2');
    if (saved && THEMES[saved]) return saved;
    return DEFAULT_THEME_ID;
  });

  const theme = THEMES[themeId] || THEMES[DEFAULT_THEME_ID];

  const setThemeId = (id: string) => {
    if (THEMES[id]) {
      setThemeIdState(id);
      localStorage.setItem('portfolio_theme_v2', id);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bg-color', theme.colors.bg);
    root.style.setProperty('--bg-card', theme.colors.bgCard);
    root.style.setProperty('--bg-card-hover', theme.colors.bgCardHover);
    root.style.setProperty('--border-color', theme.colors.border);
    root.style.setProperty('--border-hover', theme.colors.borderHover);
    root.style.setProperty('--text-primary', theme.colors.textPrimary);
    root.style.setProperty('--text-secondary', theme.colors.textSecondary);
    root.style.setProperty('--accent-color', theme.colors.accent);
    root.style.setProperty('--accent-glow', theme.colors.accentGlow);
    root.style.setProperty('--accent-bg', theme.colors.accentBg);

    document.documentElement.style.backgroundColor = theme.colors.bg;
    document.body.style.backgroundColor = theme.colors.bg;
    document.body.style.color = theme.colors.textPrimary;

    if (theme.type === 'light') {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    } else {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ themeId, theme, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
