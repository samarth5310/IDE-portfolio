import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  FileText, 
  Code, 
  Braces, 
  File, 
  Folder, 
  FolderOpen, 
  MoreHorizontal,
  RefreshCw,
  X
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { virtualFiles } from '../../data/virtualFiles';
import { VirtualFile } from '../../types/portfolio';

export const Explorer: React.FC = () => {
  const { openFiles, activeFileId, openFile, closeSidebar } = useWorkspace();
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(true);
  const [isAssetsOpen, setIsAssetsOpen] = useState(false);
  const [isOutlineOpen, setIsOutlineOpen] = useState(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  const getFileIcon = (file: VirtualFile) => {
    switch (file.type) {
      case 'markdown':
        return <FileText className="w-4 h-4 text-blue-400 shrink-0" />;
      case 'typescript':
        return <Code className="w-4 h-4 text-cyan-400 shrink-0" />;
      case 'json':
        return <Braces className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'pdf':
        return <File className="w-4 h-4 text-red-400 shrink-0" />;
      default:
        return <FileText className="w-4 h-4 text-neutral-400 shrink-0" />;
    }
  };

  return (
    <div className="h-full w-full bg-ide-sidebar flex flex-col select-none text-xs text-ide-text">
      {/* Explorer Top Header */}
      <div className="h-9 px-3 flex items-center justify-between font-semibold tracking-wider text-ide-muted text-[11px] border-b border-ide-border shrink-0">
        <span className="font-mono">EXPLORER</span>
        <div className="flex items-center space-x-1 text-ide-muted">
          <button className="p-1 hover:text-ide-text rounded" title="Refresh Explorer">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
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

      {/* Main File Tree Area */}
      <div className="flex-1 overflow-y-auto py-1">
        {/* Section: PORTFOLIO */}
        <div className="mb-2">
          <div 
            onClick={() => setIsPortfolioOpen(!isPortfolioOpen)}
            className="flex items-center px-2 py-1.5 cursor-pointer font-bold text-[11px] text-ide-muted hover:text-ide-text tracking-wide group font-mono"
          >
            {isPortfolioOpen ? (
              <ChevronDown className="w-3.5 h-3.5 mr-1 group-hover:text-ide-text" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 mr-1 group-hover:text-ide-text" />
            )}
            <span>PORTFOLIO</span>
          </div>

          {isPortfolioOpen && (
            <div className="pl-2">
              {/* Root folder: portfolio/ */}
              <div className="flex items-center px-2 py-1 text-ide-text font-medium font-mono">
                <FolderOpen className="w-4 h-4 text-blue-400 mr-1.5 shrink-0" />
                <span>portfolio/</span>
              </div>

              {/* Files in portfolio/ */}
              <div className="pl-3 space-y-0.5">
                {virtualFiles.map((file) => {
                  const isActive = activeFileId === file.id;
                  const isOpen = openFiles.some((f) => f.id === file.id);

                  return (
                    <div
                      key={file.id}
                      onClick={() => openFile(file.id)}
                      className={`flex items-center px-2 py-1.5 cursor-pointer rounded-sm group transition-colors font-mono ${
                        isActive
                          ? 'bg-ide-selection text-white font-semibold'
                          : 'hover:bg-ide-tabHover text-ide-text'
                      }`}
                    >
                      <div className="mr-2">{getFileIcon(file)}</div>
                      <span className="truncate flex-1 text-xs">{file.name}</span>
                      {isOpen && !isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-ide-muted/50 ml-1" title="Open in editor" />
                      )}
                    </div>
                  );
                })}

                {/* Subfolder: assets/ */}
                <div className="mt-1">
                  <div
                    onClick={() => setIsAssetsOpen(!isAssetsOpen)}
                    className="flex items-center px-2 py-1 cursor-pointer hover:bg-ide-tabHover rounded-sm text-ide-muted hover:text-ide-text font-mono"
                  >
                    {isAssetsOpen ? (
                      <ChevronDown className="w-3.5 h-3.5 mr-1" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 mr-1" />
                    )}
                    {isAssetsOpen ? (
                      <FolderOpen className="w-4 h-4 text-amber-400/80 mr-1.5 shrink-0" />
                    ) : (
                      <Folder className="w-4 h-4 text-amber-400/80 mr-1.5 shrink-0" />
                    )}
                    <span>assets/</span>
                  </div>

                  {isAssetsOpen && (
                    <div className="pl-5 text-ide-muted space-y-1 py-1 font-mono">
                      <div className="flex items-center px-2 py-0.5 text-[11px] opacity-75">
                        <File className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
                        <span>profile.jpg</span>
                      </div>
                      <div className="flex items-center px-2 py-0.5 text-[11px] opacity-75">
                        <Folder className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                        <span>projects/</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section: OUTLINE (VS Code style) */}
        <div className="border-t border-ide-border">
          <div
            onClick={() => setIsOutlineOpen(!isOutlineOpen)}
            className="flex items-center px-2 py-1.5 cursor-pointer text-[11px] font-bold text-ide-muted hover:text-ide-text tracking-wide font-mono"
          >
            {isOutlineOpen ? (
              <ChevronDown className="w-3.5 h-3.5 mr-1" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 mr-1" />
            )}
            <span>OUTLINE</span>
          </div>
          {isOutlineOpen && (
            <div className="px-4 py-2 text-[11px] text-ide-muted space-y-1 font-mono">
              <div># Samarth Kulkarni</div>
              <div className="pl-2">## About Me</div>
              <div className="pl-2">## What I Do</div>
              <div className="pl-2">## Current Focus</div>
              <div className="pl-2">## Career Goal</div>
            </div>
          )}
        </div>

        {/* Section: TIMELINE (VS Code style) */}
        <div className="border-t border-ide-border">
          <div
            onClick={() => setIsTimelineOpen(!isTimelineOpen)}
            className="flex items-center px-2 py-1.5 cursor-pointer text-[11px] font-bold text-ide-muted hover:text-ide-text tracking-wide font-mono"
          >
            {isTimelineOpen ? (
              <ChevronDown className="w-3.5 h-3.5 mr-1" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 mr-1" />
            )}
            <span>TIMELINE</span>
          </div>
          {isTimelineOpen && (
            <div className="px-4 py-2 text-[11px] text-ide-muted font-mono">
              <div>Git: Initial commit & portfolio initialization</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
