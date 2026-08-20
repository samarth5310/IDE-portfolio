import React, { useState } from 'react';
import { TitleBar } from './components/layout/TitleBar';
import { ActivityBar } from './components/layout/ActivityBar';
import { StatusBar } from './components/layout/StatusBar';
import { MobileNav } from './components/layout/MobileNav';
import { Explorer } from './components/sidebar/Explorer';
import { SearchPanel } from './components/sidebar/SearchPanel';
import { GitPanel } from './components/sidebar/GitPanel';
import { SettingsPanel } from './components/sidebar/SettingsPanel';
import { EditorArea } from './components/editor/EditorArea';
import { BottomPanel } from './components/bottom/BottomPanel';
import { ChatPanel } from './components/chat/ChatPanel';
import { CommandPalette } from './components/modals/CommandPalette';
import { BootScreen } from './components/modals/BootScreen';
import { WorkspaceProvider, useWorkspace } from './context/WorkspaceContext';
import { ThemeProvider } from './context/ThemeContext';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

const WorkspaceContent: React.FC = () => {
  useKeyboardShortcuts();
  const { activeSidebar, isSidebarOpen, closeSidebar, isMobile } = useWorkspace();
  const [isRightChatOpen] = useState(true);

  const renderSidebarContent = () => {
    switch (activeSidebar) {
      case 'explorer':
        return <Explorer />;
      case 'search':
        return <SearchPanel />;
      case 'git':
        return <GitPanel />;
      case 'settings':
        return <SettingsPanel />;
      case 'chat':
        return <ChatPanel />;
      default:
        return <Explorer />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-ide-bg text-ide-text overflow-hidden font-sans select-none">
      {/* Top Window Title Bar */}
      <TitleBar />

      {/* Main Middle IDE Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Activity Bar (Desktop) */}
        <ActivityBar />

        {/* Mobile Backdrop Overlay */}
        {isMobile && isSidebarOpen && (
          <div
            onClick={closeSidebar}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 md:hidden animate-fade-in"
          />
        )}

        {/* Sidebar Panel (Responsive Drawer on Mobile, Docked on Desktop) */}
        {isSidebarOpen && (
          <aside
            className={`h-full bg-ide-sidebar border-r border-ide-border flex flex-col overflow-hidden shrink-0 z-40 transition-all duration-200 ${
              isMobile
                ? 'fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl animate-slide-up'
                : 'w-60 sm:w-64 md:w-68'
            }`}
          >
            {renderSidebarContent()}
          </aside>
        )}

        {/* Main Editor Center Area + Bottom Panel */}
        <div className="flex-1 flex flex-col overflow-hidden relative w-full">
          {/* Main Editor Area */}
          <div className="flex-1 overflow-hidden">
            <EditorArea />
          </div>

          {/* Bottom Resizable Panel (Terminal, Problems, Output, Debug) */}
          <BottomPanel />
        </div>

        {/* Right Chat AI Companion Panel (Desktop only on large screens) */}
        {isRightChatOpen && activeSidebar !== 'chat' && (
          <aside className="hidden xl:flex w-80 2xl:w-96 h-full bg-ide-sidebar border-l border-ide-border flex-col overflow-hidden shrink-0 z-10">
            <ChatPanel />
          </aside>
        )}
      </div>

      {/* Bottom Status Bar */}
      <StatusBar />

      {/* Mobile Navigation (screens < 768px) */}
      <MobileNav />

      {/* Modals */}
      <CommandPalette />
      <BootScreen />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <WorkspaceProvider>
        <WorkspaceContent />
      </WorkspaceProvider>
    </ThemeProvider>
  );
}
