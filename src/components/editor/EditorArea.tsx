import React from 'react';
import { ChevronRight, FileText, Code, Braces, File } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { EditorTabs } from './EditorTabs';
import { MarkdownViewer } from './MarkdownViewer';
import { ProjectsViewer } from './ProjectsViewer';
import { SkillsViewer } from './SkillsViewer';
import { ContactViewer } from './ContactViewer';
import { PdfViewer } from './PdfViewer';
import { EmptyEditor } from './EmptyEditor';
import { Minimap } from './Minimap';

export const EditorArea: React.FC = () => {
  const { activeFile } = useWorkspace();

  const getFileIcon = () => {
    if (!activeFile) return null;
    switch (activeFile.type) {
      case 'markdown':
        return <FileText className="w-3.5 h-3.5 text-blue-400 mr-1.5 shrink-0" />;
      case 'typescript':
        return <Code className="w-3.5 h-3.5 text-cyan-400 mr-1.5 shrink-0" />;
      case 'json':
        return <Braces className="w-3.5 h-3.5 text-amber-400 mr-1.5 shrink-0" />;
      case 'pdf':
        return <File className="w-3.5 h-3.5 text-red-400 mr-1.5 shrink-0" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-neutral-400 mr-1.5 shrink-0" />;
    }
  };

  const renderActiveContent = () => {
    if (!activeFile) {
      return <EmptyEditor />;
    }

    if (activeFile.id === 'projects-tsx') {
      return <ProjectsViewer rawContent={activeFile.content} />;
    }

    if (activeFile.id === 'skills-json') {
      return <SkillsViewer rawContent={activeFile.content} />;
    }

    if (activeFile.id === 'contact-tsx') {
      return <ContactViewer rawContent={activeFile.content} />;
    }

    if (activeFile.id === 'resume-pdf') {
      return <PdfViewer />;
    }

    // Markdown files
    return <MarkdownViewer content={activeFile.content} filename={activeFile.name} />;
  };

  return (
    <main className="h-full w-full flex flex-col bg-ide-editor overflow-hidden select-none">
      {/* Tab bar */}
      <EditorTabs />

      {/* Breadcrumb path */}
      {activeFile && (
        <div className="h-6 bg-ide-editor border-b border-ide-border/50 px-4 flex items-center text-[11px] text-ide-muted select-none shrink-0 space-x-1">
          <span>portfolio</span>
          <ChevronRight className="w-3 h-3 text-ide-muted/60" />
          <div className="flex items-center text-ide-text">
            {getFileIcon()}
            <span className="font-medium">{activeFile.name}</span>
          </div>
        </div>
      )}

      {/* Editor Content + Optional Minimap */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-hidden">
          {renderActiveContent()}
        </div>

        {activeFile && activeFile.id !== 'resume-pdf' && (
          <Minimap content={activeFile.content} />
        )}
      </div>
    </main>
  );
};
