import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Dinamik blog verileri buraya eklenecek

  return [
    {
      url: 'https://whyasaf.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://whyasaf.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://whyasaf.com/projects',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://whyasaf.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];
}
