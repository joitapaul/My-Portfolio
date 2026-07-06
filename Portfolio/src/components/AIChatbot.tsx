import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      role: "system",
      text: "Uplink Secure. I am Joita Paul's AI representative. Ask me anything about her skills, ML research, projects, or professional timeline!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = input.trim();
    if (!prompt) return;

    setInput("");
    setErrorState(null);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Map message history (skipping first system message) for backend context
      const chatHistory = messages
        .filter((m) => m.role !== "system")
        .map((m) => ({
          role: m.role,
          text: m.text
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: prompt,
          history: chatHistory
        })
      });

      const data = await res.json();

      if (res.ok) {
        const modelMsg: ChatMessage = {
          id: `model-${Date.now()}`,
          role: "model",
          text: data.text || "I was unable to synthesize a response.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, modelMsg]);
      } else {
        throw new Error(data.message || "Failed to reach cognitive center.");
      }
    } catch (err: any) {
      console.error("Chat API Error:", err);
      setErrorState(err.message || "Uplink disrupted. Is your API key configured?");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-popup-window"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-80 md:w-96 h-[480px] bg-zinc-950/95 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col mb-4 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-violet-950/60 to-zinc-950 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.25)] animate-pulse">
                  <Bot className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-zinc-200 text-sm font-semibold flex items-center gap-1">
                    JOITA_AI_AGENT <Sparkles className="w-3 h-3 text-fuchsia-400" />
                  </h4>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    Cognitive Uplink Live
                  </p>
                </div>
              </div>
              <button
                id="close-chat-btn"
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-zinc-100 transition-colors p-1 hover:bg-zinc-900 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Pane */}
            <div
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className={`max-w-[85%] flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-violet-600 text-white rounded-tr-none shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                          : msg.role === "system"
                          ? "bg-zinc-900/80 border border-violet-950 text-violet-300 font-mono"
                          : "bg-zinc-900 text-zinc-300 border border-zinc-800/80 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-zinc-600 mt-1 px-1">{msg.timestamp}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 border border-zinc-800 px-3.5 py-2.5 rounded-2xl rounded-tl-none flex items-center space-x-1.5">
                    <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}

              {errorState && (
                <div className="flex justify-center">
                  <div className="bg-rose-950/30 border border-rose-900/60 p-3 rounded-xl flex items-start space-x-2 text-rose-200 text-xs w-full">
                    <AlertCircle className="w-4.5 h-4.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>{errorState}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-zinc-950 border-t border-zinc-900 flex items-center space-x-2"
            >
              <input
                id="chat-input-field"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Joita's AI projects..."
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 outline-none placeholder-zinc-500 focus:border-violet-600 transition-colors"
              />
              <button
                id="send-chat-btn"
                type="submit"
                className="bg-violet-600 hover:bg-violet-750 text-white p-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(139,92,246,0.25)] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-95"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button */}
      <motion.button
        id="toggle-chatbot-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-400 flex items-center justify-center text-white shadow-[0_4px_25px_rgba(139,92,246,0.35)] hover:shadow-[0_4px_35px_rgba(192,132,252,0.5)] cursor-pointer focus:outline-none border border-white/10"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-violet-600 animate-pulse"></span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
