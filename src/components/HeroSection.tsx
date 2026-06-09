"use client";

import Link from "next/link";
import { Mail, User, Briefcase, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";

interface HeroSectionProps {
  activeTab: "about" | "projects" | "blog";
}

export default function HeroSection({ activeTab }: HeroSectionProps) {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-6">
      {/* ── Layer 1: Logo (centered, small) ── */}
      <div className="flex justify-center pt-4 mb-2">
        <img
          src="/assets/wa_com2.png"
          alt="WhyAsaf Logo"
          className="h-6 md:h-7 w-auto object-contain invert-0 dark:invert transition-all duration-300 select-none opacity-80"
        />
      </div>

      {/* Hero Section — strict vertical stack */}
      <div className="max-w-4xl mx-auto flex flex-col gap-4 pt-2 pb-4">
        {/* ── Layer 2: Name (left) + Social icons (right) ── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 shrink-0 shadow-sm">
              <img
                src="/assets/cv_1.jpg"
                alt="Ömer Asaf Ak Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-4xl md:text-5xl tracking-tight text-zinc-900 dark:text-zinc-100 font-serif font-normal">
              Ömer Asaf Ak
            </h1>
          </div>
          <div className="flex items-center gap-2.5">
            <a
              href="mailto:whyasaf.wa@gmail.com"
              className="w-12 h-12 md:w-14 md:h-14 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-300 dark:hover:border-cyan-900/60 text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 rounded-full transition-all duration-200 inline-flex items-center justify-center shrink-0 shadow-sm"
              title={t.sendEmail}
            >
              <Mail className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a
              href="https://x.com/whyasaf"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 md:w-14 md:h-14 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-300 dark:hover:border-cyan-900/60 text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 rounded-full transition-all duration-200 inline-flex items-center justify-center shrink-0 shadow-sm"
              title="Twitter / X"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Layer 3: Motto / Bio (Sola Hizalı) ── */}
        <p className="text-zinc-400 dark:text-zinc-450 text-base md:text-lg leading-relaxed text-left italic font-sans">
          {t.heroBio}
        </p>

        {/* ── Layer 4: Segmented Control (Centered) ── */}
        <div className="flex justify-center mt-8 mb-8">
          <div className="inline-flex bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1 rounded-full select-none shadow-sm relative">
            <Link
              href="/about"
              className="relative px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors duration-200 z-10 block"
            >
              {activeTab === "about" && (
                <motion.div
                  layoutId="activeTabBackground"
                  className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-full shadow-sm -z-10 border border-zinc-200 dark:border-zinc-700"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`inline-flex items-center gap-1.5 transition-colors ${activeTab === "about" ? "text-cyan-600 dark:text-cyan-400" : "text-zinc-500 hover:text-cyan-500 dark:hover:text-cyan-400"}`}>
                <User size={13} />
                {t.navAbout}
              </span>
            </Link>
            <Link
              href="/projects"
              className="relative px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors duration-200 z-10 block"
            >
              {activeTab === "projects" && (
                <motion.div
                  layoutId="activeTabBackground"
                  className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-full shadow-sm -z-10 border border-zinc-200 dark:border-zinc-700"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`inline-flex items-center gap-1.5 transition-colors ${activeTab === "projects" ? "text-cyan-600 dark:text-cyan-400" : "text-zinc-500 hover:text-cyan-500 dark:hover:text-cyan-400"}`}>
                <Briefcase size={13} />
                {t.navProjects}
              </span>
            </Link>
            <Link
              href="/blog"
              className="relative px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors duration-200 z-10 block"
            >
              {activeTab === "blog" && (
                <motion.div
                  layoutId="activeTabBackground"
                  className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-full shadow-sm -z-10 border border-zinc-200 dark:border-zinc-700"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`inline-flex items-center gap-1.5 transition-colors ${activeTab === "blog" ? "text-cyan-600 dark:text-cyan-400" : "text-zinc-500 hover:text-cyan-500 dark:hover:text-cyan-400"}`}>
                <BookOpen size={13} />
                {t.navBlog}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
