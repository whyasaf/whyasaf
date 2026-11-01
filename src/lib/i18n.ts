export type Language = "tr" | "en";

export const SITE_URL = "https://whyasaf.com";
export const languages: Language[] = ["tr", "en"];

export function localePath(language: Language, path: string): string {
  if (language === "tr") return path;
  return path === "/" ? "/en" : `/en${path}`;
}

// Prerendered pages see the internal /tr path, the browser sees the public one
export function stripLocale(pathname: string): string {
  return pathname.replace(/^\/(en|tr)(?=\/|$)/, "") || "/";
}

export function feedPath(language: Language): string {
  return language === "en" ? "/en/feed.xml" : "/feed.xml";
}

export function pageAlternates(language: Language, path: string) {
  return {
    canonical: localePath(language, path),
    languages: { tr: path, en: localePath("en", path), "x-default": path },
    types: { "application/rss+xml": feedPath(language) },
  };
}
