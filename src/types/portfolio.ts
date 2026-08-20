export type FileType = 'markdown' | 'typescript' | 'json' | 'pdf' | 'image';

export interface VirtualFile {
  id: string;
  name: string;
  path: string;
  extension: string;
  type: FileType;
  icon: string;
  content: string;
  readOnly?: boolean;
  isModified?: boolean;
  language: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  status: string;
  technologies: string[];
  description: string;
  problem: string;
  solution: string;
  impact?: string;
  features: string[];
  demo?: string;
  github?: string;
  highlights: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Certification {
  id: string;
  title: string;
  tag: string;
}

export interface EducationInfo {
  institution: string;
  degree: string;
  branch: string;
  university: string;
  duration: string;
  cgpa: string;
  academicFocus: string[];
  careerObjective: string;
}

export interface PersonalData {
  name: string;
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  primaryRole: string;
  professionalIdentity: string;
  tagline: string;
  careerGoal: string;
  techPhilosophy: string;
  aboutText: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    fileId?: string;
    command?: string;
  };
}

export interface TerminalEntry {
  id: string;
  command?: string;
  output: string;
  isError?: boolean;
  isSystem?: boolean;
  timestamp: string;
}

export type ThemeMode = 'dark' | 'light' | 'monokai' | 'midnight';

export type ActiveSidebarTab = 'explorer' | 'search' | 'git' | 'chat' | 'settings';

export type ActiveBottomTab = 'terminal' | 'problems' | 'output' | 'debugConsole';
