import React, { useState } from 'react';
import { 
  Download, 
  ZoomIn, 
  ZoomOut, 
  FileText
} from 'lucide-react';
import { personalData, educationData, projectsData, certificationsData, skillsRawJson } from '../../data/portfolioData';
import { triggerConfetti } from '../ui/Confetti';

export const PdfViewer: React.FC = () => {
  const [zoom, setZoom] = useState<number>(100);

  const handleDownload = () => {
    triggerConfetti();
    // Generate a clean text or print representation
    const element = document.createElement("a");
    const file = new Blob([
      `SAMARTH KULKARNI - RESUME
Location: ${personalData.location}
Email: ${personalData.email} | Phone: ${personalData.phone}
LinkedIn: ${personalData.linkedin} | GitHub: ${personalData.github}

EDUCATION:
${educationData.degree} in ${educationData.branch}
${educationData.institution} (${educationData.university})
Duration: ${educationData.duration} | CGPA: ${educationData.cgpa}

PROJECTS:
1. DishLyst
   Tech: ${projectsData[0].technologies.join(', ')}
   Description: ${projectsData[0].description}

2. Education Admin System
   Tech: ${projectsData[1].technologies.join(', ')}
   Demo: ${projectsData[1].demo}
   Description: ${projectsData[1].description}

3. Techathon Certificate Generator
   Tech: ${projectsData[2].technologies.join(', ')}
   Demo: ${projectsData[2].demo}
   Description: ${projectsData[2].description}

TECHNICAL SKILLS:
Languages: ${skillsRawJson.languages.join(', ')}
Frameworks: ${skillsRawJson.frameworks_and_technologies.join(', ')}
Databases: ${skillsRawJson.databases.join(', ')}
Tools: ${skillsRawJson.developer_tools.join(', ')}

CERTIFICATIONS:
${certificationsData.map((c, i) => `${i + 1}. ${c.title}`).join('\n')}
`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "Samarth_Kulkarni_Resume.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#525659] overflow-hidden select-none">
      {/* PDF Action Toolbar */}
      <div className="h-10 bg-[#323639] border-b border-[#202224] px-4 flex items-center justify-between text-xs text-white shrink-0">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-red-400" />
          <span className="font-medium">Samarth_Kulkarni_Resume.pdf</span>
          <span className="text-neutral-400 text-[11px] hidden sm:inline">(Page 1 of 1)</span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Zoom controls */}
          <div className="flex items-center space-x-1 bg-[#202224] px-2 py-0.5 rounded border border-neutral-700">
            <button
              onClick={() => setZoom((prev) => Math.max(70, prev - 10))}
              className="p-1 hover:text-cyan-400 rounded"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono w-10 text-center">{zoom}%</span>
            <button
              onClick={() => setZoom((prev) => Math.min(140, prev + 10))}
              className="p-1 hover:text-cyan-400 rounded"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Download & Open Buttons */}
          <button
            onClick={handleDownload}
            className="px-3 py-1 bg-[#007acc] hover:bg-[#0098ff] text-white rounded font-medium text-xs flex items-center space-x-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Main Document Preview Container */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start">
        <div
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          className="bg-white text-black w-full max-w-3xl rounded shadow-2xl p-8 sm:p-12 space-y-6 transition-transform duration-150 select-text"
        >
          {/* Header */}
          <div className="border-b-2 border-neutral-800 pb-4 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                {personalData.name}
              </h1>
              <p className="text-sm font-semibold text-neutral-700 mt-0.5">
                {personalData.primaryRole}
              </p>
              <p className="text-xs text-neutral-600">
                {personalData.location}
              </p>
            </div>
            <div className="text-xs text-neutral-700 space-y-1 text-right font-medium">
              <div>Email: <a href={`mailto:${personalData.email}`} className="text-blue-600 hover:underline">{personalData.email}</a></div>
              <div>Phone: {personalData.phone}</div>
              <div>GitHub: <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">github.com/samarth5310</a></div>
              <div>LinkedIn: <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">linkedin.com/in/ksamarth</a></div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1">
              Professional Summary
            </h2>
            <p className="text-xs text-neutral-700 leading-relaxed pt-1">
              {personalData.aboutText} {personalData.careerGoal}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1">
              Education
            </h2>
            <div className="text-xs text-neutral-800">
              <div className="flex justify-between font-bold text-neutral-900">
                <span>{educationData.institution}</span>
                <span>{educationData.duration}</span>
              </div>
              <div className="flex justify-between text-neutral-700 italic">
                <span>{educationData.degree} in {educationData.branch} ({educationData.university})</span>
                <span className="font-semibold text-neutral-900 not-italic">CGPA: {educationData.cgpa}</span>
              </div>
              <p className="text-[11px] text-neutral-600 mt-1">
                <strong>Focus:</strong> {educationData.academicFocus.join(', ')}
              </p>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1">
              Key Projects
            </h2>
            {projectsData.map((p) => (
              <div key={p.id} className="text-xs space-y-1">
                <div className="flex justify-between items-center font-bold text-neutral-900">
                  <span className="text-sm">{p.name}</span>
                  <span className="text-[11px] font-normal text-neutral-600">
                    {p.technologies.join(' • ')}
                  </span>
                </div>
                <p className="text-neutral-700 text-[11px]">
                  {p.description}
                </p>
                <ul className="list-disc ml-4 text-[11px] text-neutral-600 space-y-0.5">
                  {p.highlights.slice(0, 3).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1">
              Technical Skills
            </h2>
            <div className="text-[11px] text-neutral-700 space-y-1">
              <div><strong>Languages:</strong> {skillsRawJson.languages.join(', ')}</div>
              <div><strong>Frameworks:</strong> {skillsRawJson.frameworks_and_technologies.join(', ')}</div>
              <div><strong>Databases:</strong> {skillsRawJson.databases.join(', ')}</div>
              <div><strong>Developer Tools:</strong> {skillsRawJson.developer_tools.join(', ')}</div>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1">
              Certifications ({certificationsData.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-neutral-700">
              {certificationsData.map((c) => (
                <div key={c.id} className="flex items-center space-x-1">
                  <span>•</span>
                  <span>{c.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
