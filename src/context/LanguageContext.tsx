"use client";

import React, { createContext, useContext } from "react";
import { Language } from "../lib/i18n";

const LanguageContext = createContext<{ language: Language } | undefined>(undefined);

export function LanguageProvider({ language, children }: { language: Language; children: React.ReactNode }) {
  return <LanguageContext.Provider value={{ language }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
