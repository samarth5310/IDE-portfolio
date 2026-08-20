import { useState, useRef } from 'react';
import { TerminalEntry } from '../types/portfolio';
import { useWorkspace } from '../context/WorkspaceContext';
import { useTheme } from '../context/ThemeContext';
import { triggerConfetti } from '../components/ui/Confetti';
import { personalData, educationData, projectsData, certificationsData, skillsRawJson } from '../data/portfolioData';

const welcomeEntry: TerminalEntry = {
  id: 'term-welcome',
  output: `Welcome to Samarth's Portfolio IDE 🚀
Type 'help' to see available commands.`,
  isSystem: true,
  timestamp: new Date().toLocaleTimeString(),
};

export function useTerminal() {
  const [history, setHistory] = useState<TerminalEntry[]>([welcomeEntry]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const { openFile } = useWorkspace();
  const { setTheme, playKeySound } = useTheme();

  const handleCommand = (rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    playKeySound();

    // Add to command history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ').toLowerCase().trim();

    let output = '';
    let isError = false;

    switch (cmd) {
      case 'help':
        output = `Available Commands:
  whoami         - Display developer profile & roles
  ls             - List all workspace files & directories
  pwd            - Print working directory
  projects       - Display verified projects & demos
  skills         - List technical skills & developer tools
  education      - Show university degree & CGPA
  certifications - Show all 6 verified certifications
  contact        - View email, phone, GitHub, and LinkedIn
  resume         - Open / Download resume
  open <file>    - Open a file in the editor (e.g. open about.md)
  cat <file>     - Print file contents to terminal
  theme <name>   - Change IDE theme (dark | light | monokai | midnight)
  github         - Open Samarth's GitHub profile
  linkedin       - Open Samarth's LinkedIn profile
  clear          - Clear terminal history
  date           - Show current timestamp
  echo <text>    - Echo arguments

Easter Eggs:
  sudo hire samarth - Recruiter direct hire command
  npm run coffee    - Boost developer productivity
  rm -rf /doubt     - Overcome imposter syndrome`;
        break;

      case 'whoami':
        output = `${personalData.name}

${personalData.primaryRole}
${personalData.professionalIdentity.replace(/•/g, '\n')}
Location: ${personalData.location}
Tagline: "${personalData.tagline}"`;
        break;

      case 'ls':
        output = `README.md          about.md           projects.tsx
skills.json        experience.md      education.md
certifications.md  contact.tsx        resume.pdf
assets/`;
        break;

      case 'pwd':
        output = `/home/samarth/portfolio`;
        break;

      case 'about':
        openFile('about-md');
        output = `${personalData.name} - Computer Science Engineering Student
${personalData.aboutText}

Opened 'about.md' in editor.`;
        break;

      case 'projects':
        openFile('projects-tsx');
        output = `3 projects found:

01  ${projectsData[0].name}
    Tech: ${projectsData[0].technologies.join(', ')}
    ${projectsData[0].description}

02  ${projectsData[1].name}
    Tech: ${projectsData[1].technologies.join(', ')}
    Demo: ${projectsData[1].demo}
    ${projectsData[1].description}

03  ${projectsData[2].name}
    Tech: ${projectsData[2].technologies.join(', ')}
    Demo: ${projectsData[2].demo}
    ${projectsData[2].description}

Opened 'projects.tsx' in editor.`;
        break;

      case 'skills':
        openFile('skills-json');
        output = `Languages:
${skillsRawJson.languages.join(', ')}

Frameworks & Technologies:
${skillsRawJson.frameworks_and_technologies.join(', ')}

Databases:
${skillsRawJson.databases.join(', ')}

Developer Tools:
${skillsRawJson.developer_tools.join(', ')}

Opened 'skills.json' in editor.`;
        break;

      case 'education':
        openFile('education-md');
        output = `${educationData.degree} in ${educationData.branch}

${educationData.institution}
${educationData.university}

Duration: ${educationData.duration}
CGPA: ${educationData.cgpa}

Opened 'education.md' in editor.`;
        break;

      case 'certifications':
        openFile('certifications-md');
        output = `6 certifications found:

${certificationsData.map((c, i) => `0${i + 1}  ${c.title}`).join('\n')}

Opened 'certifications.md' in editor.`;
        break;

      case 'contact':
        openFile('contact-tsx');
        output = `Email:    ${personalData.email}
Phone:    ${personalData.phone}
GitHub:   ${personalData.github}
LinkedIn: ${personalData.linkedin}

Opened 'contact.tsx' in editor.`;
        break;

      case 'resume':
        openFile('resume-pdf');
        output = `Opening resume.pdf in editor workspace...`;
        break;

      case 'github':
        window.open(personalData.github, '_blank', 'noopener,noreferrer');
        output = `Opening ${personalData.github}...`;
        break;

      case 'linkedin':
        window.open(personalData.linkedin, '_blank', 'noopener,noreferrer');
        output = `Opening ${personalData.linkedin}...`;
        break;

      case 'open':
      case 'cat':
      case 'code':
      case 'view':
        if (!args) {
          output = `Usage: ${cmd} <filename> (e.g. ${cmd} about.md, ${cmd} projects.tsx)`;
          isError = true;
        } else {
          openFile(args);
          output = `Loaded '${args}' into workspace editor.`;
        }
        break;

      case 'theme':
        if (['dark', 'light', 'monokai', 'midnight'].includes(args)) {
          setTheme(args as 'dark' | 'light' | 'monokai' | 'midnight');
          output = `IDE theme switched to '${args}'.`;
        } else {
          output = `Usage: theme <dark | light | monokai | midnight>`;
          isError = true;
        }
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        return;

      case 'date':
        output = new Date().toString();
        break;

      case 'echo':
        output = parts.slice(1).join(' ');
        break;

      case 'sudo':
        if (args === 'hire samarth' || args === 'hire' || args === 'hire samarth kulkarni') {
          triggerConfetti();
          output = `Permission granted.

Let's talk. 🚀
Email: ${personalData.email} | Phone: ${personalData.phone}`;
        } else {
          output = `sudo: ${args}: command not found. Try 'sudo hire samarth'.`;
          isError = true;
        }
        break;

      case 'npm':
        if (args === 'run coffee' || args === 'start coffee') {
          output = `☕ Coffee module installed successfully.
Developer productivity increased by 42%.`;
        } else {
          output = `npm: ${args} is simulated in this portfolio terminal.`;
        }
        break;

      case 'rm':
        if (args.includes('/doubt') || args.includes('doubt')) {
          output = `Nice try 😄
Doubt cannot be deleted that easily. Keep building and learning!`;
        } else {
          output = `rm: cannot remove '${args}': Permission denied (Read-only virtual environment)`;
          isError = true;
        }
        break;

      case 'cd':
        if (['projects', 'skills', 'about', 'education', 'contact'].includes(args)) {
          openFile(args);
          output = `Navigated to '${args}'`;
        } else if (args === '..' || args === '~' || args === '/') {
          output = `Current directory: /home/samarth/portfolio`;
        } else {
          output = `cd: ${args}: No such file or directory`;
          isError = true;
        }
        break;

      default:
        output = `Command '${cmd}' not found. Type 'help' to see list of available commands.`;
        isError = true;
    }

    const newEntry: TerminalEntry = {
      id: `term-${Date.now()}`,
      command: trimmed,
      output,
      isError,
      timestamp: new Date().toLocaleTimeString(),
    };

    setHistory((prev) => [...prev, newEntry]);
  };

  const navigateHistory = (direction: 'up' | 'down'): string => {
    if (commandHistory.length === 0) return '';

    let nextIndex = historyIndex;
    if (direction === 'up') {
      nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
    } else {
      nextIndex = historyIndex === -1 ? -1 : Math.min(commandHistory.length - 1, historyIndex + 1);
    }

    setHistoryIndex(nextIndex);
    if (nextIndex === -1) return '';
    return commandHistory[nextIndex] || '';
  };

  return {
    history,
    handleCommand,
    navigateHistory,
    inputRef,
    clearTerminal: () => setHistory([]),
  };
}
