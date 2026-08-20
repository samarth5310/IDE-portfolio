import { VirtualFile } from '../types/portfolio';
import { skillsRawJson } from './portfolioData';

export const virtualFiles: VirtualFile[] = [
  {
    id: 'readme-md',
    name: 'README.md',
    path: 'portfolio/README.md',
    extension: 'md',
    type: 'markdown',
    icon: 'FileText',
    language: 'Markdown',
    content: `# Welcome to Samarth's Portfolio IDE 🚀

This isn't a traditional portfolio.

You're inside my development environment.

## Explorer

Open files from the Explorer to learn more about me.

### Available Files

- \`about.md\` → About me & technical philosophy
- \`projects.tsx\` → Production projects & live demos
- \`skills.json\` → Technical skills matrix
- \`experience.md\` → Project-based software experience
- \`education.md\` → Academic degree & focus areas
- \`certifications.md\` → Verified industry certifications
- \`contact.tsx\` → Direct links & contact info
- \`resume.pdf\` → Resume viewer & download

## Terminal

Try commands like:

\`\`\`bash
help           # List all available commands
whoami         # Quick identity overview
ls             # List portfolio workspace files
projects       # Display all verified projects
skills         # List tech stack and tools
education      # Show engineering degree details
certifications # Show all 6 certifications
contact        # Display verified contact channels
sudo hire samarth # Run special recruiter command
\`\`\`

## Chat Assistant

Ask the portfolio AI assistant questions such as:
- *Who is Samarth?*
- *What projects has he built?*
- *Tell me about DishLyst.*
- *Tell me about the Education Admin System.*
- *What certifications does he have?*
- *What is Samarth's education and CGPA?*
- *How can I contact him?*

## Current Goal

Seeking internship opportunities where I can apply my technical skills, contribute to real-world software projects, and gain industry experience.

---

> **Explore the workspace. Open a file. Run a command. Start a conversation.**`
  },
  {
    id: 'about-md',
    name: 'about.md',
    path: 'portfolio/about.md',
    extension: 'md',
    type: 'markdown',
    icon: 'FileText',
    language: 'Markdown',
    content: `# Hello, I'm Samarth Kulkarni

> Computer Science Engineering Student • Developer • Tech Enthusiast

## About Me

I am a Computer Science Engineering student focused on building practical
software applications and developing strong foundations in cybersecurity,
cloud technologies, and full-stack web development.

I enjoy turning ideas into functional applications and working across
frontend development, backend systems, databases, and modern developer tools.

## What I Do

- Full-Stack Web Development
- React & TypeScript Development
- Backend & API Development
- Database Design
- Data Structures & Algorithms
- Cybersecurity
- Cloud Technologies
- AI / Machine Learning

## Current Focus

- Cybersecurity
- Cloud Technologies
- Full-Stack Development
- Secure and Scalable Applications
- AI / Machine Learning

## Career Goal

I am currently seeking internship opportunities where I can apply my
technical skills, work on real-world software systems, and gain
practical industry experience.

## Tech Philosophy

> Build it. Understand it. Secure it. Improve it.`
  },
  {
    id: 'projects-tsx',
    name: 'projects.tsx',
    path: 'portfolio/projects.tsx',
    extension: 'tsx',
    type: 'typescript',
    icon: 'Code',
    language: 'TypeScript React',
    content: `// portfolio/projects.tsx - Samarth's Verified Project Catalog
import React from 'react';

export interface Project {
  name: string;
  technologies: string[];
  status: 'Completed' | 'In Progress';
  demo?: string;
  description: string;
  features: string[];
}

export const projects: Project[] = [
  {
    name: "DishLyst",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL"
    ],
    status: "Completed",
    description:
      "A responsive web application that allows users to compare the same dish across multiple restaurants by price, rating, and availability.",
    features: [
      "Advanced search and filtering",
      "Price and rating comparison",
      "Authentication",
      "Normalized database schema",
      "Cart and checkout",
      "Restaurant admin dashboard",
      "Role-based access control"
    ]
  },

  {
    name: "Education Admin System",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "PostgreSQL",
      "Supabase"
    ],
    status: "Completed",
    demo: "https://visionaedubgk.netlify.app/",
    description:
      "A secure React-based administration dashboard for managing 200+ student records.",
    features: [
      "Authentication",
      "Student management",
      "Fees tracking",
      "Attendance monitoring",
      "Homework management",
      "Password hashing",
      "Supabase Row Level Security",
      "Server-side verification",
      "Google Drive integration",
      "WhatsApp API integration"
    ]
  },

  {
    name: "Techathon Certificate Generator",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Firebase",
      "PDF Generation"
    ],
    status: "Completed",
    demo: "https://techathon-certificates.onrender.com/",
    description:
      "A web-based certificate generation platform capable of generating and exporting 500+ personalized certificates in bulk.",
    features: [
      "CSV participant upload",
      "Bulk certificate generation",
      "Participant certificates",
      "Team certificates",
      "Winner certificates",
      "Responsive admin dashboard",
      "Certificate template management",
      "Automated PDF generation"
    ]
  }
];

export default function ProjectsShowcase() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-blue-400">Featured Projects ({projects.length})</h1>
      {projects.map((project) => (
        <div key={project.name} className="border border-neutral-800 rounded-lg p-5 bg-neutral-900/50">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-white">{project.name}</h2>
            <span className="text-xs px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              {project.status}
            </span>
          </div>
          <p className="text-neutral-300 text-sm mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map(tech => (
              <span key={tech} className="text-xs px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/60">
                {tech}
              </span>
            ))}
          </div>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:underline">
              Live Demo ↗
            </a>
          )}
        </div>
      ))}
    </div>
  );
}`
  },
  {
    id: 'skills-json',
    name: 'skills.json',
    path: 'portfolio/skills.json',
    extension: 'json',
    type: 'json',
    icon: 'Braces',
    language: 'JSON',
    content: JSON.stringify(skillsRawJson, null, 2)
  },
  {
    id: 'experience-md',
    name: 'experience.md',
    path: 'portfolio/experience.md',
    extension: 'md',
    type: 'markdown',
    icon: 'FileText',
    language: 'Markdown',
    content: `# Experience

## Project-Based Software Development

I have developed multiple practical software applications spanning
full-stack web development, database systems, administration platforms,
automation, and PDF generation.

---

## DishLyst

**Role:** Full-Stack Developer

**Technologies:** React, TypeScript, Tailwind CSS, Supabase, PostgreSQL

Built a responsive dish comparison platform with authentication,
search and filtering, database design, cart and checkout functionality,
restaurant administration, and role-based access control.

---

## Education Admin System

**Role:** Full-Stack Developer

**Technologies:** React, TypeScript, Tailwind CSS, Supabase,
MongoDB, PostgreSQL

Built a secure student administration dashboard capable of managing
200+ student records with authentication, fees tracking, attendance,
homework management, security controls, Google Drive integration,
and WhatsApp API integration.

---

## Techathon Certificate Generator

**Role:** Full-Stack Developer

**Technologies:** React, TypeScript, Tailwind CSS, Firebase,
PDF Generation

Developed a bulk certificate generation platform capable of producing
500+ personalized certificates using CSV uploads and automated PDF
generation.

---

> Currently seeking internship opportunities to gain professional
> industry experience and contribute to real-world software projects.`
  },
  {
    id: 'education-md',
    name: 'education.md',
    path: 'portfolio/education.md',
    extension: 'md',
    type: 'markdown',
    icon: 'FileText',
    language: 'Markdown',
    content: `# Education

## Biluru Gurubasava Mahaswamiji Institute of Technology, Mudhol

**Degree:** Bachelor of Engineering (B.E.)

**Branch:** Computer Science Engineering

**University:** Visvesvaraya Technological University (VTU)

**Duration:** August 2023 – August 2027

**CGPA:** 7.50

### Academic Focus

- Data Structures and Algorithms
- Operating Systems
- Software Development
- Database Systems
- Cybersecurity
- Cloud Technologies
- Full-Stack Web Development

### Career Objective

Seeking internship opportunities to apply my technical skills,
develop real-world software, and gain practical industry experience.`
  },
  {
    id: 'certifications-md',
    name: 'certifications.md',
    path: 'portfolio/certifications.md',
    extension: 'md',
    type: 'markdown',
    icon: 'FileText',
    language: 'Markdown',
    content: `# Certifications

## AWS APAC – Solutions Architecture Job Simulation

## Foundations of Cybersecurity

## Connect and Protect: Networks and Network Security

## Play It Safe: Manage Security Risks

## What is Data Science?

## Algorithmic Thinking (Part 1)

---
*Total: 6 Verified Industry & Foundational Certifications*`
  },
  {
    id: 'contact-tsx',
    name: 'contact.tsx',
    path: 'portfolio/contact.tsx',
    extension: 'tsx',
    type: 'typescript',
    icon: 'Code',
    language: 'TypeScript React',
    content: `// portfolio/contact.tsx - Samarth's Contact Channels
import React from 'react';

export const Contact = () => {
  return (
    <section className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-white">Let's Connect</h1>

      <p className="text-neutral-400">
        I'm open to internship opportunities, collaborative projects, and technical discussions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        <a 
          href="mailto:Samarthsk1976@zohomail.com"
          className="p-4 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-blue-500 transition-colors"
        >
          <div className="text-xs text-neutral-400">Email</div>
          <div className="text-sm font-medium text-blue-400">Samarthsk1976@zohomail.com</div>
        </a>

        <a 
          href="tel:9353376393"
          className="p-4 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-blue-500 transition-colors"
        >
          <div className="text-xs text-neutral-400">Phone</div>
          <div className="text-sm font-medium text-white">9353376393</div>
        </a>

        <a
          href="https://github.com/samarth5310"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-blue-500 transition-colors"
        >
          <div className="text-xs text-neutral-400">GitHub</div>
          <div className="text-sm font-medium text-white">github.com/samarth5310</div>
        </a>

        <a
          href="https://www.linkedin.com/in/ksamarth/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-blue-500 transition-colors"
        >
          <div className="text-xs text-neutral-400">LinkedIn</div>
          <div className="text-sm font-medium text-blue-400">linkedin.com/in/ksamarth/</div>
        </a>
      </div>
    </section>
  );
};

export default Contact;`
  },
  {
    id: 'resume-pdf',
    name: 'resume.pdf',
    path: 'portfolio/resume.pdf',
    extension: 'pdf',
    type: 'pdf',
    icon: 'FileText',
    language: 'PDF Document',
    content: ''
  }
];

export const fileMap = new Map<string, VirtualFile>(
  virtualFiles.map((file) => [file.id, file])
);

export const getFileByName = (filename: string): VirtualFile | undefined => {
  const normalized = filename.trim().toLowerCase();
  return virtualFiles.find(
    (f) =>
      f.name.toLowerCase() === normalized ||
      f.id.toLowerCase() === normalized ||
      f.name.toLowerCase() === `${normalized}.md` ||
      f.name.toLowerCase() === `${normalized}.tsx` ||
      f.name.toLowerCase() === `${normalized}.json` ||
      f.name.toLowerCase() === `${normalized}.pdf`
  );
};
