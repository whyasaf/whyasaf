"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Calendar,
  ArrowLeft,
  ArrowRight,
  Globe,
  Clock,
  MapPin,
  ChevronUp,
  Copy,
  Check,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";

// Calculate reading time from HTML content
function getReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// Category color mapping
const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  INSIGHTS: {
    bg: "bg-cyan-100 dark:bg-cyan-950/40",
    text: "text-cyan-600 dark:text-cyan-400",
    border: "border-cyan-200 dark:border-cyan-800",
  },
  INVESTMENT: {
    bg: "bg-emerald-100 dark:bg-emerald-950/40",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  SYSTEMS: {
    bg: "bg-blue-100 dark:bg-blue-950/40",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
  },
};

function getCategoryStyle(category: string) {
  return categoryColors[category] || categoryColors.INSIGHTS;
}

export default function BlogPostContent({ post, blogPosts }: { post: any; blogPosts: any }) {
  const { language } = useLanguage();
  const t = translations[language];
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const el = articleRef.current;
      const rect = el.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      const total = el.scrollHeight - window.innerHeight;
      const progress = Math.min(100, Math.max(0, (scrolled / total) * 100));
      setScrollProgress(progress);
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setHeaderVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Copy link handler
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const content = language === "tr" ? post.tr : post.en;
  const nextPost = post.nextPostId ? blogPosts[post.nextPostId] : null;
  const readTime = getReadingTime(content.content);
  const catStyle = getCategoryStyle(post.category);

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label={t.blogBackToTop}
      >
        <ChevronUp size={18} />
      </button>

      <article ref={articleRef} className="max-w-2xl mx-auto space-y-8 text-left">
        {/* Navigation & Actions */}
        <div
          className={`flex items-center justify-between transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors group"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            {t.blogBack}
          </Link>
          <div className="flex items-center gap-2">
            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-350 dark:hover:border-zinc-700 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg transition-all select-none"
              title={t.blogShare}
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-sans">
                    {t.blogShareSuccess}
                  </span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span className="font-sans">{t.blogShare}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Header */}
        <div
          className={`space-y-5 border-b border-zinc-200 dark:border-zinc-900 pb-8 transition-all duration-700 delay-100 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Meta info row */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
            <span
              className={`px-2.5 py-1 ${catStyle.bg} ${catStyle.text} rounded-md text-[10px] font-bold uppercase tracking-widest`}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 font-sans">
              <Calendar size={12} />
              {post.date}
            </span>
            <span className="flex items-center gap-1 text-zinc-400 dark:text-zinc-500 font-sans">
              <span className="inline-block w-[11px] h-[11px]">⏱</span>
              {readTime} {t.blogReadTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.15] font-sans">
            {content.title}
          </h1>

          {/* Lead / Excerpt */}
          <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed font-light italic border-l-2 border-cyan-300 dark:border-cyan-800 pl-4 py-1 font-sans">
            {content.lead}
          </p>

          {/* Author info */}
          <div className="flex items-center gap-4 pt-2">
            <div className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center ring-2 ring-zinc-100 dark:ring-zinc-900">
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 font-sans">ÖA</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 font-sans">
                {post.author}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500 font-sans">
                <MapPin size={10} />
                {post.location}
              </div>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div
          className="blog-content text-zinc-800 dark:text-zinc-300 text-sm md:text-base leading-relaxed space-y-6 transition-all duration-700 delay-200"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />

        {/* Reading Complete Indicator */}
        {scrollProgress > 95 && (
          <div className="flex items-center justify-center py-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-full text-emerald-600 dark:text-emerald-400 text-xs font-medium font-sans">
              <Check size={14} />
              {language === "tr" ? "Okuma tamamlandı!" : "Reading complete!"}
            </div>
          </div>
        )}

        {/* Next Post Banner */}
        {nextPost && (
          <div className="border-t border-zinc-200 dark:border-zinc-900 pt-8 mt-12">
            <div className="text-zinc-450 dark:text-zinc-500 text-xs uppercase tracking-wider font-semibold mb-3 flex items-center gap-2 font-sans">
              <ArrowRight size={12} />
              {t.blogNextPost}
            </div>
            <Link
              href={`/blog/${nextPost.id}`}
              className="group block relative overflow-hidden p-6 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-800 transition-all duration-300 rounded-xl hover:shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-50/0 to-cyan-50/50 dark:from-cyan-950/0 dark:to-cyan-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-[10px] ${getCategoryStyle(nextPost.category).bg} ${getCategoryStyle(nextPost.category).text} px-2 py-0.5 rounded font-semibold uppercase tracking-wider font-sans`}
                    >
                      {nextPost.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-zinc-400 dark:text-zinc-500 font-sans">
                      <span className="inline-block w-[11px] h-[11px]">⏱</span>
                      {getReadingTime(
                        language === "tr" ? nextPost.tr.content : nextPost.en.content
                      )}{" "}
                      {t.blogReadTime}
                    </span>
                  </div>
                  <h3 className="text-zinc-800 dark:text-zinc-200 font-bold text-sm md:text-base mt-1 group-hover:text-zinc-950 dark:group-hover:text-zinc-100 transition-colors font-sans">
                    {language === "tr" ? nextPost.tr.title : nextPost.en.title}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-cyan-100 dark:group-hover:bg-cyan-950/50 group-hover:border-cyan-200 dark:group-hover:border-cyan-800/50 transition-all duration-300 ml-4 shrink-0">
                  <ArrowRight
                    size={16}
                    className="text-zinc-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all"
                  />
                </div>
              </div>
            </Link>
          </div>
        )}
      </article>
    </>
  );
}
