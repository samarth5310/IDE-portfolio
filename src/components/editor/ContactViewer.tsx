import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Download, 
  Code2, 
  Layers, 
  Send, 
  CheckCircle2, 
  Copy,
  ExternalLink
} from 'lucide-react';
import { personalData } from '../../data/portfolioData';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useTheme } from '../../context/ThemeContext';
import { triggerConfetti } from '../ui/Confetti';

interface ContactViewerProps {
  rawContent: string;
}

export const ContactViewer: React.FC<ContactViewerProps> = ({ rawContent }) => {
  const [viewMode, setViewMode] = useState<'visual' | 'code'>('visual');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const { openFile } = useWorkspace();
  const { settings } = useTheme();

  const lines = rawContent.split('\n');

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Open user's email client pre-filled
    const mailtoUrl = `mailto:${personalData.email}?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoUrl;

    setFormSubmitted(true);
    triggerConfetti();
  };

  return (
    <div className="h-full w-full flex flex-col bg-ide-editor overflow-hidden">
      {/* Header action bar */}
      <div className="h-8 bg-ide-panel border-b border-ide-border px-4 flex items-center justify-between text-xs select-none shrink-0">
        <div className="flex items-center space-x-2 text-ide-muted">
          <span className="text-cyan-400 font-mono">contact.tsx</span>
          <span>•</span>
          <span>Verified Channels</span>
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
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="pb-3 border-b border-ide-border">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Let's Connect</h1>
              <p className="text-xs text-ide-muted mt-1">
                Open to software engineering internship opportunities, collaborative projects, and technical discussions.
              </p>
            </div>

            {/* Quick Action Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <div className="p-4 rounded-lg bg-ide-panel border border-ide-border hover:border-ide-accent/50 transition-colors flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-white font-semibold text-sm">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span>Email Address</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(personalData.email, 'email')}
                    className="text-ide-muted hover:text-white p-1 rounded hover:bg-ide-tabHover"
                    title="Copy Email"
                  >
                    {copiedField === 'email' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-xs font-mono text-ide-accent truncate">
                  {personalData.email}
                </div>
                <a
                  href={`mailto:${personalData.email}`}
                  className="w-full py-1.5 px-3 rounded bg-ide-accent hover:bg-ide-accentHover text-white text-xs font-medium flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </a>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-lg bg-ide-panel border border-ide-border hover:border-ide-accent/50 transition-colors flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-white font-semibold text-sm">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Phone / Mobile</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(personalData.phone, 'phone')}
                    className="text-ide-muted hover:text-white p-1 rounded hover:bg-ide-tabHover"
                    title="Copy Phone"
                  >
                    {copiedField === 'phone' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-xs font-mono text-white truncate">
                  {personalData.phone}
                </div>
                <a
                  href={`tel:${personalData.phone}`}
                  className="w-full py-1.5 px-3 rounded bg-ide-bg hover:bg-ide-tabHover border border-ide-border text-white text-xs font-medium flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call {personalData.phone}</span>
                </a>
              </div>

              {/* GitHub */}
              <div className="p-4 rounded-lg bg-ide-panel border border-ide-border hover:border-ide-accent/50 transition-colors flex flex-col justify-between space-y-3">
                <div className="flex items-center space-x-2 text-white font-semibold text-sm">
                  <Github className="w-4 h-4 text-purple-400" />
                  <span>GitHub Profile</span>
                </div>
                <div className="text-xs font-mono text-ide-muted truncate">
                  {personalData.github}
                </div>
                <a
                  href={personalData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-1.5 px-3 rounded bg-ide-bg hover:bg-ide-tabHover border border-ide-border text-white text-xs font-medium flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <span>Open GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* LinkedIn */}
              <div className="p-4 rounded-lg bg-ide-panel border border-ide-border hover:border-ide-accent/50 transition-colors flex flex-col justify-between space-y-3">
                <div className="flex items-center space-x-2 text-white font-semibold text-sm">
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span>LinkedIn Profile</span>
                </div>
                <div className="text-xs font-mono text-ide-muted truncate">
                  {personalData.linkedin}
                </div>
                <a
                  href={personalData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-1.5 px-3 rounded bg-ide-bg hover:bg-ide-tabHover border border-ide-border text-white text-xs font-medium flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <span>Open LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Direct Message Form & Resume Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              {/* Message Form */}
              <div className="md:col-span-2 p-5 rounded-lg bg-ide-panel border border-ide-border space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Send className="w-3.5 h-3.5 text-ide-accent" />
                  <span>Direct Message Form</span>
                </h3>

                {formSubmitted ? (
                  <div className="p-4 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs space-y-2 animate-fade-in">
                    <div className="flex items-center space-x-2 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Message Drafted!</span>
                    </div>
                    <p className="text-emerald-200/80">
                      Your default mail client has opened. You can also reach Samarth directly at {personalData.email}.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-ide-muted mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Recruiter / Engineer Name"
                          className="w-full bg-ide-bg border border-ide-border rounded px-2.5 py-1.5 text-ide-text placeholder-ide-muted focus:outline-none focus:border-ide-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-ide-muted mb-1">Your Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="recruiter@company.com"
                          className="w-full bg-ide-bg border border-ide-border rounded px-2.5 py-1.5 text-ide-text placeholder-ide-muted focus:outline-none focus:border-ide-accent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-ide-muted mb-1">Message</label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Hi Samarth, we are looking for a software engineering intern..."
                        className="w-full bg-ide-bg border border-ide-border rounded px-2.5 py-1.5 text-ide-text placeholder-ide-muted focus:outline-none focus:border-ide-accent resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-ide-accent hover:bg-ide-accentHover text-white font-medium flex items-center space-x-2 transition-colors shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Resume Card */}
              <div className="p-5 rounded-lg bg-ide-panel border border-ide-border flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white mb-2">Resume / CV</h3>
                  <p className="text-xs text-ide-muted leading-relaxed">
                    View Samarth's verified resume with academic achievements, technical projects, and certifications.
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => openFile('resume-pdf')}
                    className="w-full py-2 px-3 rounded bg-ide-bg hover:bg-ide-tabHover border border-ide-border text-white text-xs font-medium flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <span>View in IDE Viewer</span>
                  </button>
                  <button
                    onClick={() => {
                      triggerConfetti();
                      openFile('resume-pdf');
                    }}
                    className="w-full py-2 px-3 rounded bg-ide-accent hover:bg-ide-accentHover text-white text-xs font-medium flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Resume</span>
                  </button>
                </div>
              </div>
            </div>
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
                <div className="flex-1 whitespace-pre-wrap text-ide-text">
                  {line}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
