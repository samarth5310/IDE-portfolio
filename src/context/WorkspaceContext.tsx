import React, { createContext, useContext, useState, useEffect } from 'react';
import { VirtualFile, ActiveSidebarTab, ActiveBottomTab } from '../types/portfolio';
import { virtualFiles, fileMap } from '../data/virtualFiles';

interface WorkspaceContextType {
  openFiles: VirtualFile[];
  activeFileId: string | null;
  activeFile: VirtualFile | null;
  activeSidebar: ActiveSidebarTab;
  isSidebarOpen: boolean;
  isBottomPanelOpen: boolean;
  activeBottomTab: ActiveBottomTab;
  isCommandPaletteOpen: boolean;
  commandPaletteMode: 'commands' | 'files';
  isBootComplete: boolean;
  cursorPosition: { line: number; col: number };
  isMobile: boolean;
  openFile: (fileIdOrName: string) => void;
  closeFile: (fileId: string) => void;
  closeAllFiles: () => void;
  setActiveFileId: (fileId: string) => void;
  toggleSidebar: (tab?: ActiveSidebarTab) => void;
  closeSidebar: () => void;
  toggleBottomPanel: (tab?: ActiveBottomTab) => void;
  setIsBottomPanelOpen: (open: boolean) => void;
  setActiveBottomTab: (tab: ActiveBottomTab) => void;
  openCommandPalette: (mode?: 'commands' | 'files') => void;
  closeCommandPalette: () => void;
  setBootComplete: (complete: boolean) => void;
  setCursorPosition: (pos: { line: number; col: number }) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  });

  const [openFiles, setOpenFiles] = useState<VirtualFile[]>([]);
  const [activeFileId, setActiveFileIdState] = useState<string | null>(null);
  const [activeSidebar, setActiveSidebar] = useState<ActiveSidebarTab>('explorer');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth >= 768 : true;
  });
  const [isBottomPanelOpen, setIsBottomPanelOpen] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth >= 1024 : false;
  });
  const [activeBottomTab, setActiveBottomTab] = useState<ActiveBottomTab>('terminal');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [commandPaletteMode, setCommandPaletteMode] = useState<'commands' | 'files'>('commands');
  const [isBootComplete, setBootComplete] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<{ line: number; col: number }>({ line: 1, col: 1 });

  // Update mobile status on resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeFile = activeFileId ? fileMap.get(activeFileId) || null : null;

  const openFile = (fileIdOrName: string) => {
    let targetFile = fileMap.get(fileIdOrName);
    if (!targetFile) {
      // Try searching by name
      const normalized = fileIdOrName.toLowerCase().trim();
      targetFile = virtualFiles.find(
        (f) =>
          f.name.toLowerCase() === normalized ||
          f.id.toLowerCase() === normalized ||
          f.name.toLowerCase() === `${normalized}.md` ||
          f.name.toLowerCase() === `${normalized}.tsx` ||
          f.name.toLowerCase() === `${normalized}.json` ||
          f.name.toLowerCase() === `${normalized}.pdf`
      );
    }

    if (!targetFile) return;

    if (!openFiles.some((f) => f.id === targetFile!.id)) {
      setOpenFiles((prev) => [...prev, targetFile!]);
    }
    setActiveFileIdState(targetFile.id);

    // On mobile, close sidebar automatically when opening a file
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const closeFile = (fileId: string) => {
    setOpenFiles((prev) => {
      const remaining = prev.filter((f) => f.id !== fileId);
      if (activeFileId === fileId) {
        if (remaining.length > 0) {
          const index = prev.findIndex((f) => f.id === fileId);
          const nextActive = remaining[Math.min(index, remaining.length - 1)];
          setActiveFileIdState(nextActive.id);
        } else {
          setActiveFileIdState(null);
        }
      }
      return remaining;
    });
  };

  const closeAllFiles = () => {
    setOpenFiles([]);
    setActiveFileIdState(null);
  };

  const setActiveFileId = (fileId: string) => {
    setActiveFileIdState(fileId);
  };

  const toggleSidebar = (tab?: ActiveSidebarTab) => {
    if (tab) {
      if (activeSidebar === tab && isSidebarOpen) {
        setIsSidebarOpen(false);
      } else {
        setActiveSidebar(tab);
        setIsSidebarOpen(true);
      }
    } else {
      setIsSidebarOpen((prev) => !prev);
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleBottomPanel = (tab?: ActiveBottomTab) => {
    if (tab) {
      if (activeBottomTab === tab && isBottomPanelOpen) {
        setIsBottomPanelOpen(false);
      } else {
        setActiveBottomTab(tab);
        setIsBottomPanelOpen(true);
      }
    } else {
      setIsBottomPanelOpen((prev) => !prev);
    }
  };

  const openCommandPalette = (mode: 'commands' | 'files' = 'commands') => {
    setCommandPaletteMode(mode);
    setIsCommandPaletteOpen(true);
  };

  const closeCommandPalette = () => {
    setIsCommandPaletteOpen(false);
  };

  // Close command palette on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        closeCommandPalette();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen]);

  return (
    <WorkspaceContext.Provider
      value={{
        openFiles,
        activeFileId,
        activeFile,
        activeSidebar,
        isSidebarOpen,
        isBottomPanelOpen,
        activeBottomTab,
        isCommandPaletteOpen,
        commandPaletteMode,
        isBootComplete,
        cursorPosition,
        isMobile,
        openFile,
        closeFile,
        closeAllFiles,
        setActiveFileId,
        toggleSidebar,
        closeSidebar,
        toggleBottomPanel,
        setIsBottomPanelOpen,
        setActiveBottomTab,
        openCommandPalette,
        closeCommandPalette,
        setBootComplete,
        setCursorPosition,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
