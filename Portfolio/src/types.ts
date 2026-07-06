export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  caseStudy?: string;
  architectureDiagram?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: "Programming" | "Frontend" | "Backend" | "Database" | "AI/ML" | "Tools";
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  status: "Published" | "Under Review" | "Ongoing" | "Accepted";
  link?: string;
  abstract: string;
  tags: string[];
}

export interface Experience {
  year: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
}

export interface Certificate {
  id: string;
  name: string;
  institution: string;
  date: string;
  credentialUrl?: string;
  image?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  tags: string[];
  featured?: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model" | "system";
  text: string;
  timestamp: string;
}
