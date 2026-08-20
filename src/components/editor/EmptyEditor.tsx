import React from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { KinematicArm } from '../ui/KinematicArm';

export const EmptyEditor: React.FC = () => {
  const { openCommandPalette, toggleSidebar, toggleBottomPanel, openFile } = useWorkspace();

  return (
    <div className="h-full w-full bg-ide-editor flex flex-col items-center justify-center p-6 text-center select-none animate-fade-in overflow-y-auto">
      <div className="max-w-md space-y-5 flex flex-col items-center">
        {/* Interactive Center Kinematic Arm */}
        <div className="p-3 bg-ide-sidebar/60 border border-ide-border rounded-2xl shadow-xl flex items-center justify-center">
          <KinematicArm size={200} isFloating={false} />
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white font-mono">Samarth's Portfolio IDE</h2>
          <p className="text-xs text-ide-muted font-mono">
            Interactive 2-bone inverse kinematics engine. Move mouse to steer.
          </p>
        </div>

        {/* Quick File Launch Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <button
            onClick={() => openFile('readme-md')}
            className="px-2.5 py-1 rounded bg-ide-panel hover:bg-ide-tabHover border border-ide-border text-xs text-ide-text flex items-center space-x-1.5 transition-colors font-mono"
          >
            <span>README.md</span>
          </button>
          <button
            onClick={() => openFile('about-md')}
            className="px-2.5 py-1 rounded bg-ide-panel hover:bg-ide-tabHover border border-ide-border text-xs text-ide-text flex items-center space-x-1.5 transition-colors font-mono"
          >
            <span>about.md</span>
          </button>
          <button
            onClick={() => openFile('projects-tsx')}
            className="px-2.5 py-1 rounded bg-ide-panel hover:bg-ide-tabHover border border-ide-border text-xs text-ide-text flex items-center space-x-1.5 transition-colors font-mono"
          >
            <span>projects.tsx</span>
          </button>
          <button
            onClick={() => openFile('skills-json')}
            className="px-2.5 py-1 rounded bg-ide-panel hover:bg-ide-tabHover border border-ide-border text-xs text-ide-text flex items-center space-x-1.5 transition-colors font-mono"
          >
            <span>skills.json</span>
          </button>
        </div>

        {/* Shortcuts Matrix */}
        <div className="w-full bg-ide-panel/60 border border-ide-border rounded-lg p-3.5 space-y-2 text-xs text-left">
          <div
            onClick={() => openCommandPalette('files')}
            className="flex items-center justify-between cursor-pointer hover:text-white transition-colors"
          >
            <span className="text-ide-muted font-mono">Quick Open File</span>
            <kbd className="bg-ide-bg px-2 py-0.5 rounded border border-ide-border font-mono text-[11px] text-ide-accent">
              Ctrl + P
            </kbd>
          </div>

          <div
            onClick={() => openCommandPalette('commands')}
            className="flex items-center justify-between cursor-pointer hover:text-white transition-colors"
          >
            <span className="text-ide-muted font-mono">Command Palette</span>
            <kbd className="bg-ide-bg px-2 py-0.5 rounded border border-ide-border font-mono text-[11px] text-ide-accent">
              Ctrl + Shift + P
            </kbd>
          </div>

          <div
            onClick={() => toggleBottomPanel('terminal')}
            className="flex items-center justify-between cursor-pointer hover:text-white transition-colors"
          >
            <span className="text-ide-muted font-mono">Toggle Terminal</span>
            <kbd className="bg-ide-bg px-2 py-0.5 rounded border border-ide-border font-mono text-[11px] text-ide-accent">
              Ctrl + `
            </kbd>
          </div>

          <div
            onClick={() => toggleSidebar()}
            className="flex items-center justify-between cursor-pointer hover:text-white transition-colors"
          >
            <span className="text-ide-muted font-mono">Toggle Sidebar</span>
            <kbd className="bg-ide-bg px-2 py-0.5 rounded border border-ide-border font-mono text-[11px] text-ide-accent">
              Ctrl + B
            </kbd>
          </div>
        </div>
      </div>
    </div>
  );
};
