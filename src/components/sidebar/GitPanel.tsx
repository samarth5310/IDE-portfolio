import React, { useState } from 'react';
import { Check, MoreHorizontal, FileText, Code, Braces, X } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { triggerConfetti } from '../ui/Confetti';

export const GitPanel: React.FC = () => {
  const [commitMessage, setCommitMessage] = useState('feat: ready for software engineering internship');
  const [isCommitted, setIsCommitted] = useState(false);
  const { openFile, closeSidebar } = useWorkspace();

  const handleCommit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commitMessage.trim()) return;
    setIsCommitted(true);
    triggerConfetti();
    setTimeout(() => {
      setIsCommitted(false);
    }, 4000);
  };

  return (
    <div className="h-full w-full bg-ide-sidebar flex flex-col select-none text-xs text-ide-text">
      {/* Header */}
      <div className="h-9 px-3 flex items-center justify-between font-semibold tracking-wider text-ide-muted text-[11px] border-b border-ide-border shrink-0">
        <span className="font-mono">SOURCE CONTROL</span>
        <div className="flex items-center space-x-1">
          <button className="p-1 hover:text-ide-text rounded" title="More Actions">
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={closeSidebar} 
            className="md:hidden p-1 hover:text-white rounded text-ide-muted hover:bg-ide-tabHover"
            title="Close Drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Commit Input Area */}
      <div className="p-3 border-b border-ide-border">
        <form onSubmit={handleCommit} className="space-y-2">
          <input
            type="text"
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            placeholder="Message (Ctrl+Enter to commit)"
            className="w-full bg-ide-bg border border-ide-border rounded px-2.5 py-1.5 text-xs text-ide-text placeholder-ide-muted focus:outline-none focus:border-ide-accent font-mono"
          />
          <button
            type="submit"
            className="w-full bg-ide-accent hover:bg-ide-accentHover text-white py-1.5 px-3 rounded font-medium text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-sm font-mono"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Commit & Push</span>
          </button>
        </form>

        {isCommitted && (
          <div className="mt-2 p-2 rounded bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-[11px] flex items-center space-x-1.5 animate-fade-in font-mono">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pushed to <strong>origin/main</strong> successfully!</span>
          </div>
        )}
      </div>

      {/* Changes list */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="text-[11px] font-bold text-ide-muted px-2 py-1 flex items-center justify-between font-mono">
          <span>CHANGES</span>
          <span className="text-[10px] bg-ide-border px-1.5 rounded">3</span>
        </div>

        <div className="space-y-0.5 mt-1">
          <div 
            onClick={() => openFile('about-md')}
            className="flex items-center justify-between px-2 py-1.5 hover:bg-ide-tabHover rounded cursor-pointer group font-mono"
          >
            <div className="flex items-center space-x-2 truncate">
              <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="truncate">about.md</span>
            </div>
            <span className="text-amber-400 font-bold text-[11px]">M</span>
          </div>

          <div 
            onClick={() => openFile('projects-tsx')}
            className="flex items-center justify-between px-2 py-1.5 hover:bg-ide-tabHover rounded cursor-pointer group font-mono"
          >
            <div className="flex items-center space-x-2 truncate">
              <Code className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">projects.tsx</span>
            </div>
            <span className="text-amber-400 font-bold text-[11px]">M</span>
          </div>

          <div 
            onClick={() => openFile('skills-json')}
            className="flex items-center justify-between px-2 py-1.5 hover:bg-ide-tabHover rounded cursor-pointer group font-mono"
          >
            <div className="flex items-center space-x-2 truncate">
              <Braces className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">skills.json</span>
            </div>
            <span className="text-emerald-400 font-bold text-[11px]">A</span>
          </div>
        </div>
      </div>
    </div>
  );
};
