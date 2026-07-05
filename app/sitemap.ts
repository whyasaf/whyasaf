import { MetadataRoute } from 'next';
import { blogPosts } from '../src/data/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://whyasaf.com';

  // Statik sayfalar
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
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
