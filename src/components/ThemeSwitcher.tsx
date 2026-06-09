"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Read the current theme state from the documentElement class list (set by inline script)
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

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
