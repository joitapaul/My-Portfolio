import { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  Terminal as TermIcon, 
  Cpu, 
  FolderGit2, 
  BookOpen, 
  Award, 
  User, 
  Mail, 
  ChevronRight, 
  ArrowRight,
  Sun,
  Moon,
  Workflow
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Imports from our modular files
import { personalInfo, skills, experienceTimeline, certificates, statistics } from "./data";
import ThreeBackground from "./components/ThreeBackground";
import CommandTerminal from "./components/CommandTerminal";
import AIChatbot from "./components/AIChatbot";
import ProjectShowcase from "./components/ProjectShowcase";
import ResearchTimeline from "./components/ResearchTimeline";
import BlogSystem from "./components/BlogSystem";
import ResumeDashboard from "./components/ResumeDashboard";
import ContactSection from "./components/ContactSection";
import { DomainDistributionChart, SkillsRadarChart, CommitActivityChart } from "./components/DashboardCharts";

export default function App() {
  // Page Boot Loader state
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("INITIALIZING COMPILER...");
  
  // Theme state: default to 'dark' for the Cyberpunk AI Dashboard
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  
  // Custom cursor position state
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorGlowPos, setCursorGlowPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  // Typewriter roles
  const roles = [
    "AI Engineer",
    "Data Scientist",
    "Machine Learning Engineer",
    "Full Stack Developer"
  ];
  const [currentRoleIdx, setCurrentRoleIdx] = useState(0);
  const [roleText, setRoleText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Scroll Progress
  const [scrollProgress, setScrollProgress] = useState(0);

  // 1. Futuristic Loading Boot Sequence
  useEffect(() => {
    const messages = [
      "ESTABLISHING COGNITIVE CORE...",
      "LOADING PYTHON SCIKIT-LEARN MATRIX...",
      "UPLINKING GOOGLE GEMINI CORE...",
      "RENDER CONSOLE ONLINE // SUCCESS"
    ];
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < messages.length) {
        setLoadingText(messages[idx]);
        idx++;
      } else {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 500);
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);

  // 2. Typewriter Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const activeRole = roles[currentRoleIdx];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setRoleText((prev) => prev.slice(0, -1));
      }, 40);
    } else {
      timer = setTimeout(() => {
        setRoleText((prev) => activeRole.slice(0, prev.length + 1));
      }, 70);
    }

    if (!isDeleting && roleText === activeRole) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && roleText === "") {
      setIsDeleting(false);
      setCurrentRoleIdx((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [roleText, isDeleting, currentRoleIdx]);

  // 3. Track Mouse Coordinates & Scroll Progress
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Check if hovering interactive element for cursor pulse
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, input, textarea, [role='button']");
      setIsHovering(!!isInteractive);
    };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Smooth lazy cursor lag-glow effect
  useEffect(() => {
    let animFrame: number;
    const updateGlow = () => {
      setCursorGlowPos((prev) => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        return {
          x: prev.x + dx * 0.12,
          y: prev.y + dy * 0.12
        };
      });
      animFrame = requestAnimationFrame(updateGlow);
    };
    animFrame = requestAnimationFrame(updateGlow);
    return () => cancelAnimationFrame(animFrame);
  }, [mousePos]);

  // Handle active section navigation jumps
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 85;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className={`${theme} min-h-screen text-zinc-100 transition-colors duration-500 overflow-x-hidden selection:bg-violet-950 selection:text-violet-200`}>
      {/* 3D Neural Node Canvas */}
      {theme === "dark" && <ThreeBackground />}
      
      {/* Scroll Progress Indicator Bar */}
      <div 
        id="scroll-progress-bar" 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-400 to-violet-600 z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Cyber Cursor Tracker (Desktop Only) */}
      <div 
        className="hidden md:block fixed w-2.5 h-2.5 bg-violet-400 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 mix-blend-screen"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />
      <div 
        className={`hidden md:block fixed rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-all duration-150 mix-blend-screen ${
          isHovering 
            ? "w-10 h-10 bg-violet-500/15 border border-violet-500/30 scale-110" 
            : "w-8 h-8 bg-violet-500/5 border border-violet-500/20"
        }`}
        style={{ left: `${cursorGlowPos.x}px`, top: `${cursorGlowPos.y}px` }}
      />

      {/* Boot Sequencer Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            id="page-boot-loader"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-zinc-950 z-50 flex flex-col items-center justify-center font-mono text-xs"
          >
            <div className="space-y-4 max-w-sm w-full px-8 text-left">
              <div className="flex items-center space-x-2.5 mb-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-ping" />
                <span className="text-zinc-400 font-bold tracking-widest text-[10px]">COGNITIVE DIAGNOSTICS DEPLOYING</span>
              </div>
              
              {/* Fake coding diagnostic outputs */}
              <div className="bg-zinc-900 border border-zinc-850 p-4 rounded-xl space-y-1 text-[11px] text-violet-400/80">
                <p>&gt; System identity: Joita Paul</p>
                <p>&gt; Specialization Matrix: AI/ML & Full Stack</p>
                <p>&gt; status: 200 / ONLINE</p>
              </div>

              <div className="text-violet-400 font-semibold tracking-wider text-[10px] uppercase min-h-4">
                {loadingText}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Header Navbar */}
      <nav className={`fixed top-4 left-0 right-0 z-40 mx-auto w-[92%] max-w-5xl rounded-2xl border transition-all duration-300 ${
        theme === "dark"
          ? "bg-zinc-950/75 border-zinc-800/80 backdrop-blur-xl shadow-2xl"
          : "bg-white/80 border-slate-200 backdrop-blur-xl shadow-lg text-slate-800"
      } py-3 px-6 flex items-center justify-between`}>
        {/* Brand Logo */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); handleScrollTo("home"); }}
          className="flex items-center space-x-2 font-mono font-extrabold tracking-tight text-xs uppercase group"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-400 p-0.5 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Cpu className="w-3.5 h-3.5 text-white" />
          </div>
          <span className={theme === "dark" ? "text-zinc-100" : "text-slate-800"}>
            {personalInfo.name.split(" ")[0]}
            <span className="text-violet-500">.</span>
            {personalInfo.name.split(" ")[1]}
          </span>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-1.5">
          {["home", "about", "skills", "projects", "research", "blog", "resume", "contact"].map((sec) => (
            <button
              key={sec}
              onClick={() => handleScrollTo(sec)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono uppercase tracking-widest transition-colors ${
                theme === "dark" ? "text-zinc-400 hover:text-zinc-100" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Dark/Light Toggle */}
        <button
          id="theme-mode-toggle"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={`p-2 rounded-xl border transition-colors ${
            theme === "dark" 
              ? "bg-zinc-900 border-zinc-800 text-yellow-400 hover:text-white hover:border-zinc-700" 
              : "bg-slate-100 border-slate-200 text-violet-600 hover:bg-slate-200"
          }`}
          title="Toggle Cybermatic Preset"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </nav>

      {/* CORE WRAPPER */}
      <main className={`pt-24 pb-20 px-4 md:px-8 max-w-5xl mx-auto space-y-28 relative z-10 ${
        theme === "light" ? "bg-slate-50 text-slate-800" : ""
      }`}>
        
        {/* SECTION 1: HERO CONTAINER */}
        <section id="home" className="min-h-[80vh] flex flex-col justify-center items-center text-center py-12 relative">
          <div className="space-y-6 max-w-3xl">
            {/* Super header badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono border uppercase tracking-wider ${
                theme === "dark" 
                  ? "bg-violet-950/30 text-violet-400 border-violet-900/40" 
                  : "bg-violet-50 text-violet-700 border-violet-200"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-violet-500" />
              <span>COGNITIVE MATRIX ONLINE // CSE SPECIALIST</span>
            </motion.div>

            {/* Name heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-5xl md:text-7xl font-black tracking-tight"
            >
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-400 to-violet-600 bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                {personalInfo.name.toUpperCase()}
              </span>
            </motion.h1>

            {/* Subtitle typewriter */}
            <div className="h-8 flex items-center justify-center font-mono">
              <span className={`text-sm md:text-lg font-bold ${theme === "dark" ? "text-violet-300" : "text-violet-600"}`}>
                {roleText}
              </span>
              <span className="w-1.5 h-5 bg-violet-500 ml-1.5 animate-pulse shrink-0" />
            </div>

            {/* bio summary */}
            <p className={`text-xs md:text-sm max-w-xl mx-auto leading-relaxed ${
              theme === "dark" ? "text-zinc-400" : "text-slate-600 font-medium"
            }`}>
              {personalInfo.bio}
            </p>

            {/* Buttons list */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
              <button
                id="hero-view-projects-btn"
                onClick={() => handleScrollTo("projects")}
                className="bg-violet-600 hover:bg-violet-700 text-white font-mono font-bold text-xs py-3 px-6 rounded-xl flex items-center gap-1.5 shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:shadow-[0_0_30px_rgba(139,92,246,0.45)] transition-all cursor-pointer active:scale-95"
              >
                VIEW PROJECTS <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="hero-download-resume-btn"
                onClick={() => handleScrollTo("resume")}
                className={`font-mono font-bold text-xs py-3 px-6 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                  theme === "dark"
                    ? "bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                AUDIT RESUME
              </button>
              <button
                id="hero-hire-me-btn"
                onClick={() => handleScrollTo("contact")}
                className="text-xs font-mono text-violet-400 font-bold hover:text-violet-300 flex items-center gap-1.5 cursor-pointer"
              >
                HIRE ME <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full mt-16 text-left">
            {statistics.map((stat) => (
              <div 
                key={stat.label}
                className={`p-4 border rounded-2xl flex flex-col justify-between ${
                  theme === "dark" 
                    ? "bg-zinc-950/40 border-zinc-900 hover:border-violet-500/20" 
                    : "bg-white border-slate-200 shadow-sm"
                } transition-all duration-300`}
              >
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">{stat.label}</span>
                  <span className="text-2xl font-black text-transparent bg-gradient-to-tr from-violet-500 to-fuchsia-400 bg-clip-text mt-1.5 block">
                    {stat.value}
                  </span>
                </div>
                <span className="text-[9px] text-zinc-500 font-mono mt-2">{stat.description}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: ABOUT / TIMELINE */}
        <section id="about" className="space-y-12">
          {/* Header */}
          <div className="text-left space-y-2">
            <span className="text-[10px] font-mono text-violet-500 uppercase tracking-widest block font-bold">ABOUT CORES</span>
            <h2 className="text-2xl md:text-3xl font-black uppercase">Professional Diagnostic Identity</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 text-left">
            {/* Visual avatar card */}
            <div className="lg:col-span-2 space-y-4">
              <div className={`p-6 border rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden h-72 ${
                theme === "dark" ? "bg-zinc-950/40 border-zinc-900" : "bg-white border-slate-200 shadow-sm"
              }`}>
                {/* Cyber hexagonal vector frame */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-400 p-1 flex items-center justify-center shadow-2xl relative z-10">
                  <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-violet-400">
                    <User className="w-16 h-16" />
                  </div>
                </div>
                <h4 className="text-base font-extrabold text-zinc-100 mt-5 uppercase">{personalInfo.name}</h4>
                <p className="text-[10px] font-mono text-violet-400 mt-1 uppercase tracking-wider">{personalInfo.headline}</p>
                <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-full blur-2xl pointer-events-none" />
              </div>

              {/* Personal Mission cards */}
              <div className={`p-5 border rounded-2xl space-y-3.5 ${
                theme === "dark" ? "bg-zinc-950/40 border-zinc-900" : "bg-white border-slate-200 shadow-sm"
              }`}>
                <h4 className="text-xs font-mono text-violet-400 uppercase font-bold tracking-wider">Mission Statement</h4>
                <p className="text-xs text-zinc-400 leading-relaxed italic">
                  "{personalInfo.mission}"
                </p>
                <div className="pt-2 border-t border-zinc-900/60">
                  <h4 className="text-xs font-mono text-violet-400 uppercase font-bold tracking-wider mb-2">Core Goals</h4>
                  <ul className="space-y-1.5 text-xs text-zinc-400">
                    {personalInfo.goals.map((goal, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-violet-500 mr-2 font-bold">•</span>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Educational / Career Timeline */}
            <div className="lg:col-span-3 space-y-6">
              <h3 className="text-sm font-bold font-mono text-violet-400 uppercase tracking-widest flex items-center gap-2">
                <Workflow className="w-4.5 h-4.5 text-violet-500" /> TIMELINE PACKETS
              </h3>
              
              {/* Timeline Container */}
              <div className="relative border-l border-zinc-900 ml-3 space-y-8 text-xs text-zinc-400">
                {experienceTimeline.map((item, idx) => (
                  <div key={idx} className="relative pl-6">
                    {/* Circle tracker pin */}
                    <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-400 border border-zinc-950 shadow-[0_0_10px_rgba(139,92,246,0.2)]" />
                    
                    <span className="text-violet-400 font-mono font-bold tracking-wider text-[11px] block">{item.year} // {item.company.toUpperCase()}</span>
                    <h4 className="text-sm font-bold text-zinc-100 mt-1 uppercase">{item.title}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed mt-2">{item.description}</p>
                    
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {item.skills.map((s) => (
                        <span 
                          key={s}
                          className="bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded text-[9px] font-mono text-zinc-500"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE SKILLS SECTION */}
        <section id="skills" className="space-y-12">
          {/* Header */}
          <div className="text-left space-y-2">
            <span className="text-[10px] font-mono text-violet-500 uppercase tracking-widest block font-bold">SKILLS GRID</span>
            <h2 className="text-2xl md:text-3xl font-black uppercase">Technical Skill Index</h2>
          </div>

          {/* Group categories cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {(["Programming", "Frontend", "Backend", "Database", "AI/ML", "Tools"] as const).map((cat) => (
              <div 
                key={cat}
                className={`p-5 border rounded-2xl space-y-4 ${
                  theme === "dark" ? "bg-zinc-950/40 border-zinc-900" : "bg-white border-slate-200 shadow-sm"
                }`}
              >
                <h3 className="text-xs font-mono text-violet-400 uppercase tracking-widest font-bold border-b border-zinc-900/60 pb-2 flex items-center justify-between">
                  <span>{cat}</span>
                  <TermIcon className="w-3.5 h-3.5 text-zinc-500" />
                </h3>
                <div className="space-y-3">
                  {skills.filter((s) => s.category === cat).map((s) => (
                    <div key={s.name} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                        <span>{s.name}</span>
                        <span className="text-violet-400 font-bold">{s.level}%</span>
                      </div>
                      {/* Custom progress track */}
                      <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-400 rounded-full"
                          style={{ width: `${s.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: PROJECTS MODULE */}
        <section id="projects" className="space-y-12">
          {/* Header */}
          <div className="text-left space-y-2">
            <span className="text-[10px] font-mono text-violet-500 uppercase tracking-widest block font-bold">PORTFOLIO showcase</span>
            <h2 className="text-2xl md:text-3xl font-black uppercase">Production-Grade Implementations</h2>
          </div>

          <ProjectShowcase />
        </section>

        {/* SECTION 5: DATA SCIENCE DASHBOARD */}
        <section id="dashboard" className="space-y-12">
          {/* Header */}
          <div className="text-left space-y-2">
            <span className="text-[10px] font-mono text-violet-500 uppercase tracking-widest block font-bold">DASHBOARD CORE</span>
            <h2 className="text-2xl md:text-3xl font-black uppercase">Data Science & GitHub Telemetry</h2>
          </div>

          {/* Bento grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DomainDistributionChart />
            <SkillsRadarChart />
            <CommitActivityChart />
          </div>
        </section>

        {/* SECTION 6: RESEARCH PORTFOLIO */}
        <section id="research" className="space-y-12">
          {/* Header */}
          <div className="text-left space-y-2">
            <span className="text-[10px] font-mono text-violet-500 uppercase tracking-widest block font-bold">RESEARCH INITIATIVES</span>
            <h2 className="text-2xl md:text-3xl font-black uppercase">Academic Contributions & Papers</h2>
          </div>

          <ResearchTimeline />
        </section>

        {/* SECTION 7: CERTIFICATIONS */}
        <section className="space-y-12">
          {/* Header */}
          <div className="text-left space-y-2">
            <span className="text-[10px] font-mono text-violet-500 uppercase tracking-widest block font-bold">VERIFIABLE MATRIX</span>
            <h2 className="text-2xl md:text-3xl font-black uppercase">Credentials & Certifications</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {certificates.map((cert) => (
              <div 
                key={cert.id}
                className={`p-4 border rounded-xl flex flex-col justify-between hover:border-violet-500/20 transition-colors ${
                  theme === "dark" ? "bg-zinc-950/40 border-zinc-900" : "bg-white border-slate-200 shadow-sm"
                }`}
              >
                <div>
                  <Award className="w-6 h-6 text-violet-400 mb-3" />
                  <h4 className="text-xs font-extrabold text-zinc-100 uppercase">{cert.name}</h4>
                  <p className="text-[10px] text-zinc-400 font-mono mt-1">{cert.institution}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-zinc-900 flex justify-between items-center text-[10px] font-mono">
                  <span className="text-zinc-500">{cert.date}</span>
                  {cert.credentialUrl && (
                    <a 
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-400 hover:text-violet-300 font-bold flex items-center gap-0.5"
                    >
                      VERIFY <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 8: BLOG MODULE */}
        <section id="blog" className="space-y-12">
          {/* Header */}
          <div className="text-left space-y-2">
            <span className="text-[10px] font-mono text-violet-500 uppercase tracking-widest block font-bold">KNOWLEDGE TRANSMISSIONS</span>
            <h2 className="text-2xl md:text-3xl font-black uppercase">Scientific Blogs &Roadmaps</h2>
          </div>

          <BlogSystem />
        </section>

        {/* SECTION 9: RESUME MODULE */}
        <section id="resume" className="space-y-12">
          {/* Header */}
          <div className="text-left space-y-2">
            <span className="text-[10px] font-mono text-violet-500 uppercase tracking-widest block font-bold">VERIFIABLE DOSSIER</span>
            <h2 className="text-2xl md:text-3xl font-black uppercase">Professional Resume Dashboard</h2>
          </div>

          <ResumeDashboard />
        </section>

        {/* SECTION 10: INTERACTIVE CLI TERMINAL */}
        <section className="space-y-12">
          <div className="text-left space-y-2">
            <span className="text-[10px] font-mono text-violet-500 uppercase tracking-widest block font-bold">TERMINAL ACCESS</span>
            <h2 className="text-2xl md:text-3xl font-black uppercase">Developer Console Interface</h2>
          </div>

          <CommandTerminal />
        </section>

        {/* SECTION 11: CONTACT GATEWAY */}
        <section id="contact" className="space-y-12">
          {/* Header */}
          <div className="text-left space-y-2">
            <span className="text-[10px] font-mono text-violet-500 uppercase tracking-widest block font-bold">ESTABLISH UPLINK</span>
            <h2 className="text-2xl md:text-3xl font-black uppercase">Connect Communication Channels</h2>
          </div>

          <ContactSection />
        </section>

      </main>

      {/* Floating AI Cognitive Assistant */}
      <AIChatbot />
    </div>
  );
}
