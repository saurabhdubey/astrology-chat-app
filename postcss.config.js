module.exports = {
  plugins: {
    'postcss-import': {},
    '@tailwindcss/postcss': {
      tailwindConfig: './tailwind.config.js'
    },
    autoprefixer: {},
  }
}