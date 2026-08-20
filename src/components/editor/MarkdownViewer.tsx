import React, { useState } from 'react';
import { Eye, Code2, Copy, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { renderInlineMarkdown } from '../../utils/markdownParser';

interface MarkdownViewerProps {
  content: string;
  filename: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content, filename }) => {
  const [viewMode, setViewMode] = useState<'rendered' | 'source'>('rendered');
  const [copiedCodeBlock, setCopiedCodeBlock] = useState<number | null>(null);
  const { settings } = useTheme();

  const lines = content.split('\n');

  const copyCode = (codeText: string, blockIdx: number) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeBlock(blockIdx);
    setTimeout(() => setCopiedCodeBlock(null), 2000);
  };

  const renderFormattedMarkdown = (raw: string) => {
    const rawLines = raw.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBlockBuffer: string[] = [];
    let codeBlockLang = '';
    let codeBlockIndex = 0;

    for (let i = 0; i < rawLines.length; i++) {
      const line = rawLines[i];

      // Code Block Boundary
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          // Close code block
          const blockCode = codeBlockBuffer.join('\n');
          const currentIdx = codeBlockIndex;
          elements.push(
            <div key={`code-${currentIdx}`} className="my-4 rounded-lg bg-ide-panel border border-ide-border overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-3 py-1.5 bg-ide-bg border-b border-ide-border text-[11px] text-ide-muted font-mono">
                <span>{codeBlockLang || 'bash'}</span>
                <button
                  onClick={() => copyCode(blockCode, currentIdx)}
                  className="p-1 hover:text-white flex items-center space-x-1 transition-colors"
                >
                  {copiedCodeBlock === currentIdx ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 text-[10px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3.5 text-xs font-mono overflow-x-auto text-emerald-400/90 leading-relaxed">
                {blockCode}
              </pre>
            </div>
          );
          codeBlockBuffer = [];
          inCodeBlock = false;
        } else {
          // Open code block
          inCodeBlock = true;
          codeBlockLang = line.replace('```', '').trim();
          codeBlockIndex = i;
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockBuffer.push(line);
        continue;
      }

      // H1 Header
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={i} className="text-2xl sm:text-3xl font-extrabold text-white pb-2.5 border-b border-ide-border flex items-center justify-between tracking-tight">
            <span>{renderInlineMarkdown(line.replace('# ', ''))}</span>
          </h1>
        );
        continue;
      }

      // H2 Header
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-lg sm:text-xl font-bold text-ide-accent pt-4 pb-1.5 border-b border-ide-border/60 tracking-tight">
            {renderInlineMarkdown(line.replace('## ', ''))}
          </h2>
        );
        continue;
      }

      // H3 Header
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="text-sm sm:text-base font-bold text-white/95 pt-3 pb-1">
            {renderInlineMarkdown(line.replace('### ', ''))}
          </h3>
        );
        continue;
      }

      // Blockquote
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={i} className="pl-4 border-l-4 border-ide-accent bg-ide-panel/80 py-2.5 px-4 rounded-r text-ide-text font-medium my-3 border-y border-r border-ide-border/50">
            {renderInlineMarkdown(line.replace('> ', ''))}
          </blockquote>
        );
        continue;
      }

      // List Item
      if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={i} className="ml-5 list-disc text-ide-text text-xs sm:text-sm py-0.5 leading-relaxed">
            {renderInlineMarkdown(line.replace(/^[-*]\s+/, ''))}
          </li>
        );
        continue;
      }

      // Horizontal Rule
      if (line === '---') {
        elements.push(<hr key={i} className="border-ide-border my-5" />);
        continue;
      }

      // Empty spacing line
      if (!line.trim()) {
        elements.push(<div key={i} className="h-2" />);
        continue;
      }

      // Paragraph
      elements.push(
        <p key={i} className="text-xs sm:text-sm text-ide-text leading-relaxed">
          {renderInlineMarkdown(line)}
        </p>
      );
    }

    return (
      <div className="space-y-2 max-w-3xl leading-relaxed text-ide-text">
        {elements}
      </div>
    );
  };

  const highlightMarkdownLine = (line: string) => {
    if (line.startsWith('# ')) {
      return <span className="text-blue-400 font-bold">{line}</span>;
    }
    if (line.startsWith('## ')) {
      return <span className="text-cyan-400 font-semibold">{line}</span>;
    }
    if (line.startsWith('### ')) {
      return <span className="text-amber-300 font-semibold">{line}</span>;
    }
    if (line.startsWith('> ')) {
      return <span className="text-emerald-400 italic">{line}</span>;
    }
    if (line.startsWith('- ') || line.startsWith('* ')) {
      return (
        <>
          <span className="text-purple-400 font-bold">{line.substring(0, 2)}</span>
          <span className="text-ide-text">{line.substring(2)}</span>
        </>
      );
    }
    if (line.startsWith('```')) {
      return <span className="text-amber-400 font-mono">{line}</span>;
    }
    return <span className="text-ide-text">{line}</span>;
  };

  return (
    <div className="h-full w-full flex flex-col bg-ide-editor overflow-hidden">
      {/* Header action bar */}
      <div className="h-8 bg-ide-panel border-b border-ide-border px-4 flex items-center justify-between text-xs select-none shrink-0">
        <div className="flex items-center space-x-2 text-ide-muted">
          <span className="font-mono text-ide-text font-medium">{filename}</span>
          <span>•</span>
          <span>{lines.length} lines</span>
        </div>
        <div className="flex items-center space-x-1 bg-ide-bg p-0.5 rounded border border-ide-border">
          <button
            onClick={() => setViewMode('rendered')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-medium flex items-center space-x-1.5 transition-colors ${
              viewMode === 'rendered'
                ? 'bg-ide-accent text-white shadow-sm'
                : 'text-ide-muted hover:text-ide-text'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Preview</span>
          </button>
          <button
            onClick={() => setViewMode('source')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-medium flex items-center space-x-1.5 transition-colors ${
              viewMode === 'source'
                ? 'bg-ide-accent text-white shadow-sm'
                : 'text-ide-muted hover:text-ide-text'
            }`}
          >
            <Code2 className="w-3 h-3" />
            <span>Source</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-6">
        {viewMode === 'rendered' ? (
          renderFormattedMarkdown(content)
        ) : (
          <div 
            className="font-mono text-xs sm:text-sm leading-relaxed"
            style={{ fontSize: `${settings.fontSize}px` }}
          >
            {lines.map((line, idx) => (
              <div key={idx} className="flex hover:bg-ide-tabHover/40 group">
                {settings.lineNumbers && (
                  <span className="w-10 text-right pr-4 text-ide-muted select-none text-xs opacity-60 group-hover:opacity-100 font-mono">
                    {idx + 1}
                  </span>
                )}
                <div className="flex-1 whitespace-pre-wrap font-mono">
                  {highlightMarkdownLine(line)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
