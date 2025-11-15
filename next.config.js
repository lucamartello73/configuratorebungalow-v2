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
  // Force rebuild - disable cache
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
}

module.exports = nextConfig
