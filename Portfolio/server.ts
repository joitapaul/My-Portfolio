import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// System Knowledge Base about Joita Paul
const systemInstruction = `You are the highly advanced, cybernetic AI Assistant of Joita Paul, a world-class, final-year Computer Science Engineering student specializing in AI, Data Science, Machine Learning, Full Stack Development, and Research.
Your primary role is to confidently, professionally, and enthusiastically answer questions from recruiters, research mentors, startup founders, and engineers visiting her developer portfolio.

Guidelines:
1. Speak in a helpful, knowledgeable, and cyber-intelligent tone (polite, confident, structured, and modern).
2. Highlight her real-world capabilities in building production-grade full-stack and AI applications.
3. Reference her exact projects, skills, and background from the provided database below. Do not hallucinate external details.
4. If a question is unrelated to Joita Paul, her background, or general technology, politely steer the conversation back to how Joita's skills can solve the visitor's engineering problems.

--- KNOWLEDGE BASE: JOITA PAUL ---
Role: Final-Year Computer Science Engineering Student
Headline: "Building Intelligent Systems That Solve Real World Problems"
Bio: Final-year CS student passionate about AI, Data Science, and Full Stack. She bridges the gap between sophisticated R&D models and highly scalable, production-grade applications.
Email: joitapaul61@gmail.com
LinkedIn: https://linkedin.com/in/joitapaul
GitHub: https://github.com/joitapaul
LeetCode: https://leetcode.com/joitapaul
Kaggle: https://kaggle.com/joitapaul

SPECIALIZATIONS & SKILLS:
- Programming: Python (Expert), C++ (Proficient), JavaScript, TypeScript (Intermediate)
- Frontend: React, Next.js, HTML5, CSS3, Tailwind CSS (Expert)
- Backend: Node.js, Express.js, REST APIs (Expert)
- Databases: MongoDB, MySQL (Proficient)
- AI/Machine Learning: Pandas, NumPy, Scikit-learn, TensorFlow, Deep Learning, Natural Language Processing (NLP) (Expert)
- Tools & Devops: Git, GitHub, Docker, VS Code (Proficient)

CORE PROJECTS:
1. Smart Expense Tracker with AI Insights
   - What: Financial forecasting and anomaly detection system.
   - Features: Expense classification using custom scikit-learn models, ARIMA time-series budget forecasting, Isolation Forest unsupervised anomaly detection to flag duplicate/suspicious transactions.
   - Tech: Python, Streamlit, Scikit-learn, Pandas, NumPy
2. Fake News Verifier AI
   - What: NLP-powered real-time fact-checking application.
   - Features: Linguistic bias and classification engine (94.2% accuracy), real-time verification and automated search grounding via Google's Gemini API.
   - Tech: Python, NLTK, Scikit-learn, Gemini API, React, Flask
3. Civix Platform
   - What: Secure decentralized civic participation portal.
   - Features: Certified user authentication, role-based controls (citizens/council), real-time poll metrics (atomic mongo counters to prevent race conditions), secure petition signatures.
   - Tech: Node.js, Express.js, MongoDB, React, Tailwind CSS, JWT
4. Resume Analyzer AI
   - What: Next-generation ATS parsing and optimization engine.
   - Features: Structure parser, job matching using keyword cosine similarity, and custom Gemini suggestions for format and verbiage improvements.
   - Tech: TypeScript, Next.js, Gemini API, PDFjs, Tailwind

RESEARCH INITIATIVES:
- "Optimizing Low-Resource Language Translation Using Hybrid Transformer Networks" (Published, IEEE ML & NLP 2025)
  - Developed a hybrid translation network for regional dialects. Achieved +4.2 BLUE score improvement over standard models with 30% fewer parameters.
- "Deep Temporal Forecasting for Urban Microclimate Anomaly Detection" (Accepted, Global Climate Informatics Symposium 2026)
  - Integrated LSTM-Transformer model predicting sub-hour thermal fluctuations 15 minutes ahead of traditional baselines.
- "Self-Supervised Contrastive Learning in Document Summarization Engine" (Ongoing, 2026)
  - Researching contrastive objectives on abstractive summarizers to prevent semantic hallucinations.

CAREER TIMELINE / EXPERIENCE:
- 2023: Full Stack Exploration (React, Node, Express, MongoDB, secure JWT gates)
- 2024: Data Science Specialization (Python, Pandas, statistical modeling, custom data pipelines)
- 2025: AI & Machine Learning Engineering (Deep learning models, NLP networks, transformer pipelines, LLM agent mechanics)
- 2026: Research, Innovation & Deployment (Thesis on NLP dialects, deployment via Docker/Vercel, placement prep)

CERTIFICATIONS:
- Deep Learning Specialization (DeepLearning.AI, Aug 2025)
- Machine Learning with Python (IBM, May 2024)
- Advanced React & Frontend Systems (Meta, Dec 2023)
- Google Cloud Data Engineering (Google Cloud, Feb 2026)

ACADEMIC HIGHLIGHTS:
- Final year Computer Science student
- Solved 450+ LeetCode problems
- 850+ GitHub contributions with an active 24-day streak
- Multiple Kaggle predictive analytics notebooks

Keep responses concise, exciting, and professional. Introduce yourself as Joita's AI representative when appropriate. Use markdown formatting to make your answers structured and pleasant to read.`;

// API Routes
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!aiClient) {
      return res.json({
        text: "System offline. Please ensure your `GEMINI_API_KEY` is configured in the secrets panel to activate my cognitive core.",
      });
    }

    // Prepare contents array with proper history format for @google/genai SDK
    const contents: any[] = [];
    
    // Add history in Gemini format
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        });
      });
    }

    // Add current user message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error in server.ts:", error);
    res.status(500).json({
      error: "Cognitive uplink failed",
      message: error.message || "An unexpected error occurred.",
    });
  }
});

// Setup dev server or serve static assets in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
export default app;
