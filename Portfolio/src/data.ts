import { Project, Skill, Experience, Certificate, ResearchPaper, BlogPost } from "./types";

export const personalInfo = {
  name: "Joita Paul",
  headline: "Computer Science Undergraduate | Aspiring Data Science & AI Enthusiast",
  bio: "I am a passionate and innovative Computer Science undergraduate with a strong enthusiasm for Data Science, Machine Learning, and Web Technologies. Experienced in building full-stack web solutions and integrating intelligent machine learning pipelines.",
  email: "joitapaul61@gmail.com",
  github: "https://github.com/joitapaul",
  linkedin: "https://www.linkedin.com/in/joita-paul-1149382b4/",
  leetcode: "https://leetcode.com/joitapaul",
  kaggle: "https://kaggle.com/joitapaul",
  resumeUrl: "#", // Anchor or view link
  mission: "To apply my technical expertise and creative problem-solving abilities in addressing real-world challenges while specializing in Data Science and Machine Learning models.",
  vision: "Pioneering the next wave of full-stack AI interfaces where intelligent backend agents and high-performance frontend designs converge into seamless software.",
  goals: [
    "Secure an internship opportunity to apply and expand my technical expertise in Data Science and ML.",
    "Develop and deploy secure, location-aware full-stack applications with scalable backend pipelines.",
    "Achieve optimal performance in NLP-based semantic parsing, speech emotion detection, and RAG architectures."
  ]
};

export const skills: Skill[] = [
  // Programming
  { name: "Python", level: 95, category: "Programming" },
  { name: "Java", level: 85, category: "Programming" },
  { name: "C++", level: 90, category: "Programming" },
  { name: "JavaScript", level: 92, category: "Programming" },
  
  // Frontend
  { name: "React.js", level: 92, category: "Frontend" },
  { name: "HTML5", level: 95, category: "Frontend" },
  { name: "CSS3", level: 90, category: "Frontend" },
  { name: "Tailwind CSS", level: 92, category: "Frontend" },

  // Backend
  { name: "Node.js", level: 88, category: "Backend" },
  { name: "Express.js", level: 90, category: "Backend" },
  { name: "REST APIs", level: 92, category: "Backend" },
  { name: "OOP / Core CS", level: 85, category: "Backend" },

  // Database
  { name: "MongoDB", level: 90, category: "Database" },
  { name: "MySQL", level: 85, category: "Database" },
  { name: "Firebase", level: 80, category: "Database" },
  { name: "SQLite", level: 85, category: "Database" },

  // AI/ML
  { name: "Scikit-learn", level: 90, category: "AI/ML" },
  { name: "NLP (Natural Language)", level: 88, category: "AI/ML" },
  { name: "Vector Databases", level: 85, category: "AI/ML" },
  { name: "RAG Pipelines", level: 88, category: "AI/ML" },
  { name: "Streamlit", level: 92, category: "AI/ML" },

  // Tools
  { name: "Git & GitHub", level: 92, category: "Tools" },
  { name: "Postman", level: 88, category: "Tools" },
  { name: "Netlify", level: 85, category: "Tools" },
  { name: "VS Code", level: 95, category: "Tools" }
];

