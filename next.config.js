/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@tailwindcss/postcss'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@tailwindcss/postcss': require.resolve('@tailwindcss/postcss')
    }
    return config
  },
  reactStrictMode: true,
}

module.exports = nextConfig