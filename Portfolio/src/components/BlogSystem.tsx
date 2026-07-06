import { useState, useMemo } from "react";
import { Search, Calendar, Clock, ArrowRight, BookOpen, Tag } from "lucide-react";
import { blogPosts } from "../data";
import { BlogPost } from "../types";

export default function BlogSystem() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(blogPosts.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-8 text-left">
      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-950/40 p-4 border border-zinc-900 rounded-2xl backdrop-blur-md">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            id="blog-search-field"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search ML blogs, algorithms, code..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-100 outline-none placeholder-zinc-500 focus:border-violet-500 transition-colors"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`cat-btn-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.25)]"
                  : "bg-zinc-900/60 text-zinc-400 border border-zinc-800/80 hover:text-zinc-100 hover:bg-zinc-900"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Posts */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className={`bg-zinc-950/40 border border-zinc-900 rounded-2xl p-6 hover:border-violet-500/20 transition-all duration-300 flex flex-col justify-between ${
                post.featured ? "md:col-span-2 bg-gradient-to-br from-violet-950/10 via-zinc-950/40 to-zinc-950/40" : ""
              }`}
            >
              <div className="space-y-3">
                {/* Meta details */}
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                  <span className="text-violet-400 font-semibold uppercase">{post.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-zinc-100 leading-snug group-hover:text-violet-400">
                  {post.title}
                </h3>

                <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-2">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded flex items-center gap-0.5"
                    >
                      <Tag className="w-2.5 h-2.5 text-zinc-600" /> {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pt-6 border-t border-zinc-900/60 mt-6 flex items-center justify-between">
                <button
                  id={`read-article-btn-${post.id}`}
                  onClick={() => setActiveArticle(post)}
                  className="text-xs text-violet-400 hover:text-violet-300 font-semibold font-mono flex items-center gap-1 cursor-pointer"
                >
                  READ MODULE <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-zinc-900 border-dashed rounded-2xl">
          <BookOpen className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
          <p className="text-zinc-500 text-xs font-mono">No telemetry files found matching query parameters.</p>
        </div>
      )}

      {/* Expanded Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setActiveArticle(null)} />
          
          <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-zinc-900 bg-gradient-to-r from-violet-950/10 to-zinc-950 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono text-violet-400 uppercase tracking-widest block mb-1">
                  JOITA PAUL'S COGNITIVE INDEX
                </span>
                <h3 className="text-lg font-bold text-zinc-100 leading-snug">{activeArticle.title}</h3>
              </div>
              <button
                id="close-reader-btn"
                onClick={() => setActiveArticle(null)}
                className="text-zinc-400 hover:text-zinc-100 font-mono text-xs border border-zinc-800 rounded px-2.5 py-1 hover:bg-zinc-900 transition-colors"
              >
                CLOSE
              </button>
            </div>

            {/* Post Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
              {/* Meta details */}
              <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 bg-zinc-900/40 p-3.5 border border-zinc-900 rounded-xl">
                <div>
                  <span className="text-zinc-500 uppercase mr-1">Category:</span>
                  <span className="text-violet-400 font-semibold">{activeArticle.category}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase mr-1">Published:</span>
                  <span>{activeArticle.date}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase mr-1">Complexity:</span>
                  <span className="text-violet-400">Advanced Matrix</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase mr-1">Allocated:</span>
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              {/* Main Text */}
              <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                <p className="font-semibold text-zinc-200 border-l-2 border-violet-500 pl-4 italic">
                  "{activeArticle.excerpt}"
                </p>
                <div className="whitespace-pre-line pt-2 text-zinc-300">
                  {activeArticle.content}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-zinc-900/20 border-t border-zinc-900 text-center">
              <p className="text-[10px] font-mono text-zinc-500">
                Cognitive Matrix // Index Module {activeArticle.id.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
