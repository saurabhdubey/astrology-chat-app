module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles
  },
  important: '#__next', // Scopes Tailwind to Next.js root
  theme: {
    extend: {},
  },
  plugins: [],
}
