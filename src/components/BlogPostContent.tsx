"use client";

import { useState, useEffect, useRef } from "react";
import { localePath } from "../lib/i18n";
import { motion } from "framer-motion";
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
import ShimmerImage from "./ShimmerImage";
import { getReadingTime, getCategoryStyle, getCategoryLabel, formatPostDate, getRelatedPosts, addHeadingIds, markPostRead } from "../lib/blog";

export default function BlogPostContent({ post, blogPosts }: { post: any; blogPosts: any }) {
  const { language } = useLanguage();
  const t = translations[language];
  const [isRead, setIsRead] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const articleRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Reading progress bar: driven by requestAnimationFrame and a transform,
  // so it tracks every pixel of scrolling without React re-renders
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = articleRef.current;
      const bar = barRef.current;
      if (!el || !bar) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
      bar.style.transform = `scaleX(${progress})`;
      setShowBackToTop(window.scrollY > 400);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // "Read" badge: fires once when the end of the text comes into view
  useEffect(() => {
    const sentinel = endRef.current;
    if (!sentinel || isRead) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRead(true);
          markPostRead(post.id);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isRead, post.id]);

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
  const { html: bodyHtml, headings } = addHeadingIds(content.content);
  const related = getRelatedPosts(post, nextPost ? [nextPost.id] : [], 2);

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent">
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500"
          style={{ transform: "scaleX(0)" }}
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

      <article ref={articleRef} className="blog-article max-w-[618px] mx-auto space-y-[34px] text-left">
        {/* Navigation & Actions */}
        <div
          className={`flex items-center justify-between transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <Link
            href={localePath(language, "/blog")}
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
          className={`space-y-[21px] border-b border-zinc-200 dark:border-zinc-900 pb-[34px] transition-all duration-700 delay-100 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Meta info row */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
            <span
              className={`px-2.5 py-1 ${catStyle.bg} ${catStyle.text} rounded-md text-[10px] font-bold uppercase tracking-widest`}
            >
              {getCategoryLabel(post.category, language)}
            </span>
            <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 font-sans">
              <Calendar size={12} />
              {formatPostDate(post.dateISO, language)}
            </span>
            <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 font-sans">
              <span className="inline-block w-[11px] h-[11px]">⏱</span>
              {readTime} {t.blogReadTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.15] font-sans">
            {content.title}
          </h1>

          {/* Lead / Excerpt */}
          <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed font-light italic border-l-2 border-cyan-300 dark:border-cyan-800 pl-4 py-1 font-sans">
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
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400 font-sans">
                <MapPin size={10} />
                {post.location}
              </div>
            </div>
          </div>
        </div>

        {/* Cover image */}
        <div className="relative aspect-[1.618/1] w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <ShimmerImage src={`/${post.image}`} alt={content.title} className="w-full h-full object-cover" />
        </div>

        {/* Table of contents */}
        {headings.length >= 3 && (
          <nav
            aria-label={language === "tr" ? "İçindekiler" : "Contents"}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950 p-5"
          >
            <div className="text-xs uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400 mb-3 font-sans">
              {language === "tr" ? "İçindekiler" : "Contents"}
            </div>
            <ol className="space-y-2 text-sm font-sans">
              {headings.map((h, i) => (
                <li key={h.id} className="flex gap-3">
                  <span className="text-zinc-500 dark:text-zinc-400 font-mono text-xs pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={`#${h.id}`}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Body Content */}
        <div
          className="blog-content text-zinc-800 dark:text-zinc-300 text-base leading-relaxed space-y-6 transition-all duration-700 delay-200"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />

        {/* Reading complete: fixed-height slot so the page never jumps */}
        <div ref={endRef} className="flex items-center justify-center h-[55px]">
          {isRead && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
              className="flex items-center gap-2 pl-2 pr-4 py-1.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-full text-emerald-600 dark:text-emerald-400 text-xs font-medium font-sans"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <motion.circle
                  cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                <motion.path
                  d="M7.5 12.5l3 3 6-6.5" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
                />
              </svg>
              <motion.span
                initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                {language === "tr" ? "Okundu" : "Read"}
              </motion.span>
            </motion.div>
          )}
        </div>

        {/* Next Post Banner */}
        {nextPost && (
          <div className="border-t border-zinc-200 dark:border-zinc-900 pt-[34px] mt-[55px]">
            <div className="text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-3 flex items-center gap-2 font-sans">
              <ArrowRight size={12} />
              {t.blogNextPost}
            </div>
            <Link
              href={localePath(language, `/blog/${nextPost.id}`)}
              className="group block relative overflow-hidden p-6 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-800 transition-all duration-300 rounded-xl hover:shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-50/0 to-cyan-50/50 dark:from-cyan-950/0 dark:to-cyan-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-[10px] ${getCategoryStyle(nextPost.category).bg} ${getCategoryStyle(nextPost.category).text} px-2 py-0.5 rounded font-semibold uppercase tracking-wider font-sans`}
                    >
                      {getCategoryLabel(nextPost.category, language)}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400 font-sans">
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

        {/* Related posts */}
        {related.length > 0 && (
          <div className="border-t border-zinc-200 dark:border-zinc-900 pt-[34px] mt-[55px]">
            <div className="text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-[21px] font-sans">
              {language === "tr" ? "İlgili Yazılar" : "Related Posts"}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((r) => {
                const rc = language === "tr" ? r.tr : r.en;
                return (
                  <Link
                    key={r.id}
                    href={localePath(language, `/blog/${r.id}`)}
                    className="group flex gap-4 p-3 rounded-xl border border-zinc-200 dark:border-zinc-900 hover:border-cyan-500/30 transition-colors"
                  >
                    <img
                      src={`/${r.image}`}
                      alt={rc.title}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                      loading="lazy"
                    />
                    <div className="min-w-0 space-y-1">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${getCategoryStyle(r.category).text}`}>
                        {getCategoryLabel(r.category, language)}
                      </span>
                      <h4 className="text-sm font-semibold font-sans text-zinc-800 dark:text-zinc-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {rc.title}
                      </h4>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
