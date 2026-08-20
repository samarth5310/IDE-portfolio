import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const ProblemsPanel: React.FC = () => {
  return (
    <div className="h-full w-full bg-ide-panel flex flex-col font-sans text-xs text-ide-text select-none p-4">
      <div className="flex items-center space-x-2 text-emerald-400 bg-emerald-950/30 border border-emerald-800/40 p-3 rounded max-w-md">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>No problems have been detected in the workspace (0 Errors, 0 Warnings).</span>
      </div>

      <div className="mt-4 text-ide-muted text-[11px] space-y-1">
        <div>• TypeScript Strict Mode: Enabled</div>
        <div>• ESLint Code Quality: Verified</div>
        <div>• All 3 project definitions and 6 certifications verified without errors.</div>
      </div>
    </div>
  );
};
