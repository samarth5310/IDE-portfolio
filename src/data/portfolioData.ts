import { PersonalData, EducationInfo, Project, Certification } from '../types/portfolio';

export const personalData: PersonalData = {
  name: "Samarth Kulkarni",
  location: "Bagalkot, Karnataka, India",
  phone: "9353376393",
  email: "Samarthsk1976@zohomail.com",
  github: "https://github.com/samarth5310",
  linkedin: "https://www.linkedin.com/in/ksamarth/",
  primaryRole: "Computer Science Engineering Student",
  professionalIdentity: "Full-Stack Developer • AI/ML Enthusiast • Cybersecurity Learner",
  tagline: "Building software. Exploring AI. Securing the future.",
  careerGoal: "Currently seeking internship opportunities where I can apply my technical skills, work on real-world software systems, and gain practical industry experience.",
  techPhilosophy: "Build it. Understand it. Secure it. Improve it.",
  aboutText: "I am a Computer Science Engineering student focused on building practical software applications and developing strong foundations in cybersecurity, cloud technologies, and full-stack web development. I enjoy turning ideas into functional applications and working across frontend development, backend systems, databases, and modern developer tools."
};

export const educationData: EducationInfo = {
  institution: "Biluru Gurubasava Mahaswamiji Institute of Technology, Mudhol",
  degree: "Bachelor of Engineering (B.E.)",
  branch: "Computer Science Engineering",
  university: "Visvesvaraya Technological University (VTU)",
  duration: "August 2023 – August 2027",
  cgpa: "7.50",
  academicFocus: [
    "Data Structures and Algorithms",
    "Operating Systems",
    "Software Development",
    "Database Systems",
    "Cybersecurity",
    "Cloud Technologies",
    "Full-Stack Web Development"
  ],
  careerObjective: "Seeking internship opportunities to apply my technical skills, develop real-world software, and gain practical industry experience."
};

export const projectsData: Project[] = [
  {
    id: "dishlyst",
    name: "DishLyst",
    tagline: "Centralized Dish Comparison & Restaurant Platform",
    status: "Completed",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL"
    ],
    description: "A responsive web application that allows users to compare the same dish across multiple restaurants by price, rating, and availability.",
    problem: "Users often need to check multiple restaurants to compare the same dish's price, rating, and availability.",
    solution: "A centralized dish comparison platform with search, filtering, and restaurant-level comparison.",
    impact: "Provides instant multi-restaurant pricing transparency, role-based administration, and streamlined ordering workflows.",
    features: [
      "Advanced search and filtering",
      "Price and rating comparison",
      "Authentication",
      "Normalized database schema",
      "Cart and checkout",
      "Restaurant admin dashboard",
      "Role-based access control"
    ],
    highlights: [
      "Designed and developed a responsive web application for comparing dishes across restaurants.",
      "Implemented advanced search and filtering algorithms.",
      "Built the full stack with React, TypeScript, and Tailwind CSS.",
      "Used Supabase and PostgreSQL for backend and database functionality.",
      "Implemented secure authentication and normalized database schema.",
      "Added cart, checkout, restaurant admin dashboard, and role-based access control."
    ]
  },
  {
    id: "education-admin-system",
    name: "Education Admin System",
    tagline: "Secure Student Administration & Records Dashboard",
    status: "Completed",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "PostgreSQL",
      "Supabase"
    ],
    demo: "https://visionaedubgk.netlify.app/",
    description: "A secure React-based administration dashboard for managing 200+ student records.",
    problem: "Managing student records, fees, attendance, and homework manually creates significant administrative overhead.",
    solution: "A centralized administration dashboard with authentication, student management, automation, and integrations.",
    impact: "Designed to manage 200+ student records and reduced manual administrative work by approximately 70%.",
    features: [
      "Authentication",
      "Student management",
      "Fees tracking",
      "Attendance monitoring",
      "Homework management",
      "Password hashing (bcrypt)",
      "Supabase Row Level Security (RLS)",
      "Server-side verification",
      "Google Drive integration",
      "WhatsApp API integration"
    ],
    highlights: [
      "Built a secure React-based administration dashboard managing 200+ student records.",
      "Implemented authentication, fees tracking, attendance monitoring, and homework management.",
      "Implemented bcrypt password hashing, Supabase Row Level Security, and server-side verification.",
      "Integrated Google Drive for homework sharing and WhatsApp APIs for absent notifications.",
      "Reduced manual administrative work by approximately 70%."
    ]
  },
  {
    id: "techathon-certificate-generator",
    name: "Techathon Certificate Generator",
    tagline: "Automated Bulk Certificate Generation Platform",
    status: "Completed",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Firebase",
      "PDF Generation"
    ],
    demo: "https://techathon-certificates.onrender.com/",
    description: "A web-based certificate generation platform capable of generating and exporting 500+ personalized certificates in bulk.",
    problem: "Generating hundreds of personalized certificates manually is time-consuming and error-prone.",
    solution: "A bulk certificate generation platform using CSV uploads and automated client/server PDF generation.",
    impact: "Supports 500+ personalized certificates and reduced certificate distribution time from hours to minutes.",
    features: [
      "CSV participant upload",
      "Bulk certificate generation",
      "Participant certificates",
      "Team certificates",
      "Winner certificates",
      "Responsive admin dashboard",
      "Certificate template management",
      "Automated PDF generation"
    ],
    highlights: [
      "Developed a certificate generation platform supporting 500+ personalized certificates.",
      "Supported CSV uploads for participant, team, and winner certificates.",
      "Designed a responsive admin dashboard with event data and template management.",
      "Implemented automated PDF generation, reducing certificate distribution time from hours to minutes."
    ]
  }
];

export const skillsRawJson = {
  "concepts": [
    "Data Structures and Algorithms",
    "Operating Systems (Basics)"
  ],
  "languages": [
    "Python",
    "Java",
    "SQL",
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS"
  ],
  "frameworks_and_technologies": [
    "React",
    "Node.js",
    "Flask",
    "FastAPI",
    "Tailwind CSS"
  ],
  "databases": [
    "PostgreSQL",
    "MongoDB",
    "Supabase",
    "Firebase"
  ],
  "developer_tools": [
    "Git",
    "GitHub Actions",
    "Linux",
    "Google Cloud Platform",
    "VS Code"
  ]
};

export const certificationsData: Certification[] = [
  {
    id: "cert-1",
    title: "AWS APAC – Solutions Architecture Job Simulation",
    tag: "Cloud / Architecture"
  },
  {
    id: "cert-2",
    title: "Foundations of Cybersecurity",
    tag: "Security Fundamentals"
  },
  {
    id: "cert-3",
    title: "Connect and Protect: Networks and Network Security",
    tag: "Network Security"
  },
  {
    id: "cert-4",
    title: "Play It Safe: Manage Security Risks",
    tag: "Risk Management"
  },
  {
    id: "cert-5",
    title: "What is Data Science?",
    tag: "Data Science"
  },
  {
    id: "cert-6",
    title: "Algorithmic Thinking (Part 1)",
    tag: "Algorithms & Logic"
  }
];

export const portfolioStats = {
  projectsCount: 3,
  certificationsCount: 6,
  cgpa: "7.50",
  educationYears: "2023 – 2027"
};
