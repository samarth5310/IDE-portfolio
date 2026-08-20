import React from 'react';
import { X, FileText, Code, Braces, File, SplitSquareVertical } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { VirtualFile } from '../../types/portfolio';

export const EditorTabs: React.FC = () => {
  const { openFiles, activeFileId, setActiveFileId, closeFile, closeAllFiles } = useWorkspace();

  const getFileIcon = (file: VirtualFile) => {
    switch (file.type) {
      case 'markdown':
        return <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
      case 'typescript':
        return <Code className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
      case 'json':
        return <Braces className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
      case 'pdf':
        return <File className="w-3.5 h-3.5 text-red-400 shrink-0" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-neutral-400 shrink-0" />;
    }
  };

  if (openFiles.length === 0) return null;

  return (
    <div className="h-9 w-full bg-ide-tabInactive border-b border-ide-border flex items-center justify-between select-none overflow-x-auto z-10 shrink-0">
      {/* Tabs Container */}
      <div className="flex items-center h-full overflow-x-auto no-scrollbar flex-1 touch-pan-x">
        {openFiles.map((file) => {
          const isActive = activeFileId === file.id;

          return (
            <div
              key={file.id}
              onClick={() => setActiveFileId(file.id)}
              className={`h-full flex items-center px-2.5 sm:px-3 space-x-1.5 sm:space-x-2 border-r border-ide-border cursor-pointer group shrink-0 transition-colors text-xs font-mono ${
                isActive
                  ? 'bg-ide-tabActive text-white border-t-2 border-t-ide-accent font-medium'
                  : 'bg-ide-tabInactive text-ide-muted hover:bg-ide-tabHover hover:text-ide-text'
              }`}
            >
              <div>{getFileIcon(file)}</div>
              <span className="truncate max-w-[100px] sm:max-w-[140px] text-[11px] sm:text-xs">{file.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeFile(file.id);
                }}
                className="p-1 rounded-sm hover:bg-black/20 text-ide-muted hover:text-white opacity-70 group-hover:opacity-100 transition-opacity"
                title="Close tab"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Tab controls */}
      <div className="flex items-center px-1.5 sm:px-2 space-x-1 text-ide-muted shrink-0">
        <button
          onClick={closeAllFiles}
          className="p-1 hover:text-ide-text rounded hover:bg-ide-tabHover"
          title="Close All Tabs"
        >
          <X className="w-3.5 h-3.5" />
        </button>
        <button
          className="hidden sm:flex p-1 hover:text-ide-text rounded hover:bg-ide-tabHover"
          title="Split Editor Right"
        >
          <SplitSquareVertical className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
