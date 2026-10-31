"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import ShimmerImage from "./ShimmerImage";
import { getReadingTime, getCategoryStyle, getCategoryLabel, formatPostDate, getSortedPosts } from "../lib/blog";

export default function BlogList() {
  const { language } = useLanguage();
  const t = translations[language];
  const posts = getSortedPosts();
  const [category, setCategory] = useState<string>("ALL");

  const categories = Array.from(new Set(posts.map((p) => p.category)));
  const newestId = posts[0]?.id;
  const filtered = category === "ALL" ? posts : posts.filter((p) => p.category === category);
  const [featured, ...rest] = filtered;

  const label = (post: (typeof posts)[number]) => (language === "tr" ? post.tr : post.en);
  const newBadge = (
    <span className="px-1.5 py-0.5 bg-cyan-700 text-white text-[9px] font-bold uppercase tracking-widest rounded">
      {language === "tr" ? "Yeni" : "New"}
    </span>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-[34px] animate-in fade-in duration-500">

      {/* Category chips */}
      <div className="flex flex-wrap gap-[8px]" role="tablist" aria-label="Kategoriler">
        {["ALL", ...categories].map((cat) => {
          const active = category === cat;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase font-sans border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                active
                  ? "bg-zinc-900 text-zinc-100 border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100"
                  : "bg-transparent text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400"
              }`}
            >
              {cat === "ALL" ? (language === "tr" ? "Tümü" : "All") : getCategoryLabel(cat, language)}
            </button>
          );
        })}
      </div>

      <div key={category} className="space-y-[34px] animate-in fade-in duration-300">
        {/* Featured post */}
        {featured && (
          <Link
            href={`/blog/${featured.id}`}
            className="group grid md:grid-cols-8 gap-0 bg-white dark:bg-[#0f0f11] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl overflow-hidden transition-all duration-300 hover:border-cyan-500/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 text-left"
          >
            <div className="relative md:col-span-3 aspect-[1.618/1] md:aspect-auto bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
              <ShimmerImage
                src={`/${featured.image}`}
                alt={label(featured).title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="md:col-span-5 p-[21px] md:p-[34px] flex flex-col justify-between gap-[21px]">
              <div className="space-y-[13px]">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${getCategoryStyle(featured.category).bg} ${getCategoryStyle(featured.category).text}`}
                  >
                    {getCategoryLabel(featured.category, language)}
                  </span>
                  {featured.id === newestId && newBadge}
                </div>
                <h2 className="text-2xl md:text-3xl font-serif tracking-tight leading-tight text-zinc-900 dark:text-zinc-100">
                  {label(featured).title}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed line-clamp-3">
                  {label(featured).lead}
                </p>
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><Calendar size={11} />{formatPostDate(featured.dateISO, language)}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />{getReadingTime(label(featured).content)} {t.blogReadTime}
                  </span>
                </div>
                <ArrowUpRight size={16} className="text-zinc-400 group-hover:text-cyan-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </div>
          </Link>
        )}

        {/* Index list */}
        {rest.length > 0 && (
          <ul className="divide-y divide-zinc-100 dark:divide-zinc-900 border-y border-zinc-100 dark:border-zinc-900">
            {rest.map((post) => {
              const content = label(post);
              return (
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.id}`}
                    className="group flex items-center gap-[13px] md:gap-[21px] py-[21px] text-left"
                  >
                    <div className="relative w-[55px] h-[55px] md:w-[89px] md:h-[89px] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0">
                      <ShimmerImage
                        src={`/${post.image}`}
                        alt={content.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-widest ${getCategoryStyle(post.category).text}`}
                        >
                          {getCategoryLabel(post.category, language)}
                        </span>
                        {post.id === newestId && newBadge}
                      </div>
                      <h3 className="text-base md:text-lg font-serif tracking-tight leading-snug text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {content.title}
                      </h3>
                      <div className="flex items-center gap-4 text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                        <span className="flex items-center gap-1"><Calendar size={10} />{formatPostDate(post.dateISO, language)}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} />{getReadingTime(content.content)} {t.blogReadTime}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="hidden sm:block text-zinc-300 dark:text-zinc-700 group-hover:text-cyan-500 transition-colors shrink-0" />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
