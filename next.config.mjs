/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    globalNotFound: true,
  },
  // Turkish keeps the unprefixed URLs, English lives under /en
  async rewrites() {
    return [
      { source: '/', destination: '/tr' },
      { source: '/projects', destination: '/tr/projects' },
      { source: '/blog', destination: '/tr/blog' },
      { source: '/blog/:slug', destination: '/tr/blog/:slug' },
    ];
  },
  async redirects() {
    return [
      { source: '/tr', destination: '/', permanent: true },
      { source: '/tr/:path*', destination: '/:path*', permanent: true },
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
