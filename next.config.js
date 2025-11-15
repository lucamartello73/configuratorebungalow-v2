/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'page.gensparksite.com',
      },
    ],
  },
}

module.exports = nextConfig
