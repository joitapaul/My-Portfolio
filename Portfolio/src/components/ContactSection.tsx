import React, { useState } from "react";
import { Send, CheckCircle, Github, Linkedin, Mail, ExternalLink, Activity } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { personalInfo } from "../data";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate sending with latency
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Auto dismiss success notification after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 text-left">
      {/* Informational Profile Contacts Column */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 space-y-6 backdrop-blur-md">
          <h3 className="text-sm font-bold font-mono text-violet-400 uppercase tracking-widest flex items-center gap-2">
            <Activity className="w-5 h-5 text-violet-400" /> COGNITIVE BEACONS
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Feel free to ping me for internships, R&D initiatives, startup partnerships, software architectures, or code reviews. My portals are always open.
          </p>

          <div className="space-y-4 pt-2">
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center space-x-3 text-xs text-zinc-300 hover:text-violet-400 transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-violet-400 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-zinc-500 uppercase">DIRECT EMAIL</p>
                <p className="font-semibold">{personalInfo.email}</p>
              </div>
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-xs text-zinc-300 hover:text-violet-400 transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-violet-400 transition-colors">
                <Linkedin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-zinc-500 uppercase">PROFESSIONAL NETWORK</p>
                <p className="font-semibold flex items-center gap-1">linkedin.com/in/joitapaul <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-violet-400" /></p>
              </div>
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-xs text-zinc-300 hover:text-violet-400 transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-violet-400 transition-colors">
                <Github className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-zinc-500 uppercase">REPOS & PACKAGES</p>
                <p className="font-semibold flex items-center gap-1">github.com/joitapaul <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-violet-400" /></p>
              </div>
            </a>
          </div>
        </div>

        {/* LeetCode & Kaggle Widgets */}
        <div className="grid grid-cols-2 gap-4">
          <a
            href={personalInfo.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-950/40 border border-zinc-900 p-4 rounded-xl flex flex-col justify-between hover:border-amber-500/20 transition-all group"
          >
            <span className="text-[10px] font-mono text-zinc-500">ALGORITHMIC COMPILER</span>
            <span className="text-zinc-200 font-bold text-xs mt-2 group-hover:text-amber-400 transition-colors">LEETCODE ↗</span>
          </a>
          <a
            href={personalInfo.kaggle}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-950/40 border border-zinc-900 p-4 rounded-xl flex flex-col justify-between hover:border-violet-500/20 transition-all group"
          >
            <span className="text-[10px] font-mono text-zinc-500">PREDICTIVE DATA LABS</span>
            <span className="text-zinc-200 font-bold text-xs mt-2 group-hover:text-violet-400 transition-colors">KAGGLE ↗</span>
          </a>
        </div>
      </div>

      {/* Interactive Form Column */}
      <div className="lg:col-span-3 bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 md:p-8 backdrop-blur-md relative">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-[10px] font-mono text-zinc-400 uppercase">IDENTIFIER / NAME</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="E.g., John Doe"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 outline-none placeholder-zinc-600 focus:border-violet-500 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[10px] font-mono text-zinc-400 uppercase">COMMUNICATION BACKBONE / EMAIL</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="E.g., contact@company.com"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 outline-none placeholder-zinc-600 focus:border-violet-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="subject" className="text-[10px] font-mono text-zinc-400 uppercase">UPLINK SUBJECT</label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="E.g., AI Research Opportunity"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 outline-none placeholder-zinc-600 focus:border-violet-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="message" className="text-[10px] font-mono text-zinc-400 uppercase">SECURE TELEMETRY MESSAGE</label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Write your transmission..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 outline-none placeholder-zinc-600 focus:border-violet-500 transition-colors resize-none"
            />
          </div>

          <button
            id="send-message-submit-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-mono font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(139,92,246,0.25)] transition-all cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                TRANSMITTING PACKETS...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" /> ESTABLISH UPLINK
              </span>
            )}
          </button>
        </form>

        {/* Floating Success Confirmation Toast */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              id="contact-success-notif"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="absolute inset-x-6 bottom-6 bg-zinc-900 border border-emerald-500/30 p-4 rounded-xl flex items-start gap-3 shadow-2xl backdrop-blur-md"
            >
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-emerald-400 font-mono">SECURE UPLINK ESTABLISHED</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">Your transmission has bypassed local firewalls. Joita's representative client will respond shortly.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
