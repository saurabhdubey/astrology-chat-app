/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimizes Tailwind CSS processing
  experimental: {
    optimizePackageImports: ['@tailwindcss/postcss'],
  },
  
  // Webpack configuration to fix build errors
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback, // Preserve existing fallbacks
      fs: false,                  // Disables fs module for browser
      module: false               // Disables module for browser
    };
    return config;
  },
  
  // Optional: Enable React Strict Mode
  reactStrictMode: true,
  
  // Optional: Configure images if using Next.js Image
  images: {
    domains: ['images.unsplash.com'], // Add your image domains
  }
}

module.exports = nextConfig