import { blogPosts } from "../data/posts";
import { Language, SITE_URL, localePath } from "./i18n";

const escapeXml = (str: string) =>
  str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const descriptions = {
  tr: "Ömer Asaf Ak — teknoloji, tasarım, sistem mimarileri ve yatırım üzerine notlar.",
  en: "Ömer Asaf Ak — notes on technology, design, systems architecture and investing.",
};

export function feedResponse(language: Language): Response {
  const posts = Object.values(blogPosts).sort(
    (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
  );

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}${localePath(language, `/blog/${post.id}`)}`;
      return `    <item>
      <title>${escapeXml(post[language].title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(post.dateISO).toUTCString()}</pubDate>
      <description>${escapeXml(post[language].lead)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>whyasaf</title>
    <link>${SITE_URL}${localePath(language, "/blog")}</link>
    <description>${descriptions[language]}</description>
    <language>${language}</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
