/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ozgecmis',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
      // Eski URL'ler — Google'ın eski sitemap'ten bildiği ölü URL'ler
      {
        source: '/iletisim',
        destination: '/',
        permanent: true,
      },
      {
        source: '/site-haritasi',
        destination: '/',
        permanent: true,
      },
      // Eski blog URL yapısı: /post-detail?id=slug → /blog/slug
      {
        source: '/post-detail',
        has: [{ type: 'query', key: 'id', value: '(?<slug>.*)' }],
        destination: '/blog/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
