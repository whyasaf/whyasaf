"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Clock, BookOpen } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import { blogPosts } from "../data/posts";

function getReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function useStaggerReveal(count: number) {
  const [visible, setVisible] = useState<boolean[]>(new Array(count).fill(false));
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < count; i++) {
      timers.push(
        setTimeout(() => {
          setVisible((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, 150 + i * 120)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [count]);
  return visible;
}

const rotations = [-3, 2.5, -2, 3.5, -2.5, 3, -3.5, 2];

export default function BlogList() {
  const { language } = useLanguage();
  const t = translations[language];
  const postsList = Object.values(blogPosts);
  const visible = useStaggerReveal(postsList.length);

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Clean & Elegant Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-100 dark:border-zinc-900 pb-6 mb-12">
        <div className="space-y-2 text-left">
          {/* Title */}
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-sans">
            {t.blogTitle}
          </h1>
          {/* Subtitle */}
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans font-light leading-relaxed">
            {t.blogDesc}
          </p>
        </div>
      </div>

      {/* Instax Flash Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 py-4 justify-items-center">
        {postsList.map((post, index) => {
          const content = language === "tr" ? post.tr : post.en;
          const readTime = getReadingTime(content.content);
          const rotation = rotations[index % rotations.length];
          const isVisible = visible[index] ?? false;

          return (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group block w-full max-w-[320px]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <div
                className="relative transition-all duration-500 ease-out"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "rotate(0deg) scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = `rotate(${rotation}deg)`;
                }}
              >
                {/* External Soft Neon Glow (synced with parent scale and rotation) */}
                <div 
                  className="absolute inset-[2px] rounded-[4px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-[8px] bg-gradient-to-r from-cyan-500 to-blue-500 pointer-events-none z-0"
                />

                {/* Clipped Container for the Precise Flowing LED border */}
                <div className="relative p-[1.5px] rounded-[4px] overflow-hidden z-10">
                  {/* Slow rotating comet gradient (sharp ucu yuvarlak tail effect) */}
                  <div 
                    className="absolute -inset-[150%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[spin_7s_linear_infinite] pointer-events-none z-0"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 75%, #00f2fe 88%, #0072ff 98%, transparent 100%)'
                    }}
                  />

                  <div
                    className="relative z-10 instax-card bg-white dark:bg-zinc-900 rounded-[3px] shadow-md transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:shadow-zinc-400/20 dark:group-hover:shadow-black/30"
                    style={{
                      padding: "12px 12px 40px 12px",
                    }}
                  >
                  {/* Photo area - 4:5 aspect ratio */}
                  <div
                    className="relative overflow-hidden bg-zinc-100 dark:bg-zinc-800"
                    style={{ aspectRatio: "4/5" }}
                  >
                    <img
                      src={`/${post.image}`}
                      alt={content.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 bg-black/50 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-widest rounded">
                        {post.category}
                      </span>
                    </div>

                    {/* YENİ / NEW Rozeti */}
                    {post.isNew && (
                      <div className="absolute top-3 right-3">
                        <span
                          className="px-2 py-0.5 text-white text-[9px] font-black uppercase tracking-widest rounded"
                          style={{
                            background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
                            boxShadow: "0 0 8px rgba(255,65,108,0.7), 0 0 16px rgba(255,65,108,0.4)",
                            animation: "newBadgePulse 2s ease-in-out infinite",
                          }}
                        >
                          {language === "tr" ? "YENİ" : "NEW"}
                        </span>
                        <style>{`
                          @keyframes newBadgePulse {
                            0%, 100% { box-shadow: 0 0 8px rgba(255,65,108,0.7), 0 0 16px rgba(255,65,108,0.4); }
                            50% { box-shadow: 0 0 14px rgba(255,65,108,1), 0 0 28px rgba(255,65,108,0.6); }
                          }
                        `}</style>
                      </div>
                    )}
                  </div>

                  {/* Caption area - like Instax bottom */}
                  <div className="pt-4 px-1 text-left">
                    <h2 className="text-zinc-900 dark:text-zinc-100 font-bold text-sm leading-tight tracking-tight line-clamp-2 mb-2" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                      {content.title}
                    </h2>
                    <div className="flex items-center gap-3 text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {readTime} {t.blogReadTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          );
        })}
      </div>
    </div>
  );
}
