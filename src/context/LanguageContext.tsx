"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "tr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("tr");

  // Load language from localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    try {
      const stored = localStorage.getItem("language");
      if (stored === "tr" || stored === "en") {
        setLanguageState(stored);
        document.cookie = `language=${stored}; path=/; max-age=31536000; SameSite=Lax`;
      } else {
        // Fallback to browser language
        const browserLang = navigator.language.split("-")[0];
        const initialLang = browserLang === "en" ? "en" : "tr";
        setLanguageState(initialLang);
        document.cookie = `language=${initialLang}; path=/; max-age=31536000; SameSite=Lax`;
      }
    } catch (_) {}
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("language", lang);
      document.cookie = `language=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    } catch (_) {}
  };

  const toggleLanguage = () => {
    setLanguage(language === "tr" ? "en" : "tr");
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
