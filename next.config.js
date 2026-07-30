/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/standard', destination: '/pillars', permanent: true },
      { source: '/suggest',  destination: '/join',    permanent: true },
    ]
  },
}

module.exports = nextConfig
