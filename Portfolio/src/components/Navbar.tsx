import React, { useState, useEffect } from "react";
import { Menu, X, Terminal, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { personalInfo } from "../data";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Blog", href: "#blog" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section highlight based on scroll position
      const sections = navLinks.map(l => l.href.replace("#", ""));
      let currentSection = "home";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-4 left-0 right-0 z-40 mx-auto w-[92%] max-w-5xl rounded-2xl border transition-all duration-300 ${
      scrolled 
        ? "bg-zinc-950/75 border-zinc-800/80 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] py-3" 
        : "bg-transparent border-transparent py-5"
    }`}>
      <div className="flex items-center justify-between px-6">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick(e, "#home")}
          className="flex items-center space-x-2 text-zinc-100 font-mono font-bold tracking-tight text-sm uppercase group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.35)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <span>
            {personalInfo.name.split(" ")[0]}
            <span className="text-purple-500">.</span>
            {personalInfo.name.split(" ")[1]}
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-1.5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-medium font-mono uppercase tracking-wider transition-colors duration-200 ${
                activeSection === link.href.replace("#", "")
                  ? "text-purple-400"
                  : "text-zinc-400 hover:text-zinc-100"
              }`}
            >
              {link.label}
              {activeSection === link.href.replace("#", "") && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-purple-500/10 border border-purple-500/20 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="text-zinc-400 hover:text-zinc-100 p-1 rounded-lg hover:bg-zinc-900 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-zinc-900 bg-zinc-950/95 backdrop-blur-2xl rounded-b-2xl mt-3 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-sm font-mono uppercase tracking-widest py-2 px-3 rounded-lg block transition-colors ${
                    activeSection === link.href.replace("#", "")
                      ? "text-purple-400 bg-purple-500/5 border-l-2 border-purple-500"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
