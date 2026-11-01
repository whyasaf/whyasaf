"use client";

import { useLayoutEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function ThemeSwitcher() {
  const { language } = useLanguage();
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Switching language rebuilds <html>, so the saved theme is restored before paint
  useLayoutEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("theme");
    } catch (_) {}
    const isDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", isDark);
    setTheme(isDark ? "dark" : "light");
  }, [language]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setTheme(nextTheme);
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={toggleTheme}
        className="p-2.5 bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-350 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 backdrop-blur-md rounded-full shadow-sm hover:shadow-md transition-all duration-200"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
      </button>
    </div>
  );
}
