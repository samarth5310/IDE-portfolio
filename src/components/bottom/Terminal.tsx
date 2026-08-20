import React, { useState, useRef, useEffect } from 'react';
import { useTerminal } from '../../hooks/useTerminal';

export const Terminal: React.FC = () => {
  const { history, handleCommand, navigateHistory } = useTerminal();
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = navigateHistory('up');
      setInputVal(prev);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = navigateHistory('down');
      setInputVal(next);
    }
  };

  return (
    <div 
      className="h-full w-full bg-ide-terminal flex flex-col font-mono text-xs text-ide-text select-text p-3 overflow-y-auto"
      onClick={() => inputRef.current?.focus()}
    >
      {/* History outputs */}
      <div className="space-y-3">
        {history.map((entry) => (
          <div key={entry.id} className="space-y-1">
            {entry.command && (
              <div className="flex items-center space-x-2">
                <span className="text-emerald-400 font-semibold">samarth@portfolio:~$</span>
                <span className="text-white font-medium">{entry.command}</span>
              </div>
            )}
            <pre className={`whitespace-pre-wrap leading-relaxed ${
              entry.isError ? 'text-red-400' : entry.isSystem ? 'text-cyan-400' : 'text-neutral-300'
            }`}>
              {entry.output}
            </pre>
          </div>
        ))}
      </div>

      {/* Active input prompt */}
      <div className="flex items-center space-x-2 pt-2 mt-1">
        <span className="text-emerald-400 font-semibold shrink-0">samarth@portfolio:~$</span>
        <div className="flex-1 flex items-center relative">
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={onKeyDown}
            className="w-full bg-transparent border-none outline-none text-white font-mono p-0"
            autoFocus
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
          />
        </div>
      </div>

      <div ref={bottomRef} className="h-4" />
    </div>
  );
};
