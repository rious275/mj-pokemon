/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/main',
        permanent: false,
      },
      {
        source: '/detail',
        destination: '/detail/1',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
