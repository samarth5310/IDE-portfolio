import React, { useState } from 'react';

export const DebugConsole: React.FC = () => {
  const [evalInput, setEvalInput] = useState('');
  const [evalLogs, setEvalLogs] = useState<string[]>([
    'Samarth Portfolio IDE Debugger v1.0.0',
    'Debugger attached to process 4210',
    'No active exceptions.'
  ]);

  const handleEval = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evalInput.trim()) return;

    let result = '';
    try {
      if (evalInput.includes('name') || evalInput.includes('whoami')) {
        result = '=> "Samarth Kulkarni"';
      } else if (evalInput.includes('projects')) {
        result = '=> ["DishLyst", "Education Admin System", "Techathon Certificate Generator"]';
      } else if (evalInput.includes('cgpa')) {
        result = '=> 7.50';
      } else {
        // Safe evaluation simulation
        result = `=> "Evaluated: ${evalInput.trim()}"`;
      }
    } catch {
      result = '=> Error: could not evaluate expression';
    }

    setEvalLogs((prev) => [...prev, `> ${evalInput}`, result]);
    setEvalInput('');
  };

  return (
    <div className="h-full w-full bg-ide-terminal font-mono text-xs text-ide-text select-text p-3 flex flex-col justify-between overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-1">
        {evalLogs.map((log, idx) => (
          <div key={idx} className={log.startsWith('=>') ? 'text-cyan-400 pl-2' : log.startsWith('>') ? 'text-white font-bold' : 'text-ide-muted'}>
            {log}
          </div>
        ))}
      </div>

      <form onSubmit={handleEval} className="flex items-center space-x-2 pt-2 border-t border-ide-border/40 mt-1 shrink-0">
        <span className="text-cyan-400 font-bold">{'>'}</span>
        <input
          type="text"
          value={evalInput}
          onChange={(e) => setEvalInput(e.target.value)}
          placeholder="Evaluate JavaScript expression or inspect variable..."
          className="flex-1 bg-transparent border-none outline-none text-white font-mono p-0 text-xs"
        />
      </form>
    </div>
  );
};
