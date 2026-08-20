import React from 'react';
import { 
  GitBranch, 
  RefreshCw, 
  XCircle, 
  AlertTriangle, 
  Bot, 
  Check
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

export const StatusBar: React.FC = () => {
  const { 
    activeFile, 
    cursorPosition, 
    toggleBottomPanel,
    toggleSidebar
  } = useWorkspace();

  return (
    <footer className="h-6 w-full bg-ide-status text-white flex items-center justify-between px-2 text-[11px] select-none z-30 shrink-0">
      {/* Left items */}
      <div className="flex items-center space-x-3">
        {/* Branch */}
        <button 
          onClick={() => toggleSidebar('git')}
          className="flex items-center space-x-1 hover:bg-black/20 px-1.5 py-0.5 rounded transition-colors"
          title="Git: main branch"
        >
          <GitBranch className="w-3 h-3" />
          <span className="font-medium">main*</span>
        </button>

        {/* Sync */}
        <button 
          className="flex items-center space-x-1 hover:bg-black/20 px-1.5 py-0.5 rounded transition-colors"
          title="Synchronized with GitHub"
        >
          <RefreshCw className="w-2.5 h-2.5" />
        </button>

        {/* Problems Counter */}
        <button 
          onClick={() => toggleBottomPanel('problems')}
          className="flex items-center space-x-1 hover:bg-black/20 px-1.5 py-0.5 rounded transition-colors"
          title="0 Errors, 0 Warnings"
        >
          <XCircle className="w-3 h-3 text-white/90" />
          <span>0</span>
          <AlertTriangle className="w-3 h-3 text-white/90" />
          <span>0</span>
        </button>

        {/* Workspace status */}
        <div className="hidden sm:flex items-center space-x-1 text-white/80">
          <Check className="w-3 h-3 text-emerald-300" />
          <span>Workspace Ready</span>
        </div>
      </div>

      {/* Right items */}
      <div className="flex items-center space-x-3">
        {/* Line & Column */}
        <div className="hidden sm:block text-white/90">
          Ln {cursorPosition.line}, Col {cursorPosition.col}
        </div>

        {/* Spaces */}
        <div className="hidden md:block text-white/80">
          Spaces: 2
        </div>

        {/* Encoding */}
        <div className="hidden md:block text-white/80">
          UTF-8
        </div>

        {/* Line Endings */}
        <div className="hidden lg:block text-white/80">
          LF
        </div>

        {/* Language Mode */}
        <button
          className="hover:bg-black/20 px-1.5 py-0.5 rounded transition-colors font-medium"
          title="Select Language Mode"
        >
          {activeFile ? activeFile.language : 'Plain Text'}
        </button>

        {/* AI Assistant status */}
        <button 
          onClick={() => toggleSidebar('chat')}
          className="flex items-center space-x-1 hover:bg-black/20 px-1.5 py-0.5 rounded transition-colors text-emerald-200"
          title="Portfolio AI Assistant is active"
        >
          <Bot className="w-3 h-3" />
          <span className="hidden sm:inline">AI Online</span>
        </button>
      </div>
    </footer>
  );
};
