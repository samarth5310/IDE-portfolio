import React from 'react';
import { 
  Search, 
  PanelLeft, 
  Bot, 
  Terminal,
  Sparkles,
  Menu
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

export const TitleBar: React.FC = () => {
  const { 
    openCommandPalette, 
    toggleSidebar, 
    toggleBottomPanel, 
    activeSidebar, 
    isSidebarOpen,
    isBottomPanelOpen,
    isMobile
  } = useWorkspace();

  return (
    <header className="h-9 w-full bg-ide-activity border-b border-ide-border flex items-center justify-between px-2 sm:px-3 text-xs select-none z-30 shrink-0">
      {/* Left: Window Controls & App Title / Menu */}
      <div className="flex items-center space-x-2">
        {/* Mobile menu trigger */}
        {isMobile && (
          <button
            onClick={() => toggleSidebar('explorer')}
            className="p-1 rounded hover:bg-ide-tabHover text-ide-muted hover:text-white"
            title="Open Explorer Drawer"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        {/* Window controls (macOS style dots) */}
        <div className="hidden sm:flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] cursor-pointer hover:opacity-80 transition-opacity" title="Close" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] cursor-pointer hover:opacity-80 transition-opacity" title="Minimize" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] cursor-pointer hover:opacity-80 transition-opacity" title="Maximize" />
        </div>

        {/* Menu Bar items (Desktop) */}
        <nav className="hidden md:flex items-center space-x-1 text-ide-muted font-normal pl-2">
          <button onClick={() => toggleSidebar('explorer')} className="px-2 py-0.5 rounded hover:bg-ide-tabHover hover:text-ide-text transition-colors">
            File
          </button>
          <button onClick={() => openCommandPalette('commands')} className="px-2 py-0.5 rounded hover:bg-ide-tabHover hover:text-ide-text transition-colors">
            Edit
          </button>
          <button onClick={() => openCommandPalette('files')} className="px-2 py-0.5 rounded hover:bg-ide-tabHover hover:text-ide-text transition-colors">
            Go
          </button>
          <button onClick={() => toggleBottomPanel('terminal')} className="px-2 py-0.5 rounded hover:bg-ide-tabHover hover:text-ide-text transition-colors">
            Terminal
          </button>
          <button onClick={() => toggleSidebar('chat')} className="px-2 py-0.5 rounded hover:bg-ide-tabHover hover:text-ide-text transition-colors flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>AI Assistant</span>
          </button>
        </nav>
      </div>

      {/* Center: Command Palette / Search Trigger */}
      <div className="flex-1 max-w-md mx-2 sm:mx-4">
        <button
          onClick={() => openCommandPalette('files')}
          className="w-full flex items-center justify-between px-2.5 py-1 bg-ide-panel hover:bg-ide-tabHover border border-ide-border rounded text-ide-muted hover:text-ide-text transition-all shadow-sm group"
          title="Search files or commands (Ctrl+P / Ctrl+Shift+P)"
        >
          <div className="flex items-center space-x-2 truncate">
            <Search className="w-3.5 h-3.5 text-ide-muted group-hover:text-ide-accent transition-colors shrink-0" />
            <span className="truncate text-[11px] font-mono">
              {isMobile ? "samarth.portfolio [Search]" : "samarth-kulkarni — portfolio [Ctrl+P to search]"}
            </span>
          </div>
          <span className="hidden sm:inline-block text-[10px] bg-ide-bg px-1.5 py-0.2 rounded border border-ide-border text-ide-muted font-mono">
            Ctrl + P
          </span>
        </button>
      </div>

      {/* Right: Layout actions & Quick Links */}
      <div className="flex items-center space-x-1">
        <button
          onClick={() => toggleSidebar('chat')}
          className={`p-1.5 rounded transition-colors ${
            activeSidebar === 'chat' && isSidebarOpen
              ? 'bg-ide-accent/20 text-ide-accent'
              : 'text-ide-muted hover:text-ide-text hover:bg-ide-tabHover'
          }`}
          title="Toggle AI Chat"
        >
          <Bot className="w-4 h-4" />
        </button>

        <button
          onClick={() => toggleBottomPanel('terminal')}
          className={`p-1.5 rounded transition-colors ${
            isBottomPanelOpen
              ? 'bg-ide-accent/20 text-ide-accent'
              : 'text-ide-muted hover:text-ide-text hover:bg-ide-tabHover'
          }`}
          title="Toggle Terminal"
        >
          <Terminal className="w-4 h-4" />
        </button>

        <button
          onClick={() => toggleSidebar('explorer')}
          className={`hidden md:flex p-1.5 rounded transition-colors ${
            isSidebarOpen
              ? 'text-ide-text hover:bg-ide-tabHover'
              : 'text-ide-muted hover:text-ide-text hover:bg-ide-tabHover'
          }`}
          title="Toggle Sidebar (Ctrl+B)"
        >
          <PanelLeft className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
