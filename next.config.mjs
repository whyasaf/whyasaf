/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/ozgecmis',
        destination: '/about',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
