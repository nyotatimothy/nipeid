/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV || 'development'
  },
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ['src']
  },
  typescript: {
    ignoreBuildErrors: false
  }
};

module.exports = nextConfig; 