import { blogPosts, BlogPost } from "../data/posts";

export function getReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// Category color mapping
export const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  INSIGHTS: {
    bg: "bg-cyan-100 dark:bg-cyan-950/40",
    text: "text-cyan-600 dark:text-cyan-400",
    border: "border-cyan-200 dark:border-cyan-800",
  },
  INVESTMENT: {
    bg: "bg-emerald-100 dark:bg-emerald-950/40",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  SYSTEMS: {
    bg: "bg-blue-100 dark:bg-blue-950/40",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
  },
  FINANCE: {
    bg: "bg-violet-100 dark:bg-violet-950/40",
    text: "text-violet-600 dark:text-violet-400",
    border: "border-violet-200 dark:border-violet-800",
  },
};

const categoryLabelsTr: Record<string, string> = {
  INSIGHTS: "Analiz",
  FINANCE: "Finans",
  INVESTMENT: "Yatırım",
  SYSTEMS: "Sistemler",
};

/** Display label for a category: Turkish names in TR, the original caps in EN. */
export function getCategoryLabel(category: string, language: "tr" | "en"): string {
  return language === "tr" ? categoryLabelsTr[category] ?? category : category;
}

export function getCategoryStyle(category: string) {
  return categoryColors[category] || categoryColors.INSIGHTS;
}

/** "3 Temmuz 2026" / "3 July 2026" */
export function formatPostDate(dateISO: string, language: "tr" | "en"): string {
  return new Date(dateISO).toLocaleDateString(language === "tr" ? "tr-TR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** All posts, newest first. */
export function getSortedPosts(): BlogPost[] {
  return Object.values(blogPosts).sort(
    (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
  );
}

/** Up to `limit` posts, same category first, then newest; excludes the given ids. */
export function getRelatedPosts(post: BlogPost, exclude: string[] = [], limit = 2): BlogPost[] {
  const skip = new Set([post.id, ...exclude]);
  const rest = getSortedPosts().filter((p) => !skip.has(p.id));
  const same = rest.filter((p) => p.category === post.category);
  const other = rest.filter((p) => p.category !== post.category);
  return [...same, ...other].slice(0, limit);
}

const READ_KEY = "readPosts";

/** Posts this visitor finished; lives only in their own browser. */
export function getReadPosts(): string[] {
  try {
    const stored = JSON.parse(localStorage.getItem(READ_KEY) ?? "[]");
    return Array.isArray(stored) ? stored : [];
  } catch (_) {
    return [];
  }
}

export function markPostRead(id: string) {
  try {
    const read = getReadPosts();
    if (!read.includes(id)) localStorage.setItem(READ_KEY, JSON.stringify([...read, id]));
  } catch (_) {}
}

export interface Heading {
  id: string;
  text: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Adds ids to every <h2> and returns the headings for a table of contents. */
export function addHeadingIds(html: string): { html: string; headings: Heading[] } {
  const headings: Heading[] = [];
  const used = new Set<string>();
  const out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const text = inner.replace(/<[^>]*>/g, "").trim();
    let id = slugify(text) || `bolum-${headings.length + 1}`;
    while (used.has(id)) id += "-2";
    used.add(id);
    headings.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, headings };
}
