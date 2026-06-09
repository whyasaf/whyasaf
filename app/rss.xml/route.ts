import { NextResponse } from "next/server";
import { blogPosts } from "../../src/data/posts";

export async function GET() {
  const postsList = Object.values(blogPosts).sort((a, b) => {
    return new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime();
  });

  const feedItems = postsList.map((post) => {
    const link = `https://whyasaf.com/blog/${post.id}`;
    
    // Using CDATA wrappers to escape HTML/Turkish characters safely for XML validation
    return `
    <item>
      <title><![CDATA[${post.en.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(post.dateISO).toUTCString()}</pubDate>
      <description><![CDATA[${post.en.lead}]]></description>
      <content:encoded><![CDATA[${post.en.content}]]></content:encoded>
    </item>`;
  }).join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title><![CDATA[Ömer Asaf Ak // Blog]]></title>
  <link>https://whyasaf.com/blog</link>
  <description><![CDATA[Personal blog on tech, design, systems architecture, and investment.]]></description>
  <language>en</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="https://whyasaf.com/rss.xml" rel="self" type="application/rss+xml" />
  ${feedItems}
</channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=18000",
    },
  });
}
