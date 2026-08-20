import React from 'react';
import { Palette, Sliders, Volume2, Type, Eye, RotateCcw, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import { ThemeMode } from '../../types/portfolio';

export const SettingsPanel: React.FC = () => {
  const { theme, setTheme, settings, updateSettings } = useTheme();
  const { closeSidebar } = useWorkspace();

  const themes: { id: ThemeMode; label: string; bg: string; border: string; accent: string }[] = [
    { id: 'dark', label: 'Dark Modern', bg: '#181818', border: '#2b2b2b', accent: '#007acc' },
    { id: 'midnight', label: 'Midnight Blue', bg: '#0b101b', border: '#1e293b', accent: '#38bdf8' },
    { id: 'monokai', label: 'Monokai Pro', bg: '#272822', border: '#3e3d32', accent: '#a6e22e' },
    { id: 'light', label: 'Light+', bg: '#f8f8f8', border: '#e5e5e5', accent: '#007acc' },
  ];

  return (
    <div className="h-full w-full bg-ide-sidebar flex flex-col select-none text-xs text-ide-text overflow-y-auto">
      {/* Header */}
      <div className="h-9 px-3 flex items-center justify-between font-semibold tracking-wider text-ide-muted text-[11px] border-b border-ide-border shrink-0">
        <span className="font-mono">SETTINGS</span>
        <button 
          onClick={closeSidebar} 
          className="md:hidden p-1 hover:text-white rounded text-ide-muted hover:bg-ide-tabHover"
          title="Close Settings"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Theme Section */}
        <div className="space-y-3">
          <div className="flex items-center space-x-1.5 text-ide-text font-semibold text-xs font-mono">
            <Palette className="w-4 h-4 text-ide-accent" />
            <span>Color Theme</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-2.5 rounded border text-left flex flex-col justify-between transition-all ${
                  theme === t.id
                    ? 'border-ide-accent ring-1 ring-ide-accent bg-ide-tabHover'
                    : 'border-ide-border hover:border-ide-borderLight bg-ide-bg'
                }`}
              >
                <div className="flex items-center space-x-1.5 mb-2">
                  <div
                    className="w-3 h-3 rounded-full border border-black/30"
                    style={{ backgroundColor: t.accent }}
                  />
                  <span className="font-medium text-[11px] truncate font-mono">{t.label}</span>
                </div>
                <div 
                  className="w-full h-3 rounded-xs border" 
                  style={{ backgroundColor: t.bg, borderColor: t.border }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Editor Preferences */}
        <div className="space-y-3 border-t border-ide-border pt-4">
          <div className="flex items-center space-x-1.5 text-ide-text font-semibold text-xs font-mono">
            <Sliders className="w-4 h-4 text-ide-accent" />
            <span>Editor Preferences</span>
          </div>

          {/* Font Size */}
          <div className="flex items-center justify-between py-1 font-mono">
            <div className="flex items-center space-x-1.5">
              <Type className="w-3.5 h-3.5 text-ide-muted" />
              <span>Font Size</span>
            </div>
            <div className="flex items-center space-x-1 bg-ide-bg p-0.5 rounded border border-ide-border">
              {[12, 14, 16].map((size) => (
                <button
                  key={size}
                  onClick={() => updateSettings({ fontSize: size })}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                    settings.fontSize === size
                      ? 'bg-ide-accent text-white font-medium'
                      : 'text-ide-muted hover:text-ide-text'
                  }`}
                >
                  {size}px
                </button>
              ))}
            </div>
          </div>

          {/* Line Numbers Toggle */}
          <div className="flex items-center justify-between py-1 font-mono">
            <span>Line Numbers</span>
            <input
              type="checkbox"
              checked={settings.lineNumbers}
              onChange={(e) => updateSettings({ lineNumbers: e.target.checked })}
              className="accent-ide-accent w-4 h-4 cursor-pointer"
            />
          </div>

          {/* Minimap Toggle */}
          <div className="flex items-center justify-between py-1 font-mono">
            <div className="flex items-center space-x-1.5">
              <Eye className="w-3.5 h-3.5 text-ide-muted" />
              <span>Editor Minimap</span>
            </div>
            <input
              type="checkbox"
              checked={settings.minimap}
              onChange={(e) => updateSettings({ minimap: e.target.checked })}
              className="accent-ide-accent w-4 h-4 cursor-pointer"
            />
          </div>

          {/* Word Wrap Toggle */}
          <div className="flex items-center justify-between py-1 font-mono">
            <span>Word Wrap</span>
            <input
              type="checkbox"
              checked={settings.wordWrap}
              onChange={(e) => updateSettings({ wordWrap: e.target.checked })}
              className="accent-ide-accent w-4 h-4 cursor-pointer"
            />
          </div>

          {/* Mechanical Keyboard Sound Effects */}
          <div className="flex items-center justify-between py-1 font-mono">
            <div className="flex items-center space-x-1.5">
              <Volume2 className="w-3.5 h-3.5 text-ide-muted" />
              <span>Audio Feedback</span>
            </div>
            <input
              type="checkbox"
              checked={settings.soundEffects}
              onChange={(e) => updateSettings({ soundEffects: e.target.checked })}
              className="accent-ide-accent w-4 h-4 cursor-pointer"
            />
          </div>
        </div>

        {/* Reset */}
        <div className="border-t border-ide-border pt-4">
          <button
            onClick={() => {
              setTheme('dark');
              updateSettings({
                fontSize: 14,
                lineNumbers: true,
                minimap: true,
                wordWrap: true,
                soundEffects: false,
              });
            }}
            className="w-full py-1.5 px-3 rounded border border-ide-border hover:bg-ide-tabHover text-ide-muted hover:text-white flex items-center justify-center space-x-1.5 transition-colors font-mono"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};
