import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode } from '../types/portfolio';

export interface EditorSettings {
  fontSize: number;
  lineNumbers: boolean;
  minimap: boolean;
  wordWrap: boolean;
  soundEffects: boolean;
}

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  settings: EditorSettings;
  updateSettings: (partial: Partial<EditorSettings>) => void;
  playKeySound: () => void;
}

const defaultSettings: EditorSettings = {
  fontSize: 14,
  lineNumbers: true,
  minimap: true,
  wordWrap: true,
  soundEffects: false,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('samarth_portfolio_theme');
    return (saved as ThemeMode) || 'dark';
  });

  const [settings, setSettingsState] = useState<EditorSettings>(() => {
    const saved = localStorage.getItem('samarth_portfolio_settings');
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('samarth_portfolio_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('samarth_portfolio_settings', JSON.stringify(settings));
  }, [settings]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const updateSettings = (partial: Partial<EditorSettings>) => {
    setSettingsState((prev) => ({ ...prev, ...partial }));
  };

  const playKeySound = () => {
    if (!settings.soundEffects) return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440 + Math.random() * 80, ctx.currentTime);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        settings,
        updateSettings,
        playKeySound,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
