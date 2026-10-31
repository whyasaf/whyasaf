import { MetadataRoute } from 'next';
import { blogPosts } from '../src/data/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://whyasaf.com';

  const latestPost = Object.values(blogPosts)
    .map((post) => new Date(post.dateISO))
    .sort((a, b) => b.getTime() - a.getTime())[0];
  // Statik sayfaların son güncelleme tarihi — içerik değiştikçe elle güncellenir
  const siteUpdated = new Date('2026-10-31');

  // Statik sayfalar
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: siteUpdated,
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: siteUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestPost,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Blog yazıları — posts.ts'den dinamik olarak üretiliyor
  const blogPages: MetadataRoute.Sitemap = Object.values(blogPosts).map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.dateISO),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
