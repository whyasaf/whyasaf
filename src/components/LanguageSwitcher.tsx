"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { Language, localePath, stripLocale } from "../lib/i18n";

function LanguageLink({ target }: { target: Language }) {
  const { language } = useLanguage();
  const pathname = usePathname();
  const active = language === target;

  return (
    <Link
      href={localePath(target, stripLocale(pathname))}
      hrefLang={target}
      scroll={false}
      aria-current={active ? "true" : undefined}
      className={`relative px-1 py-0.5 transition-colors duration-200 ${
        active
          ? "text-zinc-900 dark:text-zinc-100 font-bold"
          : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-355"
      }`}
    >
      {target.toUpperCase()}
      {active && (
        <motion.div
          layoutId="activeLangIndicator"
          className="absolute -bottom-[2px] left-1 right-1 h-[2px] bg-cyan-500 dark:bg-cyan-400 rounded-full"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}

export default function LanguageSwitcher() {
  return (
    <div className="fixed top-[26px] right-20 md:right-24 z-50 flex items-center gap-1.5 select-none text-[11px] font-sans h-8 px-3 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-md rounded-full border border-zinc-200/20 dark:border-zinc-800/20 shadow-sm">
      <LanguageLink target="tr" />
      <span className="text-zinc-300 dark:text-zinc-800">/</span>
      <LanguageLink target="en" />
    </div>
  );
}
