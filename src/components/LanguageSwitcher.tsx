"use client";

import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-[26px] right-20 md:right-24 z-50 flex items-center gap-1.5 select-none text-[11px] font-sans h-8 px-3 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-md rounded-full border border-zinc-200/20 dark:border-zinc-800/20 shadow-sm">
      <button
        onClick={() => setLanguage("tr")}
        className={`relative px-1 py-0.5 transition-colors duration-200 ${
          language === "tr"
            ? "text-zinc-900 dark:text-zinc-100 font-bold"
            : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-650 dark:hover:text-zinc-355"
        }`}
      >
        TR
        {language === "tr" && (
          <motion.div
            layoutId="activeLangIndicator"
            className="absolute -bottom-[2px] left-1 right-1 h-[2px] bg-cyan-500 dark:bg-cyan-400 rounded-full"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </button>
      <span className="text-zinc-300 dark:text-zinc-800">/</span>
      <button
        onClick={() => setLanguage("en")}
        className={`relative px-1 py-0.5 transition-colors duration-200 ${
          language === "en"
            ? "text-zinc-900 dark:text-zinc-100 font-bold"
            : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-650 dark:hover:text-zinc-355"
        }`}
      >
        EN
        {language === "en" && (
          <motion.div
            layoutId="activeLangIndicator"
            className="absolute -bottom-[2px] left-1 right-1 h-[2px] bg-cyan-500 dark:bg-cyan-400 rounded-full"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </button>
    </div>
  );
}
