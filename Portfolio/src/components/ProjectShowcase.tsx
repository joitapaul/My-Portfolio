import { useState } from "react";
import { ExternalLink, Github, Sparkles, Code, Terminal, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { projects } from "../data";
import { Project } from "../types";

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="space-y-8 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            id={`project-card-${project.id}`}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group relative bg-zinc-950/60 border border-zinc-850/80 rounded-2xl overflow-hidden shadow-xl hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] flex flex-col justify-between"
          >
            {/* Top Image / Deco */}
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent z-10" />
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
              />
              <span className="absolute top-4 right-4 bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-fuchsia-400 font-semibold tracking-widest uppercase z-20 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-violet-400" /> AI Systems
              </span>
            </div>

            {/* Content Body */}
            <div className="p-6 relative flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-violet-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-violet-400/80 font-mono mt-1 mb-3 uppercase tracking-wider">{project.subtitle}</p>
                <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3 mb-4">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 text-[10px] font-mono px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex items-center justify-between border-t border-zinc-900 pt-4 mt-auto">
                <button
                  id={`view-study-btn-${project.id}`}
                  onClick={() => setSelectedProject(project)}
                  className="text-xs text-zinc-300 hover:text-violet-400 font-mono font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Terminal className="w-3.5 h-3.5" /> DEPLOY DIAGNOSTICS
                </button>

                <div className="flex items-center space-x-3 text-zinc-500">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-zinc-100 transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4.5 h-4.5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-fuchsia-400 transition-colors"
                      title="Live Interface"
                    >
                      <ExternalLink className="w-4.5 h-4.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expandable Case Study Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              id="project-detail-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[85vh] flex flex-col text-left"
            >
              {/* Header Title */}
              <div className="p-6 border-b border-zinc-900 bg-gradient-to-r from-violet-950/20 to-zinc-950 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-fuchsia-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                    <Code className="w-3.5 h-3.5" /> CORE ARCHITECTURE OVERVIEW
                  </span>
                  <h3 className="text-xl font-bold text-zinc-100">{selectedProject.title}</h3>
                </div>
                <button
                  id="close-modal-btn"
                  onClick={() => setSelectedProject(null)}
                  className="text-zinc-400 hover:text-zinc-100 font-mono text-xs border border-zinc-800 rounded px-2.5 py-1 hover:bg-zinc-900 transition-colors"
                >
                  ESC
                </button>
              </div>

              {/* Scrollable Core */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                {/* Description */}
                <div>
                  <h4 className="text-xs font-mono text-violet-400 uppercase tracking-wider mb-2">SYSTEM SUMMARY</h4>
                  <p className="text-zinc-300 text-xs leading-relaxed">{selectedProject.description}</p>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="text-xs font-mono text-fuchsia-400 uppercase tracking-wider mb-2">INTELLIGENT SUITE FEATURES</h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feat, i) => (
                      <li key={i} className="flex items-start text-xs text-zinc-400">
                        <span className="text-violet-500 mr-2 shrink-0">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Architecture Diagram */}
                {selectedProject.architectureDiagram && (
                  <div className="bg-zinc-900/40 p-4 border border-zinc-900 rounded-xl font-mono text-[11px]">
                    <h4 className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" /> DATA PIPELINE FLOW
                    </h4>
                    <p className="text-zinc-300 bg-zinc-950 p-3 rounded border border-zinc-850/60 leading-relaxed text-center">
                      {selectedProject.architectureDiagram}
                    </p>
                  </div>
                )}

                {/* Case Study */}
                {selectedProject.caseStudy && (
                  <div className="border-t border-zinc-900 pt-4">
                    <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">ENGINEERING IMPACT</h4>
                    <p className="text-zinc-300 text-xs leading-relaxed italic">
                      "{selectedProject.caseStudy}"
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 bg-zinc-900/20 border-t border-zinc-900 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500">Node Status: Active</span>
                <div className="flex space-x-3">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-400 hover:text-zinc-100 flex items-center gap-1 font-mono transition-colors"
                    >
                      <Github className="w-4 h-4" /> CODEBASE
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-fuchsia-400 hover:text-fuchsia-300 flex items-center gap-1 font-mono transition-all"
                    >
                      <ExternalLink className="w-4 h-4" /> INTERACTIVE UI
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
