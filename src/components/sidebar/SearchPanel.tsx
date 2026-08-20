import React, { useState } from 'react';
import { Search, ChevronDown, FileText, Code, Braces, X } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { virtualFiles } from '../../data/virtualFiles';
import { VirtualFile } from '../../types/portfolio';

interface SearchResult {
  file: VirtualFile;
  matches: { line: number; text: string }[];
}

export const SearchPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { openFile, closeSidebar } = useWorkspace();

  const results: SearchResult[] = searchTerm.trim() === ''
    ? []
    : virtualFiles
        .map((file) => {
          const lines = file.content.split('\n');
          const matches: { line: number; text: string }[] = [];
          
          lines.forEach((line, index) => {
            if (line.toLowerCase().includes(searchTerm.toLowerCase())) {
              matches.push({ line: index + 1, text: line.trim() });
            }
          });

          return { file, matches };
        })
        .filter((res) => res.matches.length > 0);

  const totalMatches = results.reduce((acc, curr) => acc + curr.matches.length, 0);

  const getFileIcon = (file: VirtualFile) => {
    switch (file.type) {
      case 'typescript':
        return <Code className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
      case 'json':
        return <Braces className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
    }
  };

  const highlightMatch = (text: string, term: string) => {
    if (!term) return text;
    const parts = text.split(new RegExp(`(${term})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === term.toLowerCase() ? (
            <span key={i} className="bg-amber-400/40 text-white font-semibold rounded-xs px-0.5">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="h-full w-full bg-ide-sidebar flex flex-col select-none text-xs text-ide-text">
      {/* Header */}
      <div className="h-9 px-3 flex items-center justify-between font-semibold tracking-wider text-ide-muted text-[11px] border-b border-ide-border shrink-0">
        <span className="font-mono">SEARCH</span>
        <button 
          onClick={closeSidebar} 
          className="md:hidden p-1 hover:text-white rounded text-ide-muted hover:bg-ide-tabHover"
          title="Close Search"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Search Input Box */}
      <div className="p-3 border-b border-ide-border">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search across files..."
            className="w-full bg-ide-bg border border-ide-border rounded px-2.5 py-1.5 text-xs text-ide-text placeholder-ide-muted focus:outline-none focus:border-ide-accent font-mono"
            autoFocus
          />
          <Search className="w-3.5 h-3.5 absolute right-2.5 top-2 text-ide-muted pointer-events-none" />
        </div>

        {searchTerm && (
          <div className="mt-2 text-[11px] text-ide-muted font-mono">
            {totalMatches} {totalMatches === 1 ? 'result' : 'results'} in {results.length}{' '}
            {results.length === 1 ? 'file' : 'files'}
          </div>
        )}
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {searchTerm && results.length === 0 && (
          <div className="p-4 text-center text-ide-muted text-xs font-mono">
            No matching results found for "{searchTerm}".
          </div>
        )}

        {results.map(({ file, matches }) => (
          <div key={file.id} className="space-y-1">
            <div 
              onClick={() => openFile(file.id)}
              className="flex items-center px-2 py-1.5 hover:bg-ide-tabHover rounded cursor-pointer text-ide-text font-medium font-mono"
            >
              <ChevronDown className="w-3.5 h-3.5 mr-1 text-ide-muted" />
              <div className="mr-1.5">{getFileIcon(file)}</div>
              <span className="truncate flex-1 text-xs">{file.name}</span>
              <span className="text-[10px] text-ide-muted px-1.5 rounded bg-ide-border">
                {matches.length}
              </span>
            </div>

            <div className="pl-6 space-y-0.5">
              {matches.slice(0, 5).map((match, idx) => (
                <div
                  key={idx}
                  onClick={() => openFile(file.id)}
                  className="px-2 py-1 hover:bg-ide-tabHover rounded cursor-pointer text-[11px] text-ide-muted truncate flex items-center"
                >
                  <span className="w-6 text-right mr-2 text-[10px] text-ide-muted/70 font-mono">
                    {match.line}:
                  </span>
                  <span className="truncate font-mono">
                    {highlightMatch(match.text, searchTerm)}
                  </span>
                </div>
              ))}
              {matches.length > 5 && (
                <div className="text-[10px] text-ide-muted pl-2 font-mono">
                  +{matches.length - 5} more matches
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
