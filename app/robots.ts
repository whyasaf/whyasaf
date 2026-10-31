import { MetadataRoute } from 'next';

const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: aiBots, allow: '/' },
    ],
    sitemap: 'https://whyasaf.com/sitemap.xml',
    host: 'https://whyasaf.com',
  };
}