export const projects: Project[] = [
  {
    id: "civix-platform",
    title: "Civix – Digital Civic Engagement Platform",
    subtitle: "Secure decentralized civic participation portal",
    description: "A secure digital dashboard for modern community engagement, offering certified user authentication, role-based administration, interactive polling systems, and verification-backed civic petitions.",
    features: [
      "Role-based access controls for citizens, local council members, and system administrators.",
      "Real-time polling metrics powered by high-performance aggregate database queries.",
      "Automated signature verification and petition tracking with secure MongoDB state management.",
      "Interactive location-aware issue reporting and voting modules."
    ],
    technologies: ["Node.js", "Express.js", "MongoDB", "React", "JWT Auth", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=600&auto=format&fit=crop",
    githubUrl: "https://github.com/joitapaul",
    liveUrl: "https://github.com/joitapaul",
    caseStudy: "Created to democratize local governance. Solved race-conditions in voting counters using atomic MongoDB operations (`$inc`). Achieved sub-50ms query response times on active community petitions with complex indexes.",
    architectureDiagram: "React Dashboard -> Express Gateway -> JWT Middleware -> MongoDB Server-Authoritative Database"
  },
  {
    id: "smart-expense-tracker",
    title: "Smart Expense Tracker with AI Insights",
    subtitle: "Financial forecasting & trend analytics system",
    description: "An ML-powered personal finance management system that automatically parses transactions, forecasts monthly budgets, and flags spending patterns with interactive Streamlit visualization.",
    features: [
      "Built ML-powered expense categorization using classification algorithms.",
      "Generated financial trend insights through predictive analytics.",
      "Designed interactive Streamlit dashboard for real-time visualization.",
      "Automated spending pattern detection for smarter budgeting."
    ],
    technologies: ["Python", "Streamlit", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop",
    githubUrl: "https://github.com/joitapaul",
    liveUrl: "https://github.com/joitapaul",
    caseStudy: "Designed to help users gain actionable financial insights. Built a custom regression pipeline that reduces prediction error on future balances to under 4.5%. Anomaly detector flags unexpected recurring subscriptions with high precision.",
    architectureDiagram: "Frontend (Streamlit) -> Python Core Client -> Scikit-learn Engine (Regression + Isolation Forest) -> SQLite Store"
  },
  {
    id: "rag-ta",
    title: "RAG-Based AI Teaching Assistant",
    subtitle: "Knowledge-grounded LLM tutor interface",
    description: "An interactive Retrieval-Augmented Generation (RAG) assistant designed for context-aware academic support and semantic search.",
    features: [
      "Implemented Retrieval-Augmented Generation pipeline for contextual Q&A.",
      "Integrated vector embeddings for semantic document search.",
      "Enabled knowledge-grounded responses using LLM workflows.",
      "Built interactive AI tutor interface for academic assistance."
    ],
    technologies: ["Python", "NLP", "Vector DB", "LLM APIs", "Streamlit"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=600&auto=format&fit=crop",
    githubUrl: "https://github.com/joitapaul",
    liveUrl: "https://github.com/joitapaul",
    caseStudy: "Optimized retrieval mechanics by indexing text documents into high-dimensional vector spaces. Implemented cosine similarity search to retrieve relevant context windows, sending grounded prompts to model endpoints.",
    architectureDiagram: "Streamlit UI -> Contextual Query Processor -> Vector DB Similarity Search -> Context Augmentation -> LLM Pipeline"
  },
  {
    id: "vidsnapai",
    title: "AI Reel Generator – VIDSNAPAI",
    subtitle: "Automated script-to-video alignment system",
    description: "An AI-driven automation workflow that translates text scripts into aligned video snippets, custom subtitles, and captioned reels.",
    features: [
      "Developed AI-based script-to-video automation workflow.",
      "Integrated NLP for caption generation and scene alignment.",
      "Enabled automated reel creation using media synthesis pipeline.",
      "Designed lightweight UI for rapid content generation."
    ],
    technologies: ["Python", "NLP", "Media Synthesis", "MoviePy", "OpenCV"],
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600&auto=format&fit=crop",
    githubUrl: "https://github.com/joitapaul",
    liveUrl: "https://github.com/joitapaul",
    caseStudy: "Automated the manual timeline positioning of media blocks. Chained speech-to-text alignment timestamps with rendering layers, exporting high-fidelity vertical reels programmatically.",
    architectureDiagram: "Text Script -> Script Parser & NLP Captioner -> Speech/Media Synthesis Engine -> Render Pipeline (MoviePy/OpenCV)"
  },
  {
    id: "emotion-detection",
    title: "AI Multimodal Emotion Detection System",
    subtitle: "Face, voice, and text emotional state classifier",
    description: "A deep-learning emotion recognition pipeline that analyzes facial expressions, audio features, and text sentiment in real time.",
    features: [
      "Developed a multimodal emotion recognition system using CNN for facial expressions.",
      "Used LSTM networks for text-based sentiment detection.",
      "Implemented speech emotion classification using audio feature extraction techniques (Librosa).",
      "Combined predictions from face, voice, and text inputs to generate accurate final state classifications."
    ],
    technologies: ["Python", "TensorFlow", "OpenCV", "Librosa", "NLP", "CNN", "LSTM"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
    githubUrl: "https://github.com/joitapaul",
    liveUrl: "https://github.com/joitapaul",
    caseStudy: "Fused parallel analytical streams (visual, vocal, and textual) into a unified decision matrix. The CNN achieves high spatial emotion classification accuracy while Librosa processes audio waveforms dynamically.",
    architectureDiagram: "Raw Input Streams (Camera/Mic/Text) -> Feature Extractors (OpenCV/Librosa/NLTK) -> Deep Networks (CNN/LSTM) -> Decisive Fusion Classifier"
  },
  {
    id: "resume-analyzer",
    title: "AI Resume Analyzer & Job Matcher",
    subtitle: "NLP-based resume parsing & similarity scoring",
    description: "An advanced natural language processing system designed to parse resumes and cross-examine them against target job descriptions for high-precision matching.",
    features: [
      "Built NLP-based resume parsing and job-role similarity scoring system.",
      "Implemented semantic keyword matching using transformer embeddings.",
      "Generated ATS-style compatibility scores for candidate evaluation.",
      "Developed Streamlit dashboard for resume insights visualization."
    ],
    technologies: ["Python", "NLP", "Transformers", "Streamlit", "NLTK", "Scikit-learn"],
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=600&auto=format&fit=crop",
    githubUrl: "https://github.com/joitapaul",
    liveUrl: "https://github.com/joitapaul",
    caseStudy: "Allowed candidates to check their match index before applications. Leveraged advanced embeddings and cosine similarity checks on key phrase trees, delivering transparent recommendations for missing competencies.",
    architectureDiagram: "Resume PDF -> PDF Extraction Engine -> Embedding Generator -> Target JD Reference -> Compatibility Scorer"
  }
];

export const experienceTimeline: Experience[] = [
  {
    year: "2023 - 2027",
    title: "B.Tech in Computer Science & Engineering",
    company: "Adamas University, Kolkata",
    description: "Acquiring core knowledge of computer science foundations including Data Structures, Algorithms, Object-Oriented Programming, DBMS, Operating Systems, and advanced Machine Learning/AI methodologies. Maintained a cumulative CGPA of 8.65.",
    skills: ["Data Structures", "Algorithms", "OOP", "DBMS", "Operating Systems", "Python", "Java", "C++"]
  },
  {
    year: "2025",
    title: "Infosys Virtual Internship (Digital Civic Engagement System)",
    company: "Infosys (Virtual Internship)",
    description: "Developed a role-based platform for complaint submission and civic participation. Implemented JWT authentication and constituency-based access control. Built secure REST APIs using Node.js, Express, and MongoDB for issue tracking and voting features.",
    skills: ["Node.js", "Express.js", "MongoDB", "JWT Auth", "REST APIs", "Access Control"]
  }
];

export const researchPapers: ResearchPaper[] = [
  {
    id: "study-1",
    title: "Multimodal Fusion Networks for Speech & Facial Emotion Classification",
    authors: "Joita Paul",
    venue: "Advanced ML & Deep Learning Study Focus",
    year: 2025,
    status: "Accepted",
    abstract: "This research examines the combination of high-dimensional convolutional neural networks (CNN) and long short-term memory networks (LSTM) to classify human emotional states. By performing feature fusion on facial landmark extractions and acoustic frequency waveforms (MFCCs), our system achieves heightened classification accuracy.",
    tags: ["Deep Learning", "CNN-LSTM", "Speech Processing", "Computer Vision"]
  },
  {
    id: "study-2",
    title: "Contextual Query Expansion & Document Retrieval in RAG Frameworks",
    authors: "Joita Paul",
    venue: "AI Systems Engineering R&D focus",
    year: 2026,
    status: "Ongoing",
    abstract: "This work optimizes contextual vector-space lookups in retrieval-augmented translation and tutoring systems. By engineering semantic query expansion protocols, we reduce noise in document chunk retrieval, achieving streamlined context generation for model reasoning.",
    tags: ["NLP", "Vector Embeddings", "RAG Pipelines", "Semantic Search"]
  }
];

export const certificates: Certificate[] = [
  {
    id: "cert-1",
    name: "Google Cloud Arcade Facilitator Certifications (50+ Badges, 20 Games)",
    institution: "Google Cloud Program",
    date: "2025",
    credentialUrl: "https://cloud.google.com"
  },
  {
    id: "cert-2",
    name: "The Ultimate Job Ready Data Science Course",
    institution: "Code with Harry",
    date: "2024",
    credentialUrl: "https://codewithharry.com"
  },
  {
    id: "cert-3",
    name: "5-Star Coding Badge (Python & C++)",
    institution: "HackerRank",
    date: "2024",
    credentialUrl: "https://hackerrank.com"
  },
  {
    id: "cert-4",
    name: "Full Stack Web Development Bootcamp",
    institution: "CodeWithHarry",
    date: "2023",
    credentialUrl: "https://codewithharry.com"
  },
  {
    id: "cert-5",
    name: "JavaScript Algorithms & Data Structures",
    institution: "freeCodeCamp",
    date: "2023",
    credentialUrl: "https://freecodecamp.org"
  },
  {
    id: "cert-6",
    name: "Python Job-Ready Course",
    institution: "CodeWithHarry",
    date: "2023",
    credentialUrl: "https://codewithharry.com"
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "Understanding Gradient Descent from Scratch",
    category: "Machine Learning",
    date: "June 20, 2025",
    readTime: "8 min read",
    featured: true,
    excerpt: "Demystifying the mathematical backbone of modern optimization. We break down cost functions, partial derivatives, learning rates, and gradient steps with intuitive Python visualizations.",
    tags: ["Mathematics", "Python", "Optimizers", "Machine Learning"],
    content: "Gradient descent is the mathematical heart of machine learning. In this post, we explore why and how it works, starting from simple single-variable functions up to multidimensional loss surfaces. We implement vanilla gradient descent, stochastic gradient descent (SGD), and Adam in pure NumPy, demonstrating how momentum accelerates convergence and bypasses local minima."
  },
  {
    id: "blog-2",
    title: "A Practical Roadmap to Modern Data Science",
    category: "Data Science",
    date: "September 14, 2025",
    readTime: "12 min read",
    featured: false,
    excerpt: "Ditch the generic tutorials. An industry-aligned roadmap spanning solid statistics, computational matrix mechanics, advanced Pandas pipelines, SQL indexes, and robust predictive pipelines.",
    tags: ["Career", "Data Science", "Statistics", "Pandas"],
    content: "Transitioning from simple classroom notebooks to production-ready analytical engines is a massive step. This guide outlines the essential path: starting with probability theory and calculus, moving into vectorized pandas operations, robust feature selection, scikit-learn custom transformers, and deploying scalable REST APIs to serve models."
  },
  {
    id: "blog-3",
    title: "Building LLM Agents: Chaining Frameworks vs Pure APIs",
    category: "Artificial Intelligence",
    date: "April 05, 2026",
    readTime: "10 min read",
    featured: true,
    excerpt: "An engineering-first perspective on constructing AI agents. Why hand-rolled semantic routing, structured JSON outputs, and clean REST endpoints often beat bloated orchestration libraries.",
    tags: ["LLM", "Generative AI", "APIs", "System Design"],
    content: "Orchestration libraries are convenient for proof-of-concepts, but their heavy abstractions often mask latency and break in production. This article advocates for lean, deterministic agentic code: using typed JSON schemes, strict system instructions, direct SDK calls, and standard state machines to build reliable tools."
  }
];

export const statistics = [
  { label: "Projects Completed", value: "6+", description: "AI & Full Stack systems" },
  { label: "Google Cloud Badges", value: "50+", description: "Completed arcade facilitator badges" },
  { label: "Undergraduate CGPA", value: "8.65", description: "Adamas University (CSE)" },
  { label: "HackerRank Rank", value: "5-Star", description: "Python & C++ proficiency" },
  { label: "Certificates Completed", value: "6+", description: "Data Science, Web Dev, Cloud" },
  { label: "B.Tech Batch", value: "2023-27", description: "Currently in 6th semester" }
];

export const githubAnalytics = {
  streak: "24 Days",
  reposCount: "32",
  commitsThisYear: "847",
  languages: [
    { name: "Python", percentage: 55, color: "#8b5cf6" },
    { name: "TypeScript", percentage: 22, color: "#a78bfa" },
    { name: "JavaScript", percentage: 15, color: "#f59e0b" },
    { name: "C++", percentage: 8, color: "#ec4899" }
  ],
  commitActivity: [
    { month: "Jan", commits: 45 },
    { month: "Feb", commits: 62 },
    { month: "Mar", commits: 95 },
    { month: "Apr", commits: 110 },
    { month: "May", commits: 80 },
    { month: "Jun", commits: 130 },
    { month: "Jul", commits: 125 }
  ]
};

export const dataScienceDashboard = {
  categoryDistribution: [
    { name: "Machine Learning", value: 40 },
    { name: "Full Stack AI", value: 30 },
    { name: "Data Engineering", value: 15 },
    { name: "Scientific Research", value: 15 }
  ],
  skillsGrowth: [
    { subject: "Python", A: 100, B: 90, fullMark: 100 },
    { subject: "ML Algorithms", A: 95, B: 85, fullMark: 100 },
    { subject: "Full Stack Dev", A: 90, B: 75, fullMark: 100 },
    { subject: "NLP/DL", A: 85, B: 70, fullMark: 100 },
    { subject: "Database Architecture", A: 85, B: 80, fullMark: 100 },
    { subject: "DevOps/Docker", A: 78, B: 60, fullMark: 100 }
  ]
};
