import React, { useState } from 'react';
import { Braces, LayoutGrid, Code2, Database, Terminal, Cpu, Layers } from 'lucide-react';
import { skillsRawJson } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';

interface SkillsViewerProps {
  rawContent: string;
}

export const SkillsViewer: React.FC<SkillsViewerProps> = ({ rawContent }) => {
  const [viewMode, setViewMode] = useState<'visual' | 'json'>('visual');
  const { settings } = useTheme();

  const lines = rawContent.split('\n');

  const categories = [
    {
      title: 'Programming Languages',
      key: 'languages',
      icon: <Code2 className="w-4 h-4 text-cyan-400" />,
      items: skillsRawJson.languages,
      badgeColor: 'bg-cyan-950/40 text-cyan-300 border-cyan-800/60'
    },
    {
      title: 'Frameworks & Technologies',
      key: 'frameworks',
      icon: <Layers className="w-4 h-4 text-purple-400" />,
      items: skillsRawJson.frameworks_and_technologies,
      badgeColor: 'bg-purple-950/40 text-purple-300 border-purple-800/60'
    },
    {
      title: 'Databases & Storage',
      key: 'databases',
      icon: <Database className="w-4 h-4 text-emerald-400" />,
      items: skillsRawJson.databases,
      badgeColor: 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60'
    },
    {
      title: 'Developer Tools & Cloud',
      key: 'tools',
      icon: <Terminal className="w-4 h-4 text-amber-400" />,
      items: skillsRawJson.developer_tools,
      badgeColor: 'bg-amber-950/40 text-amber-300 border-amber-800/60'
    },
    {
      title: 'Core CS Concepts',
      key: 'concepts',
      icon: <Cpu className="w-4 h-4 text-blue-400" />,
      items: skillsRawJson.concepts,
      badgeColor: 'bg-blue-950/40 text-blue-300 border-blue-800/60'
    }
  ];

  const highlightJsonLine = (line: string) => {
    if (line.includes(':')) {
      const parts = line.split(':');
      return (
        <span>
          <span className="text-cyan-300">{parts[0]}</span>:
          <span className="text-amber-300">{parts.slice(1).join(':')}</span>
        </span>
      );
    }
    if (line.trim().startsWith('{') || line.trim().startsWith('}') || line.trim().startsWith('[') || line.trim().startsWith(']')) {
      return <span className="text-yellow-400">{line}</span>;
    }
    if (line.includes('"')) {
      return <span className="text-amber-300">{line}</span>;
    }
    return <span className="text-ide-text">{line}</span>;
  };

  return (
    <div className="h-full w-full flex flex-col bg-ide-editor overflow-hidden">
      {/* Header action bar */}
      <div className="h-8 bg-ide-panel border-b border-ide-border px-4 flex items-center justify-between text-xs select-none shrink-0">
        <div className="flex items-center space-x-2 text-ide-muted">
          <span className="text-amber-400 font-mono">skills.json</span>
          <span>•</span>
          <span>5 Categories</span>
        </div>
        <div className="flex items-center space-x-1 bg-ide-bg p-0.5 rounded border border-ide-border">
          <button
            onClick={() => setViewMode('visual')}
            className={`px-2 py-0.5 rounded text-[11px] flex items-center space-x-1 transition-colors ${
              viewMode === 'visual'
                ? 'bg-ide-accent text-white font-medium'
                : 'text-ide-muted hover:text-ide-text'
            }`}
          >
            <LayoutGrid className="w-3 h-3" />
            <span>Visual Matrix</span>
          </button>
          <button
            onClick={() => setViewMode('json')}
            className={`px-2 py-0.5 rounded text-[11px] flex items-center space-x-1 transition-colors ${
              viewMode === 'json'
                ? 'bg-ide-accent text-white font-medium'
                : 'text-ide-muted hover:text-ide-text'
            }`}
          >
            <Braces className="w-3 h-3" />
            <span>Raw JSON</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-6">
        {viewMode === 'visual' ? (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="pb-3 border-b border-ide-border">
              <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center space-x-2">
                <span>Technical Skills Matrix</span>
              </h1>
              <p className="text-xs text-ide-muted mt-1">
                Verified languages, frameworks, database systems, cloud tools, and computer science fundamentals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {categories.map((cat) => (
                <div
                  key={cat.key}
                  className="bg-ide-panel/80 border border-ide-border hover:border-ide-accent/40 rounded-lg p-5 space-y-3 transition-colors"
                >
                  <div className="flex items-center space-x-2 font-bold text-sm text-white border-b border-ide-border pb-2">
                    {cat.icon}
                    <span>{cat.title}</span>
                    <span className="text-[11px] text-ide-muted font-normal ml-auto">
                      {cat.items.length} items
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className={`text-xs px-2.5 py-1 rounded-md border font-mono font-medium ${cat.badgeColor}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div 
            className="font-mono text-sm leading-relaxed"
            style={{ fontSize: `${settings.fontSize}px` }}
          >
            {lines.map((line, idx) => (
              <div key={idx} className="flex hover:bg-ide-tabHover/40 group">
                {settings.lineNumbers && (
                  <span className="w-10 text-right pr-4 text-ide-muted select-none text-xs opacity-60 group-hover:opacity-100">
                    {idx + 1}
                  </span>
                )}
                <div className="flex-1 whitespace-pre-wrap">
                  {highlightJsonLine(line)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
