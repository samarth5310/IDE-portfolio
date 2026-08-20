import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  FileText, 
  Code, 
  Braces, 
  Terminal, 
  Bot, 
  Moon, 
  Sun, 
  Palette, 
  Download, 
  Github, 
  Linkedin, 
  Sparkles, 
  X 
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useTheme } from '../../context/ThemeContext';
import { virtualFiles } from '../../data/virtualFiles';
import { triggerConfetti } from '../ui/Confetti';

interface PaletteItem {
  id: string;
  title: string;
  category: 'Files' | 'Navigation' | 'Theme' | 'Commands' | 'External';
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const { 
    isCommandPaletteOpen, 
    closeCommandPalette, 
    commandPaletteMode, 
    openFile, 
    toggleBottomPanel, 
    toggleSidebar 
  } = useWorkspace();

  const { setTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen, commandPaletteMode]);

  if (!isCommandPaletteOpen) return null;

  const items: PaletteItem[] = [
    // Files
    ...virtualFiles.map((file) => ({
      id: `file-${file.id}`,
      title: `Open ${file.name}`,
      category: 'Files' as const,
      icon: file.type === 'typescript' ? <Code className="w-4 h-4 text-cyan-400" /> : file.type === 'json' ? <Braces className="w-4 h-4 text-amber-400" /> : <FileText className="w-4 h-4 text-blue-400" />,
      action: () => {
        openFile(file.id);
        closeCommandPalette();
      }
    })),

    // Navigation & Views
    {
      id: 'cmd-terminal',
      title: 'View: Toggle Integrated Terminal',
      category: 'Navigation',
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      shortcut: 'Ctrl + `',
      action: () => {
        toggleBottomPanel('terminal');
        closeCommandPalette();
      }
    },
    {
      id: 'cmd-chat',
      title: 'View: Open AI Portfolio Assistant',
      category: 'Navigation',
      icon: <Bot className="w-4 h-4 text-amber-400" />,
      action: () => {
        toggleSidebar('chat');
        closeCommandPalette();
      }
    },
    {
      id: 'cmd-explorer',
      title: 'View: Toggle File Explorer',
      category: 'Navigation',
      icon: <FileText className="w-4 h-4 text-blue-400" />,
      shortcut: 'Ctrl + B',
      action: () => {
        toggleSidebar('explorer');
        closeCommandPalette();
      }
    },
    {
      id: 'cmd-search',
      title: 'View: Search Portfolio',
      category: 'Navigation',
      icon: <Search className="w-4 h-4 text-purple-400" />,
      action: () => {
        toggleSidebar('search');
        closeCommandPalette();
      }
    },

    // Themes
    {
      id: 'theme-dark',
      title: 'Preferences: Color Theme (Dark Modern)',
      category: 'Theme',
      icon: <Moon className="w-4 h-4 text-blue-400" />,
      action: () => {
        setTheme('dark');
        closeCommandPalette();
      }
    },
    {
      id: 'theme-midnight',
      title: 'Preferences: Color Theme (Midnight Blue)',
      category: 'Theme',
      icon: <Palette className="w-4 h-4 text-cyan-400" />,
      action: () => {
        setTheme('midnight');
        closeCommandPalette();
      }
    },
    {
      id: 'theme-monokai',
      title: 'Preferences: Color Theme (Monokai Pro)',
      category: 'Theme',
      icon: <Palette className="w-4 h-4 text-amber-400" />,
      action: () => {
        setTheme('monokai');
        closeCommandPalette();
      }
    },
    {
      id: 'theme-light',
      title: 'Preferences: Color Theme (Light+)',
      category: 'Theme',
      icon: <Sun className="w-4 h-4 text-yellow-500" />,
      action: () => {
        setTheme('light');
        closeCommandPalette();
      }
    },

    // Special Commands
    {
      id: 'cmd-hire',
      title: 'Recruiter: Execute sudo hire samarth',
      category: 'Commands',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      action: () => {
        triggerConfetti();
        toggleBottomPanel('terminal');
        closeCommandPalette();
      }
    },
    {
      id: 'cmd-resume-dl',
      title: 'Portfolio: Download Resume PDF',
      category: 'Commands',
      icon: <Download className="w-4 h-4 text-emerald-400" />,
      action: () => {
        openFile('resume-pdf');
        closeCommandPalette();
      }
    },

    // External
    {
      id: 'ext-github',
      title: 'External: Visit GitHub Profile',
      category: 'External',
      icon: <Github className="w-4 h-4 text-neutral-300" />,
      action: () => {
        window.open('https://github.com/samarth5310', '_blank', 'noopener,noreferrer');
        closeCommandPalette();
      }
    },
    {
      id: 'ext-linkedin',
      title: 'External: Visit LinkedIn Profile',
      category: 'External',
      icon: <Linkedin className="w-4 h-4 text-blue-400" />,
      action: () => {
        window.open('https://www.linkedin.com/in/ksamarth/', '_blank', 'noopener,noreferrer');
        closeCommandPalette();
      }
    }
  ];

  const filteredItems = items.filter((item) => {
    if (commandPaletteMode === 'files') {
      return item.category === 'Files' && item.title.toLowerCase().includes(query.toLowerCase());
    }
    return (
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
  });

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      closeCommandPalette();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-xs flex justify-center items-start pt-[12vh] z-50 p-4 animate-fade-in"
      onClick={closeCommandPalette}
    >
      <div 
        className="w-full max-w-xl bg-ide-sidebar border border-ide-border rounded-lg shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input container */}
        <div className="p-3 border-b border-ide-border flex items-center space-x-2 bg-ide-panel">
          <Search className="w-4 h-4 text-ide-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={onKeyDown}
            placeholder={commandPaletteMode === 'files' ? "Search files by name..." : "> Type a command or file name..."}
            className="flex-1 bg-transparent border-none outline-none text-xs text-white placeholder-ide-muted"
          />
          <button onClick={closeCommandPalette} className="text-ide-muted hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-80 overflow-y-auto p-1.5 space-y-0.5 text-xs">
          {filteredItems.length === 0 ? (
            <div className="p-4 text-center text-ide-muted text-xs">
              No matching commands or files found.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-ide-accent text-white font-medium'
                      : 'text-ide-text hover:bg-ide-tabHover'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <div className="shrink-0">{item.icon}</div>
                    <span className="truncate">{item.title}</span>
                  </div>

                  {item.shortcut && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-ide-bg text-ide-muted border border-ide-border'
                    }`}>
                      {item.shortcut}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer tip */}
        <div className="px-3 py-1.5 bg-ide-panel border-t border-ide-border text-[10px] text-ide-muted flex justify-between items-center select-none">
          <span>Navigate with ↑ ↓ • Press Enter to select • Esc to close</span>
          <span>Samarth Kulkarni IDE</span>
        </div>
      </div>
    </div>
  );
};
