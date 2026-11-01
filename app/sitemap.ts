import { MetadataRoute } from 'next';
import { blogPosts } from '../src/data/posts';
import { SITE_URL, languages, localePath } from '../src/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = Object.values(blogPosts)
    .map((post) => new Date(post.dateISO))
    .sort((a, b) => b.getTime() - a.getTime())[0];
  // Statik sayfaların son güncelleme tarihi — içerik değiştikçe elle güncellenir
  const siteUpdated = new Date('2026-10-31');

  const pages: {
    path: string;
    lastModified: Date;
    changeFrequency: 'yearly' | 'monthly' | 'weekly';
    priority: number;
  }[] = [
    { path: '/', lastModified: siteUpdated, changeFrequency: 'yearly', priority: 1 },
    { path: '/projects', lastModified: siteUpdated, changeFrequency: 'weekly', priority: 0.9 },
    { path: '/blog', lastModified: latestPost, changeFrequency: 'weekly', priority: 0.9 },
    // Blog yazıları — posts.ts'den dinamik olarak üretiliyor
    ...Object.values(blogPosts).map((post) => ({
      path: `/blog/${post.id}`,
      lastModified: new Date(post.dateISO),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  return pages.flatMap(({ path, ...page }) =>
    languages.map((language) => ({
      url: `${SITE_URL}${localePath(language, path)}`,
      ...page,
      alternates: {
        languages: {
          tr: `${SITE_URL}${path}`,
          en: `${SITE_URL}${localePath('en', path)}`,
          'x-default': `${SITE_URL}${path}`,
        },
      },
    }))
  );
}
