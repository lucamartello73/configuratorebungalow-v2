/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'page.gensparksite.com',
      },
      {
        protocol: 'https',
        hostname: 'www.genspark.ai',
      },
    ],
  },
}

module.exports = nextConfig
