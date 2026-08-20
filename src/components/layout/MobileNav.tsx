import React from 'react';
import { Files, Search, Terminal, Bot, Settings, GitBranch } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useTheme } from '../../context/ThemeContext';

export const MobileNav: React.FC = () => {
  const { 
    activeSidebar, 
    isSidebarOpen, 
    toggleSidebar, 
    toggleBottomPanel,
    isBottomPanelOpen
  } = useWorkspace();

  const { playKeySound } = useTheme();

  const handleNavClick = (action: () => void) => {
    playKeySound();
    action();
  };

  return (
    <nav aria-label="Mobile Navigation" className="md:hidden h-14 w-full bg-ide-activity border-t border-ide-border flex items-center justify-around px-1 text-xs select-none z-40 shrink-0 shadow-lg">
      {/* Files / Explorer */}
      <button
        onClick={() => handleNavClick(() => toggleSidebar('explorer'))}
        className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded transition-colors ${
          isSidebarOpen && activeSidebar === 'explorer'
            ? 'text-ide-accent font-bold border-t-2 border-ide-accent bg-ide-tabHover/50'
            : 'text-ide-muted hover:text-ide-text'
        }`}
      >
        <Files className="w-4 h-4 mb-0.5" />
        <span className="text-[10px] font-mono">Files</span>
      </button>

      {/* Search */}
      <button
        onClick={() => handleNavClick(() => toggleSidebar('search'))}
        className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded transition-colors ${
          isSidebarOpen && activeSidebar === 'search'
            ? 'text-ide-accent font-bold border-t-2 border-ide-accent bg-ide-tabHover/50'
            : 'text-ide-muted hover:text-ide-text'
        }`}
      >
        <Search className="w-4 h-4 mb-0.5" />
        <span className="text-[10px] font-mono">Search</span>
      </button>

      {/* Terminal */}
      <button
        onClick={() => handleNavClick(() => toggleBottomPanel('terminal'))}
        className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded transition-colors ${
          isBottomPanelOpen
            ? 'text-ide-accent font-bold border-t-2 border-ide-accent bg-ide-tabHover/50'
            : 'text-ide-muted hover:text-ide-text'
        }`}
      >
        <Terminal className="w-4 h-4 mb-0.5" />
        <span className="text-[10px] font-mono">Terminal</span>
      </button>

      {/* AI Chat */}
      <button
        onClick={() => handleNavClick(() => toggleSidebar('chat'))}
        className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded transition-colors ${
          isSidebarOpen && activeSidebar === 'chat'
            ? 'text-ide-accent font-bold border-t-2 border-ide-accent bg-ide-tabHover/50'
            : 'text-ide-muted hover:text-ide-text'
        }`}
      >
        <Bot className="w-4 h-4 mb-0.5" />
        <span className="text-[10px] font-mono">AI Chat</span>
      </button>

      {/* Git */}
      <button
        onClick={() => handleNavClick(() => toggleSidebar('git'))}
        className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded transition-colors ${
          isSidebarOpen && activeSidebar === 'git'
            ? 'text-ide-accent font-bold border-t-2 border-ide-accent bg-ide-tabHover/50'
            : 'text-ide-muted hover:text-ide-text'
        }`}
      >
        <GitBranch className="w-4 h-4 mb-0.5" />
        <span className="text-[10px] font-mono">Git</span>
      </button>

      {/* Settings */}
      <button
        onClick={() => handleNavClick(() => toggleSidebar('settings'))}
        className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded transition-colors ${
          isSidebarOpen && activeSidebar === 'settings'
            ? 'text-ide-accent font-bold border-t-2 border-ide-accent bg-ide-tabHover/50'
            : 'text-ide-muted hover:text-ide-text'
        }`}
      >
        <Settings className="w-4 h-4 mb-0.5" />
        <span className="text-[10px] font-mono">Settings</span>
      </button>
    </nav>
  );
};
