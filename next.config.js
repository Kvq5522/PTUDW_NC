/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost', 'github.com', 'firebasestorage.googleapis.com'],
  },
}

module.exports = nextConfig
