import React from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { KinematicArm } from '../ui/KinematicArm';

export const EmptyEditor: React.FC = () => {
  const { openCommandPalette, toggleSidebar, toggleBottomPanel, openFile } = useWorkspace();

  return (
    <div className="w-full h-full min-h-[460px] bg-ide-editor flex flex-col items-center justify-center p-4 sm:p-8 text-center select-none animate-fade-in overflow-y-auto">
      <div className="flex flex-col items-center justify-center space-y-6 max-w-lg w-full">
        {/* Exact Centered Circular Interactive Kinematic Arm */}
        <div className="relative flex items-center justify-center p-3 rounded-full bg-black/50 border border-neutral-800/80 shadow-2xl">
          <KinematicArm size={260} />
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5 text-center">
          <h1 className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">
            Samarth Kulkarni
          </h1>
          <p className="text-xs text-ide-muted font-mono max-w-sm">
            Interactive IDE Portfolio • Computer Science Engineer
          </p>
        </div>

        {/* Quick Launch File Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-md">
          <button
            onClick={() => openFile('readme-md')}
            className="px-3 py-1.5 rounded bg-ide-panel hover:bg-ide-tabHover border border-ide-border hover:border-ide-accent text-xs text-ide-text hover:text-white flex items-center space-x-1.5 transition-all font-mono shadow-sm"
          >
            <span className="text-blue-400 font-bold">#</span>
            <span>README.md</span>
          </button>
          <button
            onClick={() => openFile('projects-tsx')}
            className="px-3 py-1.5 rounded bg-ide-panel hover:bg-ide-tabHover border border-ide-border hover:border-ide-accent text-xs text-ide-text hover:text-white flex items-center space-x-1.5 transition-all font-mono shadow-sm"
          >
            <span className="text-cyan-400 font-bold">⚛</span>
            <span>projects.tsx</span>
          </button>
          <button
            onClick={() => openFile('skills-json')}
            className="px-3 py-1.5 rounded bg-ide-panel hover:bg-ide-tabHover border border-ide-border hover:border-ide-accent text-xs text-ide-text hover:text-white flex items-center space-x-1.5 transition-all font-mono shadow-sm"
          >
            <span className="text-amber-400 font-bold">{'{ }'}</span>
            <span>skills.json</span>
          </button>
          <button
            onClick={() => openFile('contact-tsx')}
            className="px-3 py-1.5 rounded bg-ide-panel hover:bg-ide-tabHover border border-ide-border hover:border-ide-accent text-xs text-ide-text hover:text-white flex items-center space-x-1.5 transition-all font-mono shadow-sm"
          >
            <span className="text-emerald-400 font-bold">✉</span>
            <span>contact.tsx</span>
          </button>
          <button
            onClick={() => openFile('resume-pdf')}
            className="px-3 py-1.5 rounded bg-ide-panel hover:bg-ide-tabHover border border-ide-border hover:border-ide-accent text-xs text-ide-text hover:text-white flex items-center space-x-1.5 transition-all font-mono shadow-sm"
          >
            <span className="text-red-400 font-bold">📄</span>
            <span>resume.pdf</span>
          </button>
        </div>

        {/* Shortcuts Helper Bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-ide-muted font-mono pt-1">
          <button
            onClick={() => openCommandPalette('files')}
            className="hover:text-white flex items-center space-x-1 transition-colors"
          >
            <span>Search files:</span>
            <kbd className="bg-ide-panel px-1.5 py-0.5 rounded border border-ide-border text-ide-accent">Ctrl+P</kbd>
          </button>
          <button
            onClick={() => toggleBottomPanel('terminal')}
            className="hover:text-white flex items-center space-x-1 transition-colors"
          >
            <span>Terminal:</span>
            <kbd className="bg-ide-panel px-1.5 py-0.5 rounded border border-ide-border text-ide-accent">Ctrl+`</kbd>
          </button>
          <button
            onClick={() => toggleSidebar()}
            className="hover:text-white flex items-center space-x-1 transition-colors"
          >
            <span>Sidebar:</span>
            <kbd className="bg-ide-panel px-1.5 py-0.5 rounded border border-ide-border text-ide-accent">Ctrl+B</kbd>
          </button>
        </div>
      </div>
    </div>
  );
};
