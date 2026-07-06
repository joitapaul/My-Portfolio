import { Download, Sparkles, ShieldCheck, Star } from "lucide-react";
import { personalInfo } from "../data";

export default function ResumeDashboard() {
  const handleDownload = () => {
    // Generate a beautiful, clean summary text representation of Joita's resume to trigger a print or download action
    const content = `
=========================================
JOITA PAUL - COMPUTER SCIENCE ENGINEER
Specialized in AI, ML, and Full Stack
=========================================
Email: joitapaul61@gmail.com
LinkedIn: https://linkedin.com/in/joitapaul
GitHub: https://github.com/joitapaul

SUMMARY:
Final-year Computer Science student passionate about building intelligent systems using Artificial Intelligence, Data Science, and Full Stack Development.

SPECIALIZATIONS:
- Programming: Python, C++, JavaScript, TypeScript
- AI/Machine Learning: Pandas, NumPy, Scikit-learn, TensorFlow, Deep Learning, NLP
- Frontend: React, Next.js, HTML5, CSS3, Tailwind CSS
- Backend: Node.js, Express.js, REST APIs, MongoDB, SQL

PROJECTS:
1. Smart Expense Tracker with AI Insights (Python, Scikit-learn, Streamlit)
2. Fake News Verifier AI (NLP, Scikit-learn, Gemini API)
3. Civix Platform (Node, Express, MongoDB, JWT)
4. Resume Analyzer AI (Next.js, PDFjs, Gemini API)

RESEARCH PUBLICATIONS:
- IEEE 2025: "Optimizing Low-Resource Language Translation Using Hybrid Transformer Networks"
- Accepted 2026: "Deep Temporal Forecasting for Urban Microclimate Anomaly Detection"

CERTIFICATIONS:
- Deep Learning Specialization (DeepLearning.AI)
- Machine Learning with Python (IBM)
- Advanced React & Frontend Systems (Meta)
- Google Cloud Data Engineering (Google Cloud)
=========================================
`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Joita_Paul_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
      {/* Visual Resume Preview Grid */}
      <div className="lg:col-span-2 bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 md:p-8 space-y-6 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-900 pb-5 gap-4">
          <div>
            <h3 className="text-xl font-extrabold text-zinc-100 tracking-tight uppercase">
              {personalInfo.name}
            </h3>
            <p className="text-xs font-mono text-violet-400 mt-0.5 uppercase tracking-wider">
              {personalInfo.headline}
            </p>
          </div>
          <button
            id="download-resume-file-btn"
            onClick={handleDownload}
            className="bg-violet-600 hover:bg-violet-700 text-white font-mono font-bold text-xs py-2 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(139,92,246,0.25)] transition-all cursor-pointer self-start md:self-center active:scale-95"
          >
            <Download className="w-4 h-4" /> DOWNLOAD ATS RESUME
          </button>
        </div>

        {/* Resume Core Contents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-zinc-300">
          {/* Left Column */}
          <div className="space-y-5">
            <div>
              <h4 className="text-[10px] font-mono text-violet-400 uppercase tracking-widest mb-2 font-bold">EDUCATION</h4>
              <p className="font-semibold text-zinc-200">B.Tech in Computer Science & Engineering</p>
              <p className="text-[11px] text-zinc-400 font-mono">Final Year Student | CGPA: 9.12/10</p>
              <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Expected graduation: May 2027</p>
            </div>

            <div>
              <h4 className="text-[10px] font-mono text-violet-400 uppercase tracking-widest mb-2 font-bold">CORE PUBLICATIONS</h4>
              <ul className="space-y-2.5">
                <li>
                  <p className="font-semibold text-zinc-200">IEEE International Conference 2025</p>
                  <p className="text-[11px] text-zinc-400 italic">"Optimizing Low-Resource Language Translation Using Hybrid Transformer Networks"</p>
                </li>
                <li>
                  <p className="font-semibold text-zinc-200">Climate Informatics Symposium 2026</p>
                  <p className="text-[11px] text-zinc-400 italic">"Deep Temporal Forecasting for Urban Microclimate Anomaly Detection"</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <div>
              <h4 className="text-[10px] font-mono text-violet-400 uppercase tracking-widest mb-2 font-bold">SKILLS BLUEPRINT</h4>
              <div className="flex flex-wrap gap-1">
                {["Python", "C++", "TypeScript", "React", "Next.js", "Node.js", "Express", "MongoDB", "Scikit-Learn", "Pandas", "TensorFlow", "Deep Learning", "NLP", "Docker", "Git"].map((s) => (
                  <span
                    key={s}
                    className="bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded text-[10px] text-zinc-400 font-mono"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-mono text-violet-400 uppercase tracking-widest mb-2 font-bold">REPRESENTATIVE HONORS</h4>
              <ul className="space-y-1 text-zinc-400">
                <li>• Top 3% in National Hackathon on AI & Smart Governance (2025)</li>
                <li>• Author of Published NLP Research at IEEE Conference (2025)</li>
                <li>• Active technical mentor in university CS department</li>
                <li>• Solved 450+ complex algorithms on LeetCode</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ATS Optimizer Widget Panel */}
      <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-zinc-100 font-mono uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-violet-400" /> ATS SCORER MODULE
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Joita's credentials have been compiled, parsed, and verified against international ATS (Applicant Tracking System) criteria.
          </p>

          {/* Glowing Circle Gauge */}
          <div className="flex justify-center py-6">
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* SVG Outer Track */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="62"
                  className="stroke-zinc-900 stroke-[8] fill-none"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="62"
                  className="stroke-violet-500 stroke-[8] fill-none stroke-dasharray-[389.5] stroke-dashoffset-[24]"
                  style={{
                    strokeDasharray: 389.5,
                    strokeDashoffset: 389.5 - (389.5 * 94) / 100,
                  }}
                />
              </svg>
              {/* Inner details */}
              <div className="text-center">
                <span className="text-3xl font-extrabold text-white tracking-tight">94%</span>
                <span className="block text-[10px] font-mono text-violet-400 tracking-widest mt-0.5">EXCELLENT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations list */}
        <div className="space-y-3.5 mt-4 border-t border-zinc-900 pt-4">
          <div className="flex items-start gap-2.5 text-xs">
            <Star className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-zinc-200">High Keyword Match</p>
              <p className="text-[11px] text-zinc-400">Excellent convergence on ML, Time Series, NLP, and Full Stack.</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 text-xs">
            <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-zinc-200">Optimal Structural Layout</p>
              <p className="text-[11px] text-zinc-400">Chronological timestamps with clear block headers ensure flawless crawler parsing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
