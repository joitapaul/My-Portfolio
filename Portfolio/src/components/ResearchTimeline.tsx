import { useState } from "react";
import { Award, BookOpen, ChevronRight, GraduationCap, ChevronDown } from "lucide-react";
import { researchPapers } from "../data";

export default function ResearchTimeline() {
  const [expandedPaper, setExpandedPaper] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedPaper(expandedPaper === id ? null : id);
  };

  return (
    <div className="space-y-6 text-left">
      {researchPapers.map((paper) => (
        <div
          key={paper.id}
          id={`research-${paper.id}`}
          className="bg-zinc-950/50 border border-zinc-900 rounded-2xl p-6 hover:border-violet-500/20 transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-semibold tracking-wider uppercase border ${
                  paper.status === "Published"
                    ? "bg-violet-950/40 text-violet-400 border-violet-800/40"
                    : paper.status === "Accepted"
                    ? "bg-emerald-950/40 text-emerald-400 border-emerald-800/40"
                    : "bg-amber-950/40 text-amber-400 border-amber-800/40"
                }`}>
                  {paper.status}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">Published {paper.year}</span>
              </div>
              <h3 className="text-base font-bold text-zinc-100 mt-1.5 hover:text-violet-400 transition-colors">
                {paper.title}
              </h3>
              <p className="text-xs text-zinc-400 font-mono flex items-center gap-1.5 pt-1">
                <GraduationCap className="w-3.5 h-3.5 text-zinc-500" />
                <span>Authors: <span className="text-violet-400">{paper.authors}</span></span>
              </p>
              <p className="text-xs text-zinc-500 font-mono flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
                <span>Venue: <span className="text-violet-400">{paper.venue}</span></span>
              </p>
            </div>

            <button
              id={`toggle-abstract-${paper.id}`}
              onClick={() => toggleExpand(paper.id)}
              className="text-xs font-mono text-zinc-400 hover:text-zinc-100 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 rounded-lg px-3 py-1.5 flex items-center gap-1 self-start transition-all cursor-pointer"
            >
              <span>{expandedPaper === paper.id ? "HIDE ABSTRACT" : "VIEW ABSTRACT"}</span>
              {expandedPaper === paper.id ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Abstract details container */}
          {expandedPaper === paper.id && (
            <div className="mt-4 pt-4 border-t border-zinc-900 space-y-4 animate-fadeIn">
              <div className="space-y-1.5">
                <h4 className="text-[10px] font-mono text-violet-400 uppercase tracking-widest">Scientific Abstract</h4>
                <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/80 p-4 border border-zinc-900 rounded-xl">
                  {paper.abstract}
                </p>
              </div>

              {/* Research Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {paper.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-violet-950/10 border border-violet-900/20 text-violet-300 text-[9px] font-mono px-2.5 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {paper.link && (
                <div className="pt-2 text-left">
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-violet-400 hover:text-violet-300 font-mono font-semibold inline-flex items-center gap-1"
                  >
                    <Award className="w-3.5 h-3.5" /> ACCESS IEEE PUBLICATION DIRECTORY →
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
