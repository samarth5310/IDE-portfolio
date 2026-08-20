import React, { useState } from 'react';
import { 
  Terminal as TermIcon, 
  XCircle, 
  FileText, 
  Bug, 
  X, 
  Maximize2, 
  Minimize2
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { ActiveBottomTab } from '../../types/portfolio';
import { Terminal } from './Terminal';
import { ProblemsPanel } from './ProblemsPanel';
import { OutputPanel } from './OutputPanel';
import { DebugConsole } from './DebugConsole';

export const BottomPanel: React.FC = () => {
  const { 
    isBottomPanelOpen, 
    setIsBottomPanelOpen, 
    activeBottomTab, 
    setActiveBottomTab 
  } = useWorkspace();

  const [isMaximized, setIsMaximized] = useState(false);

  if (!isBottomPanelOpen) return null;

  const tabs: { id: ActiveBottomTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'terminal', label: 'TERMINAL', icon: <TermIcon className="w-3.5 h-3.5" /> },
    { id: 'problems', label: 'PROBLEMS', icon: <XCircle className="w-3.5 h-3.5" />, badge: '0' },
    { id: 'output', label: 'OUTPUT', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'debugConsole', label: 'DEBUG', icon: <Bug className="w-3.5 h-3.5" /> },
  ];

  return (
    <div 
      className={`w-full bg-ide-panel border-t border-ide-border flex flex-col select-none transition-all duration-200 z-30 shrink-0 ${
        isMaximized ? 'h-[80vh]' : 'h-64 sm:h-56'
      }`}
    >
      {/* Panel Top Tab Bar */}
      <div className="h-8 bg-ide-panel border-b border-ide-border px-2 sm:px-3 flex items-center justify-between text-xs shrink-0 overflow-x-auto">
        {/* Left tabs */}
        <div className="flex items-center space-x-1 sm:space-x-3 h-full overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeBottomTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveBottomTab(tab.id)}
                className={`h-full flex items-center space-x-1 px-2 tracking-wider text-[10px] sm:text-[11px] font-mono font-semibold transition-colors shrink-0 ${
                  isActive
                    ? 'text-white border-b-2 border-ide-accent font-bold'
                    : 'text-ide-muted hover:text-ide-text'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="text-[9px] bg-ide-border px-1 rounded-full text-ide-muted">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right action controls */}
        <div className="flex items-center space-x-1 text-ide-muted shrink-0 pl-2">
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1 hover:text-ide-text rounded hover:bg-ide-tabHover"
            title={isMaximized ? "Restore Panel Size" : "Maximize Panel Size"}
          >
            {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsBottomPanelOpen(false)}
            className="p-1 hover:text-ide-text rounded hover:bg-ide-tabHover"
            title="Close Panel"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="flex-1 overflow-hidden">
        {activeBottomTab === 'terminal' && <Terminal />}
        {activeBottomTab === 'problems' && <ProblemsPanel />}
        {activeBottomTab === 'output' && <OutputPanel />}
        {activeBottomTab === 'debugConsole' && <DebugConsole />}
      </div>
    </div>
  );
};
