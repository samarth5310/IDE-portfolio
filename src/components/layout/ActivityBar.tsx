import React from 'react';
import { 
  Files, 
  Search, 
  GitBranch, 
  Bot, 
  Terminal, 
  Settings
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { ActiveSidebarTab } from '../../types/portfolio';

export const ActivityBar: React.FC = () => {
  const { 
    activeSidebar, 
    isSidebarOpen, 
    toggleSidebar, 
    toggleBottomPanel,
    isBottomPanelOpen
  } = useWorkspace();

  const topItems: { id: ActiveSidebarTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'explorer',
      label: 'Explorer (Ctrl+Shift+E)',
      icon: <Files className="w-5 h-5" />,
    },
    {
      id: 'search',
      label: 'Search (Ctrl+Shift+F)',
      icon: <Search className="w-5 h-5" />,
    },
    {
      id: 'git',
      label: 'Source Control (Git)',
      icon: <GitBranch className="w-5 h-5" />,
      badge: 3,
    },
    {
      id: 'chat',
      label: 'AI Portfolio Assistant',
      icon: <Bot className="w-5 h-5" />,
    },
  ];

  return (
    <aside aria-label="Activity Bar" className="hidden md:flex w-12 h-full bg-ide-activity border-r border-ide-border flex-col justify-between items-center py-2 select-none z-20 shrink-0">
      {/* Top Activity Icons */}
      <div className="flex flex-col items-center space-y-2 w-full">
        {topItems.map((item) => {
          const isActive = isSidebarOpen && activeSidebar === item.id;
          return (
            <button
              key={item.id}
              onClick={() => toggleSidebar(item.id)}
              className={`w-full py-2.5 flex justify-center items-center relative group transition-colors ${
                isActive
                  ? 'text-white'
                  : 'text-ide-muted hover:text-ide-text'
              }`}
              title={item.label}
            >
              {/* Left active border indicator */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-ide-accent" />
              )}
              {item.icon}

              {/* Badge indicator */}
              {item.badge && (
                <span className="absolute bottom-1 right-1 bg-ide-accent text-white text-[9px] font-bold px-1 rounded-full leading-tight">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Activity Icons */}
      <div className="flex flex-col items-center space-y-2 w-full">
        {/* Toggle Terminal Button */}
        <button
          onClick={() => toggleBottomPanel('terminal')}
          className={`w-full py-2.5 flex justify-center items-center relative transition-colors ${
            isBottomPanelOpen
              ? 'text-white'
              : 'text-ide-muted hover:text-ide-text'
          }`}
          title="Terminal (Ctrl+`)"
        >
          {isBottomPanelOpen && (
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-ide-accent" />
          )}
          <Terminal className="w-5 h-5" />
        </button>

        {/* Settings Button */}
        <button
          onClick={() => toggleSidebar('settings')}
          className={`w-full py-2.5 flex justify-center items-center relative transition-colors ${
            isSidebarOpen && activeSidebar === 'settings'
              ? 'text-white'
              : 'text-ide-muted hover:text-ide-text'
          }`}
          title="Settings & Themes"
        >
          {isSidebarOpen && activeSidebar === 'settings' && (
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-ide-accent" />
          )}
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
};
