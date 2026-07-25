"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Calendar, Search, Clock, ArrowUpRight } from "lucide-react";

type Article = {
  id: number;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  showDiscussion: boolean;
};

type Props = {
  articles: Article[];
};

// Map categories, reading times, and gradient profiles to article IDs
const articleMetadata: Record<number, { category: string; readTime: string; gradient: string }> = {
  1: {
    category: "AI & ML",
    readTime: "5 min read",
    gradient: "from-indigo-600 to-purple-600"
  },
  2: {
    category: "AI & ML",
    readTime: "6 min read",
    gradient: "from-purple-600 to-pink-600"
  },
  3: {
    category: "Cybersecurity",
    readTime: "8 min read",
    gradient: "from-cyan-600 to-indigo-600"
  },
  4: {
    category: "Club Updates",
    readTime: "3 min read",
    gradient: "from-emerald-600 to-teal-600"
  },
  5: {
    category: "Club Updates",
    readTime: "4 min read",
    gradient: "from-orange-600 to-rose-600"
  }
};

const categories = ["All", "AI & ML", "Cybersecurity", "Club Updates"];

export default function ArticlesSection({ articles }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const meta = articleMetadata[article.id] || { category: "General" };
      const matchesCategory = activeCategory === "All" || meta.category === activeCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, searchQuery, activeCategory]);

  // The first article will be the "Featured Article" if no filters/searches are applied,
  // otherwise we show all matching in a grid.
  const isFilterActive = searchQuery !== "" || activeCategory !== "All";
  const featuredArticle = !isFilterActive && filteredArticles.length > 0 ? filteredArticles[0] : null;
  const gridArticles = !isFilterActive && filteredArticles.length > 0 ? filteredArticles.slice(1) : filteredArticles;

  return (
    <section className="py-16 sm:py-24 border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📝</span>
              <span className="text-xs font-bold tracking-widest text-accent uppercase">Publications</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-text-primary">
              Technical Blog & insights
            </h2>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-3 flex items-center text-text-muted">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface text-text-primary text-sm focus:outline-hidden focus:border-accent transition-colors"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 pb-8 overflow-x-auto whitespace-nowrap scrollbar-none mb-8 border-b border-border/50">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-accent text-white shadow-md shadow-accent/20"
                  : "bg-surface hover:bg-surface-2 text-text-muted hover:text-text-primary border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Content */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12 bg-surface border border-border rounded-3xl">
            <p className="text-text-muted text-sm">No articles match your search or filter criteria.</p>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* FEATURED BLOG CARD */}
            {featuredArticle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group bg-surface border border-border rounded-3xl overflow-hidden card-hover grid grid-cols-1 lg:grid-cols-12 min-h-[380px]"
              >
                {/* Visual Thumbnail */}
                <div className={`col-span-1 lg:col-span-5 bg-gradient-to-br ${articleMetadata[featuredArticle.id]?.gradient} relative p-8 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-border`}>
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[size:12px_12px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
                  
                  {/* Category badge */}
                  <div className="bg-black/35 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full w-fit">
                    {articleMetadata[featuredArticle.id]?.category}
                  </div>

                  {/* Visual cover elements */}
                  <div className="my-8">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Featured Article</span>
                    <h3 className="font-display text-2xl font-extrabold text-white mt-2 leading-snug drop-shadow-md">
                      {featuredArticle.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
                    <Clock size={12} />
                    <span>{articleMetadata[featuredArticle.id]?.readTime}</span>
                  </div>
                </div>

                {/* Cover info */}
                <div className="col-span-1 lg:col-span-7 p-8 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <div className="flex items-center gap-1.5 font-medium text-text-secondary">
                        <User size={13} className="text-accent" />
                        <span>{featuredArticle.author}</span>
                      </div>
                      <span className="text-border-subtle">·</span>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        <span>{featuredArticle.date}</span>
                      </div>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-text-primary leading-snug group-hover:text-accent-light transition-colors duration-200">
                      {featuredArticle.title}
                    </h3>

                    <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>
                  </div>

                  {/* Featured Action button */}
                  <div className="flex items-center justify-between border-t border-border-subtle pt-4">
                    <span className="text-xs font-bold text-accent hover:text-accent-light transition-colors flex items-center gap-1.5 cursor-pointer">
                      Read Article <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PINTEREST-INSPIRED GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridArticles.map((article, i) => {
                const meta = articleMetadata[article.id] || {
                  category: "General",
                  readTime: "5 min read",
                  gradient: "from-indigo-600 to-indigo-900",
                };
                return (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group bg-surface border border-border rounded-2xl overflow-hidden card-hover flex flex-col h-full"
                  >
                    {/* Visual Cover Header */}
                    <div className={`h-40 bg-gradient-to-br ${meta.gradient} relative p-5 flex flex-col justify-between overflow-hidden border-b border-border`}>
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent bg-[size:10px_10px]" />
                      <div className="bg-black/35 backdrop-blur-md border border-white/20 text-white text-[9px] font-bold px-2 py-0.5 rounded-full w-fit">
                        {meta.category}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-white/80 font-medium">
                        <Clock size={11} />
                        <span>{meta.readTime}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between gap-4 bg-surface">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs text-text-muted">
                          <span className="font-semibold text-text-secondary">{article.author}</span>
                          <span>·</span>
                          <span>{article.date}</span>
                        </div>
                        <h4 className="font-display font-bold text-text-primary text-base line-clamp-2 leading-snug group-hover:text-accent-light transition-colors duration-200">
                          {article.title}
                        </h4>
                        <p className="text-text-muted text-xs leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="border-t border-border-subtle pt-3 flex items-center justify-between text-xs font-bold text-accent group-hover:text-accent-light transition-colors">
                        <span>Read full article</span>
                        <ArrowUpRight size={13} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
