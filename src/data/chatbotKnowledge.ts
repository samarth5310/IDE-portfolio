export interface BotResponse {
  answer: string;
  suggestedAction?: {
    label: string;
    fileId?: string;
    command?: string;
  };
}

export const initialChatMessages = [
  {
    id: 'msg-welcome',
    sender: 'assistant' as const,
    text: `Hello! I'm Samarth's **Portfolio AI Assistant** 🤖.

I can tell you about Samarth's background, technical projects, skills, education, certifications, and contact channels.

Try asking me a question or clicking one of the suggested prompts below!`,
    timestamp: 'Just now'
  }
];

export const suggestedPrompts = [
  "Who is Samarth?",
  "What projects has he built?",
  "Tell me about DishLyst",
  "Tell me about Education Admin System",
  "What is his tech stack?",
  "What are his certifications?",
  "What is Samarth's education?",
  "How can I contact him?"
];

export function getChatbotResponse(userMessage: string): BotResponse {
  const query = userMessage.toLowerCase().trim();

  // 1. Identity / Who is Samarth
  if (
    query.includes('who is') ||
    query.includes('about samarth') ||
    query.includes('tell me about yourself') ||
    query.includes('introduce') ||
    query.includes('bio') ||
    query.includes('background') ||
    (query.includes('who') && query.includes('samarth'))
  ) {
    return {
      answer: `**Samarth Kulkarni** is a **Computer Science Engineering student**, **Full-Stack Developer**, **AI/ML Enthusiast**, and **Cybersecurity Learner** based in **Bagalkot, Karnataka, India**.

He is passionate about building practical software applications, securing systems, and exploring modern cloud and AI technologies.

He is currently actively seeking **internship opportunities** where he can apply his technical skills and contribute to real-world software projects.`,
      suggestedAction: {
        label: "Open about.md",
        fileId: "about-md"
      }
    };
  }

  // 2. DishLyst
  if (query.includes('dishlyst') || query.includes('dish lyst') || query.includes('food') || query.includes('restaurant')) {
    return {
      answer: `### 🍽️ DishLyst
**DishLyst** is a responsive full-stack web application that allows users to compare the same dish across multiple restaurants by price, rating, and availability.

- **Tech Stack:** React, TypeScript, Tailwind CSS, Supabase, PostgreSQL
- **Key Features:**
  • Multi-restaurant dish comparison by price and rating
  • Advanced search and filtering algorithms
  • User authentication and normalized relational database schema
  • Cart and checkout flow
  • Restaurant admin dashboard with Role-Based Access Control (RBAC)`,
      suggestedAction: {
        label: "View projects.tsx",
        fileId: "projects-tsx"
      }
    };
  }

  // 3. Education Admin System
  if (query.includes('education') && (query.includes('admin') || query.includes('system') || query.includes('student'))) {
    return {
      answer: `### 🎓 Education Admin System
A secure React-based administration dashboard designed for managing **200+ student records** and automating administrative workflows.

- **Tech Stack:** React, TypeScript, Tailwind CSS, Supabase, MongoDB, PostgreSQL
- **Key Highlights:**
  • Authentication, student records, fees tracking & attendance monitoring
  • Homework management with Google Drive integration
  • WhatsApp API integration for automated absence notifications
  • Bcrypt password hashing & Supabase Row Level Security (RLS)
  • **Impact:** Reduced manual administrative workload by ~70%
- **Live Demo:** [visionaedubgk.netlify.app](https://visionaedubgk.netlify.app/)`,
      suggestedAction: {
        label: "View projects.tsx",
        fileId: "projects-tsx"
      }
    };
  }

  // 4. Techathon Certificate Generator
  if (
    query.includes('certificate') ||
    query.includes('techathon') ||
    query.includes('pdf generator') ||
    query.includes('cert generator')
  ) {
    return {
      answer: `### 📜 Techathon Certificate Generator
A web-based bulk certificate generation platform capable of generating and exporting **500+ personalized certificates** in bulk.

- **Tech Stack:** React, TypeScript, Tailwind CSS, Firebase, PDF Generation
- **Key Highlights:**
  • CSV participant data upload
  • Automated PDF generation for participants, teams, and winners
  • Event data and template management admin dashboard
  • **Impact:** Reduced certificate distribution time from hours to minutes
- **Live Demo:** [techathon-certificates.onrender.com](https://techathon-certificates.onrender.com/)`,
      suggestedAction: {
        label: "View projects.tsx",
        fileId: "projects-tsx"
      }
    };
  }

  // 5. All Projects
  if (query.includes('project') || query.includes('portfolio') || query.includes('work') || query.includes('built')) {
    return {
      answer: `Samarth has built **3 featured production projects**:

1. **DishLyst** — Centralized dish comparison platform across restaurants (React, TypeScript, Supabase, PostgreSQL).
2. **Education Admin System** — Secure dashboard managing 200+ student records with automated WhatsApp/Drive integrations (React, TypeScript, Supabase, MongoDB, PostgreSQL). [Live Demo: visionaedubgk.netlify.app](https://visionaedubgk.netlify.app/)
3. **Techathon Certificate Generator** — Bulk certificate generation platform handling 500+ certificates via CSV (React, TypeScript, Firebase, PDF Generation). [Live Demo: techathon-certificates.onrender.com](https://techathon-certificates.onrender.com/)`,
      suggestedAction: {
        label: "Open projects.tsx",
        fileId: "projects-tsx"
      }
    };
  }

  // 6. Technical Skills / Tech Stack
  if (
    query.includes('skill') ||
    query.includes('stack') ||
    query.includes('technology') ||
    query.includes('technologies') ||
    query.includes('language') ||
    query.includes('framework') ||
    query.includes('database') ||
    query.includes('tools')
  ) {
    return {
      answer: `Here is Samarth's verified technical skillset:

- **Core Concepts:** Data Structures & Algorithms, Operating Systems (Basics)
- **Languages:** Python, Java, SQL, JavaScript, TypeScript, HTML/CSS
- **Frameworks & Tech:** React, Node.js, Flask, FastAPI, Tailwind CSS
- **Databases:** PostgreSQL, MongoDB, Supabase, Firebase
- **Developer Tools:** Git, GitHub Actions, Linux, Google Cloud Platform, VS Code`,
      suggestedAction: {
        label: "Open skills.json",
        fileId: "skills-json"
      }
    };
  }

  // 7. Education / College / Degree / CGPA
  if (
    query.includes('education') ||
    query.includes('college') ||
    query.includes('university') ||
    query.includes('degree') ||
    query.includes('cgpa') ||
    query.includes('study') ||
    query.includes('engineering')
  ) {
    return {
      answer: `### 🏛️ Education Details
- **Degree:** Bachelor of Engineering (B.E.) in Computer Science Engineering
- **Institution:** Biluru Gurubasava Mahaswamiji Institute of Technology, Mudhol
- **University:** Visvesvaraya Technological University (VTU)
- **Duration:** August 2023 – August 2027
- **CGPA:** **7.50**
- **Academic Focus:** DSA, Operating Systems, Software Engineering, Database Systems, Cybersecurity, Cloud Technologies, Full-Stack Web Development`,
      suggestedAction: {
        label: "Open education.md",
        fileId: "education-md"
      }
    };
  }

  // 8. Certifications
  if (query.includes('certif') || query.includes('course') || query.includes('credential') || query.includes('aws') || query.includes('cyber')) {
    return {
      answer: `Samarth holds **6 verified certifications**:

1. **AWS APAC** – Solutions Architecture Job Simulation
2. **Foundations of Cybersecurity**
3. **Connect and Protect:** Networks and Network Security
4. **Play It Safe:** Manage Security Risks
5. **What is Data Science?**
6. **Algorithmic Thinking (Part 1)**`,
      suggestedAction: {
        label: "Open certifications.md",
        fileId: "certifications-md"
      }
    };
  }

  // 9. Contact / Email / Phone / Links
  if (
    query.includes('contact') ||
    query.includes('email') ||
    query.includes('phone') ||
    query.includes('reach') ||
    query.includes('linkedin') ||
    query.includes('github') ||
    query.includes('hire') ||
    query.includes('call')
  ) {
    return {
      answer: `You can reach out to Samarth directly through any of these verified channels:

- 📧 **Email:** [Samarthsk1976@zohomail.com](mailto:Samarthsk1976@zohomail.com)
- 📱 **Phone:** [9353376393](tel:9353376393)
- 🐙 **GitHub:** [github.com/samarth5310](https://github.com/samarth5310)
- 💼 **LinkedIn:** [linkedin.com/in/ksamarth](https://www.linkedin.com/in/ksamarth/)
- 📍 **Location:** Bagalkot, Karnataka, India`,
      suggestedAction: {
        label: "Open contact.tsx",
        fileId: "contact-tsx"
      }
    };
  }

  // 10. Resume
  if (query.includes('resume') || query.includes('cv') || query.includes('download')) {
    return {
      answer: `You can view and download Samarth's resume directly within this IDE environment.`,
      suggestedAction: {
        label: "Open resume.pdf",
        fileId: "resume-pdf"
      }
    };
  }

  // 11. Career Goals / Internship
  if (query.includes('goal') || query.includes('intern') || query.includes('opportunity') || query.includes('looking for') || query.includes('job')) {
    return {
      answer: `Samarth is currently actively seeking **internship opportunities** where he can apply his technical skills in full-stack development, cloud systems, and cybersecurity, contribute to real-world software products, and gain industry experience.`,
      suggestedAction: {
        label: "Open contact.tsx",
        fileId: "contact-tsx"
      }
    };
  }

  // 12. Easter eggs & fun
  if (query.includes('sudo') || query.includes('coffee') || query.includes('hire')) {
    return {
      answer: `🚀 **Permission granted!** Samarth is ready for high-impact software engineering opportunities. Type \`sudo hire samarth\` in the terminal below!`,
      suggestedAction: {
        label: "Run 'sudo hire samarth'",
        command: "sudo hire samarth"
      }
    };
  }

  // Fallback (strict no fabrication)
  return {
    answer: `I don't have that specific information in Samarth's verified portfolio yet.

Feel free to ask about his **projects** (*DishLyst*, *Education Admin System*, *Techathon Certificate Generator*), **technical skills**, **certifications**, **education at BMITH Mudhol**, or **contact info**!`
  };
}
