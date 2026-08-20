import React, { useState, useEffect } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

export const BootScreen: React.FC = () => {
  const { isBootComplete, setBootComplete } = useWorkspace();
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const bootSteps = [
    "Initializing Samarth Portfolio IDE...",
    "Loading workspace files...",
    "Loading 3 featured projects (DishLyst, Education Admin, Certificate Generator)...",
    "Loading technical skills matrix & certifications...",
    "Initializing simulated terminal & AI engine...",
    "✓ Workspace ready. Welcome to Samarth's Portfolio IDE 🚀"
  ];

  useEffect(() => {
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < bootSteps.length) {
        const stepText = bootSteps[currentStep];
        setLogs((prev) => [...prev, stepText]);
        setProgress(((currentStep + 1) / bootSteps.length) * 100);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setBootComplete(true);
        }, 300);
      }
    }, 220);

    return () => clearInterval(interval);
  }, []);

  if (isBootComplete) return null;

  return (
    <div 
      onClick={() => setBootComplete(true)}
      className="fixed inset-0 bg-[#101216] text-[#cccccc] font-mono flex flex-col items-center justify-center p-6 z-50 select-none cursor-pointer"
    >
      <div className="w-full max-w-lg space-y-6">
        {/* Terminal Header Icon */}
        <div className="flex items-center space-x-3 border-b border-neutral-800 pb-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs text-neutral-400 font-semibold">samarth-ide-loader --v1.0.0</span>
        </div>

        {/* Boot text stream */}
        <div className="space-y-2 text-xs min-h-[140px]">
          {logs.map((log, idx) => (
            <div 
              key={idx} 
              className={`flex items-center space-x-2 animate-fade-in ${
                log.startsWith('✓') ? 'text-emerald-400 font-bold' : idx === 0 ? 'text-cyan-400 font-semibold' : 'text-neutral-300'
              }`}
            >
              {log.startsWith('✓') ? (
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <span className="text-neutral-600 shrink-0">{'>'}</span>
              )}
              <span>{log}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-[#007acc] h-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-neutral-500">
            <span>Booting interactive development environment...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Skip button prompt */}
        <div className="text-center pt-2">
          <button
            onClick={() => setBootComplete(true)}
            className="text-[11px] text-neutral-400 hover:text-white px-3 py-1 rounded bg-neutral-900 border border-neutral-800 inline-flex items-center space-x-1 transition-colors"
          >
            <span>Click anywhere or press Enter to skip</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
