import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface MinimapProps {
  content: string;
}

export const Minimap: React.FC<MinimapProps> = ({ content }) => {
  const { settings } = useTheme();

  if (!settings.minimap) return null;

  const lines = content.split('\n').slice(0, 70);

  return (
    <div className="hidden lg:block w-20 h-full bg-ide-editor/80 border-l border-ide-border/40 select-none overflow-hidden p-1.5 opacity-60 hover:opacity-100 transition-opacity shrink-0">
      <div className="space-y-[3px] pointer-events-none">
        {lines.map((line, idx) => {
          const width = Math.min(100, Math.max(15, line.trim().length * 2.2));
          let color = 'bg-ide-muted/40';

          if (line.startsWith('#') || line.includes('function') || line.includes('interface')) {
            color = 'bg-blue-400/60';
          } else if (line.includes('const') || line.includes('import') || line.includes('export')) {
            color = 'bg-purple-400/60';
          } else if (line.includes('"') || line.includes("'")) {
            color = 'bg-amber-400/50';
          }

          return (
            <div
              key={idx}
              className={`h-[2px] rounded-xs ${color}`}
              style={{ width: `${width}%` }}
            />
          );
        })}
      </div>
    </div>
  );
};
