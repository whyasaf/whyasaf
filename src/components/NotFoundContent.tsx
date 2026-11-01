"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const copy = {
  tr: { title: "Sayfa bulunamadı", text: "Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.", home: "Ana sayfa", href: "/" },
  en: { title: "Page not found", text: "This page may have moved or never existed.", home: "Home", href: "/en" },
};

export default function NotFoundContent() {
  const [language, setLanguage] = useState<"tr" | "en">("tr");

  // This page is prerendered once, so the URL can only be read in the browser
  useEffect(() => {
    if (/^\/en(\/|$)/.test(window.location.pathname)) setLanguage("en");
  }, []);

  const t = copy[language];

  return (
    <div className="text-center py-24 space-y-4">
      <p className="text-xs font-semibold tracking-widest text-zinc-400 dark:text-zinc-500 font-sans">404</p>
      <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-zinc-900 dark:text-zinc-100">{t.title}</h1>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light">{t.text}</p>
      <Link
        href={t.href}
        className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 underline underline-offset-4"
      >
        <ArrowLeft size={16} /> {t.home}
      </Link>
    </div>
  );
}
