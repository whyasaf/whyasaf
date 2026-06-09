"use client";

import React from "react";
import { Info } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface ProjectCardProps {
  title: string;
  subtitle: string;
  mediaType: "video" | "image";
  mediaSrc: string;
  imageMode?: "cover" | "contain";
  darkInvert?: boolean;
  href: string;
  onDetailClick: () => void;
}

function toCleanUppercase(str: string, lang: string): string {
  const hasTrChars = /[ışğçöüİŞĞÇÖÜ]/.test(str);
  return str.toLocaleUpperCase(hasTrChars ? "tr-TR" : "en-US");
}

export default function ProjectCard({
  title,
  subtitle,
  mediaType,
  mediaSrc,
  imageMode = "cover",
  darkInvert = false,
  href,
  onDetailClick,
}: ProjectCardProps) {
  const { language } = useLanguage();
  
  const handleDetailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDetailClick();
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-zinc-100 dark:bg-[#131315] border border-zinc-200 dark:border-zinc-900/80 rounded-[20px] md:rounded-[28px] p-1.5 transition-all duration-300 hover:border-cyan-500/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 group relative flex flex-col gap-3 text-left"
    >
      {/* Media Area (Rounded inner corners, 4/3 aspect ratio, single-border) */}
      <div className="relative aspect-[4/3] w-full bg-zinc-50 dark:bg-zinc-950 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
        {mediaType === "video" ? (
          <video
            src={mediaSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover select-none"
          />
        ) : (
          <img
            src={mediaSrc}
            alt={title}
            className={`w-full h-full select-none transition-transform duration-500 ${
              imageMode === "contain" 
                ? "object-contain p-4 group-hover:scale-102" 
                : "object-cover group-hover:scale-105"
            } ${darkInvert ? "dark:invert" : ""}`}
            loading="lazy"
          />
        )}

        {/* Small "i" Floating Button in Media Area (top-right) */}
        <button
          onClick={handleDetailClick}
          className="absolute top-3 right-3 z-10 p-2 bg-black/60 dark:bg-zinc-900/80 text-zinc-100 hover:text-cyan-400 hover:bg-black rounded-full transition-all duration-300 shadow-md backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          title="Detayları Gör"
        >
          <Info size={14} />
        </button>
      </div>

      {/* Typography / Info Area */}
      <div className="px-3 pb-3 pt-1 space-y-1">
        <h4 className="text-sm font-semibold tracking-wider text-zinc-900 dark:text-zinc-100 font-sans">
          {toCleanUppercase(title, language)}
        </h4>
        <span className="block text-[10px] md:text-xs font-medium tracking-widest text-zinc-550 dark:text-zinc-500 font-sans">
          {toCleanUppercase(subtitle, language)}
        </span>
      </div>
    </a>
  );
}
