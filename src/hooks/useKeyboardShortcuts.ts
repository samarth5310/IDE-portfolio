import { useEffect } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';

export function useKeyboardShortcuts() {
  const {
    openCommandPalette,
    closeCommandPalette,
    isCommandPaletteOpen,
    toggleBottomPanel,
    toggleSidebar,
    closeFile,
    activeFileId
  } = useWorkspace();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl or Meta (Command key on Mac)
      const isCtrlOrMeta = e.ctrlKey || e.metaKey;

      // 1. Ctrl + Shift + P -> Command Palette
      if (isCtrlOrMeta && e.shiftKey && (e.key === 'P' || e.key === 'p')) {
        e.preventDefault();
        openCommandPalette('commands');
        return;
      }

      // 2. Ctrl + P -> Quick File Open
      if (isCtrlOrMeta && !e.shiftKey && (e.key === 'P' || e.key === 'p')) {
        e.preventDefault();
        openCommandPalette('files');
        return;
      }

      // 3. Ctrl + K -> Command Palette
      if (isCtrlOrMeta && (e.key === 'K' || e.key === 'k')) {
        e.preventDefault();
        openCommandPalette('commands');
        return;
      }

      // 4. Ctrl + ` (backtick) -> Toggle Terminal
      if (isCtrlOrMeta && e.key === '`') {
        e.preventDefault();
        toggleBottomPanel('terminal');
        return;
      }

      // 5. Ctrl + B -> Toggle Sidebar
      if (isCtrlOrMeta && (e.key === 'B' || e.key === 'b')) {
        e.preventDefault();
        toggleSidebar();
        return;
      }

      // 6. Ctrl + W -> Close active file tab
      if (isCtrlOrMeta && (e.key === 'W' || e.key === 'w')) {
        e.preventDefault();
        if (activeFileId) {
          closeFile(activeFileId);
        }
        return;
      }

      // 7. Escape -> Close Command Palette
      if (e.key === 'Escape') {
        if (isCommandPaletteOpen) {
          e.preventDefault();
          closeCommandPalette();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    openCommandPalette,
    closeCommandPalette,
    isCommandPaletteOpen,
    toggleBottomPanel,
    toggleSidebar,
    closeFile,
    activeFileId
  ]);
}
