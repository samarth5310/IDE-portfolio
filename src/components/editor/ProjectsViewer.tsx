import React, { useState } from 'react';
import { 
  ExternalLink, 
  Code2, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowUpRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { projectsData } from '../../data/portfolioData';
import { Project } from '../../types/portfolio';
import { useTheme } from '../../context/ThemeContext';

interface ProjectsViewerProps {
  rawContent: string;
}

export const ProjectsViewer: React.FC<ProjectsViewerProps> = ({ rawContent }) => {
  const [viewMode, setViewMode] = useState<'visual' | 'code'>('visual');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { settings } = useTheme();

  const lines = rawContent.split('\n');

  const highlightTsxLine = (line: string) => {
    // Simple fast syntax coloring for TSX
    if (line.trim().startsWith('//')) {
      return <span className="text-emerald-500 italic">{line}</span>;
    }
    if (line.includes('import ') || line.includes('export ') || line.includes('const ') || line.includes('interface ') || line.includes('return ')) {
      return (
        <span className="text-ide-text">
          {line.split(/(import|export|const|interface|return|default|function)/g).map((part, i) => {
            if (['import', 'export', 'const', 'interface', 'return', 'default', 'function'].includes(part)) {
              return <span key={i} className="text-purple-400 font-semibold">{part}</span>;
            }
            if (part.includes('"') || part.includes("'")) {
              return <span key={i} className="text-amber-300">{part}</span>;
            }
            return part;
          })}
        </span>
      );
    }
    if (line.includes(':') && (line.includes('"') || line.includes("'"))) {
      const parts = line.split(':');
      return (
        <span>
          <span className="text-blue-300">{parts[0]}</span>:
          <span className="text-amber-300">{parts.slice(1).join(':')}</span>
        </span>
      );
    }
    return <span className="text-ide-text">{line}</span>;
  };

  return (
    <div className="h-full w-full flex flex-col bg-ide-editor overflow-hidden">
      {/* Header action bar */}
      <div className="h-8 bg-ide-panel border-b border-ide-border px-4 flex items-center justify-between text-xs select-none shrink-0">
        <div className="flex items-center space-x-2 text-ide-muted">
          <span className="text-cyan-400 font-mono">projects.tsx</span>
          <span>•</span>
          <span>{projectsData.length} Featured Projects</span>
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
            <Layers className="w-3 h-3" />
            <span>Interactive UI</span>
          </button>
          <button
            onClick={() => setViewMode('code')}
            className={`px-2 py-0.5 rounded text-[11px] flex items-center space-x-1 transition-colors ${
              viewMode === 'code'
                ? 'bg-ide-accent text-white font-medium'
                : 'text-ide-muted hover:text-ide-text'
            }`}
          >
            <Code2 className="w-3 h-3" />
            <span>TypeScript Code</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-6">
        {viewMode === 'visual' ? (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-ide-border">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center space-x-2">
                  <span>Featured Software Projects</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-ide-accent/20 text-ide-accent border border-ide-accent/40 font-mono">
                    3 Total
                  </span>
                </h1>
                <p className="text-xs text-ide-muted mt-1">
                  Full-stack web applications, database architectures, and automated generation platforms.
                </p>
              </div>
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {projectsData.map((project, idx) => (
                <div
                  key={project.id}
                  className="bg-ide-panel/80 hover:bg-ide-panel border border-ide-border hover:border-ide-accent/50 rounded-lg p-5 flex flex-col justify-between transition-all group shadow-sm hover:shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-ide-muted">0{idx + 1}.</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                        {project.status}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-white group-hover:text-ide-accent transition-colors">
                      {project.name}
                    </h2>

                    <p className="text-xs text-ide-muted line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] px-2 py-0.5 rounded bg-ide-bg text-ide-text border border-ide-border font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer actions */}
                  <div className="pt-5 mt-4 border-t border-ide-border flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-semibold text-ide-accent hover:underline flex items-center space-x-1"
                    >
                      <span>View Details</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>

                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-2.5 py-1 rounded bg-ide-accent hover:bg-ide-accentHover text-white font-medium flex items-center space-x-1 transition-colors shadow-sm"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Project Full Details Modal / Expanded Card */}
            {selectedProject && (
              <div className="mt-8 p-6 rounded-lg bg-ide-panel border border-ide-accent/40 space-y-5 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-ide-border">
                  <div>
                    <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                      <span>{selectedProject.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                        {selectedProject.status}
                      </span>
                    </h3>
                    <p className="text-xs text-ide-muted">{selectedProject.tagline}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedProject.demo && (
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded bg-ide-accent hover:bg-ide-accentHover text-white text-xs font-medium flex items-center space-x-1.5 transition-colors"
                      >
                        <span>Open Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="px-3 py-1.5 rounded bg-ide-bg hover:bg-ide-tabHover border border-ide-border text-xs text-ide-muted hover:text-white transition-colors"
                    >
                      Close Details
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-white mb-1 flex items-center space-x-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Problem Statement</span>
                      </h4>
                      <p className="text-ide-muted bg-ide-bg p-3 rounded border border-ide-border">
                        {selectedProject.problem}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-white mb-1 flex items-center space-x-1.5">
                        <Zap className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Technical Solution</span>
                      </h4>
                      <p className="text-ide-muted bg-ide-bg p-3 rounded border border-ide-border">
                        {selectedProject.solution}
                      </p>
                    </div>

                    {selectedProject.impact && (
                      <div>
                        <h4 className="font-bold text-white mb-1 flex items-center space-x-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                          <span>Impact & Results</span>
                        </h4>
                        <p className="text-ide-muted bg-ide-bg p-3 rounded border border-ide-border">
                          {selectedProject.impact}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-white mb-1 flex items-center space-x-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        <span>Key Features & Capabilities</span>
                      </h4>
                      <ul className="bg-ide-bg p-3 rounded border border-ide-border space-y-1.5 text-ide-text">
                        {selectedProject.features.map((feat, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-white mb-1">Technologies Used</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.technologies.map((t) => (
                          <span key={t} className="px-2.5 py-1 rounded bg-ide-bg border border-ide-border text-ide-accent font-mono text-xs">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
                  {highlightTsxLine(line)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
