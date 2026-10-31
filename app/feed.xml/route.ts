import { blogPosts } from '../../src/data/posts';

const escapeXml = (str: string) =>
  str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const dynamic = 'force-static';

export function GET() {
  const posts = Object.values(blogPosts).sort(
    (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
  );

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.tr.title)}</title>
      <link>https://whyasaf.com/blog/${post.id}</link>
      <guid>https://whyasaf.com/blog/${post.id}</guid>
      <pubDate>${new Date(post.dateISO).toUTCString()}</pubDate>
      <description>${escapeXml(post.tr.lead)}</description>
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>whyasaf</title>
    <link>https://whyasaf.com/blog</link>
    <description>Ömer Asaf Ak — teknoloji, tasarım, sistem mimarileri ve yatırım üzerine notlar.</description>
    <language>tr</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
