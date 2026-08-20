import React from 'react';

export const OutputPanel: React.FC = () => {
  return (
    <div className="h-full w-full bg-ide-terminal font-mono text-xs text-ide-text select-text p-3 overflow-y-auto space-y-1">
      <div className="text-ide-muted">[2026-08-20 14:10:00] [Portfolio Core] Initializing Samarth's development workspace...</div>
      <div className="text-cyan-400">[2026-08-20 14:10:01] [VirtualFS] Mounted 9 portfolio files successfully.</div>
      <div className="text-emerald-400">[2026-08-20 14:10:01] [Projects] Loaded 3 production projects (DishLyst, Education Admin System, Techathon Certificate Generator).</div>
      <div className="text-emerald-400">[2026-08-20 14:10:01] [Skills] Loaded 5 technical domains from skills.json.</div>
      <div className="text-emerald-400">[2026-08-20 14:10:02] [Education] Loaded BMITH Mudhol (VTU) B.E. CSE credentials (CGPA 7.50).</div>
      <div className="text-blue-400">[2026-08-20 14:10:02] [AI Assistant] Local AI conversational engine online and ready.</div>
      <div className="text-emerald-400 font-semibold pt-1">[Ready] Workspace compiled and running at 60fps. Ready for recruiter exploration.</div>
    </div>
  );
};
