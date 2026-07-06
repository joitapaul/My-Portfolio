import React, { useState, useRef, useEffect } from "react";
import { Terminal, CornerDownLeft, Circle } from "lucide-react";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "info";
}

export default function CommandTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "JOITA PAUL [Version 1.0.0-CyberAgent]", type: "info" },
    { text: "Cognitive AI terminal uplink established. Type 'help' for core commands.", type: "info" },
    { text: "", type: "output" }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    const newHistory = [...history, { text: `> ${cmdStr}`, type: "input" as const }];

    if (trimmed === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (!trimmed) {
      setHistory(newHistory);
      setInput("");
      return;
    }

    setCommandHistory((prev) => [cmdStr, ...prev]);
    setHistoryIndex(-1);

    let outputLines: TerminalLine[] = [];

    switch (trimmed) {
      case "help":
        outputLines = [
          { text: "Available Cyber Commands:", type: "info" },
          { text: "  whoami   - Display bio and developer identity", type: "output" },
          { text: "  skills   - List technical competencies", type: "output" },
          { text: "  projects - Show summary of active production-grade projects", type: "output" },
          { text: "  papers   - Query published research abstracts", type: "output" },
          { text: "  contact  - Print encrypted communication channels", type: "output" },
          { text: "  clear    - Flush terminal diagnostics", type: "output" }
        ];
        break;

      case "whoami":
        outputLines = [
          { text: "Identity Matrix: Joita Paul", type: "info" },
          { text: "Role: Final Year Computer Science Engineering Student", type: "output" },
          { text: "Specialization: AI / Data Science / ML / Full Stack Web Architecture", type: "output" },
          { text: "Mission: 'Building Intelligent Systems That Solve Real World Problems'", type: "output" },
          { text: "Location: India | Space-Time Zone: UTC-07:00", type: "output" }
        ];
        break;

      case "skills":
        outputLines = [
          { text: "Core Cognitive Engine Competencies:", type: "info" },
          { text: "  - Programming: Python, C++, JavaScript, TypeScript", type: "output" },
          { text: "  - AI/ML Core: Scikit-learn, Pandas, NumPy, TensorFlow, NLP, Deep Learning", type: "output" },
          { text: "  - Frontend: React, Next.js, Tailwind CSS, HTML5/CSS3", type: "output" },
          { text: "  - Backend & Cloud: Node.js, Express.js, JWT, REST Gateways, MongoDB, Docker", type: "output" }
        ];
        break;

      case "projects":
        outputLines = [
          { text: "Active Project Repositories [4 Completed]:", type: "info" },
          { text: "  1. Smart Expense Tracker - Scikit-Learn Time Series & Anomaly Detection (Isolation Forest)", type: "output" },
          { text: "  2. Fake News Verifier AI - Deep TF-IDF Vectorizers & Google Gemini Grounding API", type: "output" },
          { text: "  3. Civix Platform - Role-Based Engagement Portal with Atomic Mongo Counters", type: "output" },
          { text: "  4. Resume Analyzer AI - Cosine Similarity Resume parser & Job ATS Scorer", type: "output" }
        ];
        break;

      case "papers":
        outputLines = [
          { text: "Academic & Research Publications:", type: "info" },
          { text: "  - [IEEE 2025] 'Optimizing Low-Resource Language Translation Using Hybrid Transformer Networks'", type: "output" },
          { text: "  - [CS 2026] 'Deep Temporal Forecasting for Urban Microclimate Anomaly Detection'", type: "output" },
          { text: "  - [Ongoing] 'Self-Supervised Contrastive Learning in Document Summarization Engine'", type: "output" }
        ];
        break;

      case "contact":
        outputLines = [
          { text: "Secure Communication Gateways:", type: "info" },
          { text: "  - Direct Email: joitapaul61@gmail.com", type: "output" },
          { text: "  - LinkedIn: linkedin.com/in/joitapaul", type: "output" },
          { text: "  - GitHub Matrix: github.com/joitapaul", type: "output" }
        ];
        break;

      default:
        outputLines = [
          { text: `Error: Command '${trimmed}' not found.`, type: "error" },
          { text: "Type 'help' to audit system commands.", type: "info" }
        ];
        break;
    }

    setHistory([...newHistory, ...outputLines]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div id="command-terminal" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl font-mono text-xs overflow-hidden max-w-3xl mx-auto backdrop-blur-md bg-opacity-90">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-900 bg-zinc-900/60 select-none">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <Circle className="w-3 h-3 text-red-500 fill-red-500/30" />
            <Circle className="w-3 h-3 text-yellow-500 fill-yellow-500/30" />
            <Circle className="w-3 h-3 text-emerald-500 fill-emerald-500/30" />
          </div>
          <span className="text-zinc-400 font-medium ml-2">cyber-terminal://joitapaul-matrix</span>
        </div>
        <div className="flex items-center text-zinc-500 text-[10px]">
          <Terminal className="w-3 h-3 mr-1" />
          <span>BASH (v5.2.15)</span>
        </div>
      </div>

      {/* Output Console */}
      <div
        ref={scrollRef}
        className="p-4 h-64 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent text-left"
      >
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap leading-relaxed ${
              line.type === "input"
                ? "text-violet-400"
                : line.type === "error"
                ? "text-rose-500 font-semibold"
                : line.type === "info"
                ? "text-violet-300 font-medium"
                : "text-zinc-300"
            }`}
          >
            {line.text}
          </div>
        ))}
      </div>

      {/* Input Prompter */}
      <div className="flex items-center border-t border-zinc-900 px-4 py-2 bg-zinc-950/80">
        <span className="text-violet-400 mr-2 select-none">guest@joitapaul:~#</span>
        <input
          id="terminal-input-field"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Query terminal matrix..."
          className="flex-1 bg-transparent border-none outline-none text-violet-200 focus:ring-0 placeholder-zinc-700 py-0.5 selection:bg-violet-900/40"
          autoComplete="off"
          spellCheck="false"
        />
        <div className="flex items-center text-zinc-600 select-none ml-2">
          <span className="text-[9px] mr-1">ENTER</span>
          <CornerDownLeft className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}
