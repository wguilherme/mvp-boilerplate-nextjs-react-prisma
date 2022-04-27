module.exports = {
  mode: 'jit', // bundle only used files
  content: [
    './src/components/**/*.tsx',
    './src/page/**/*.tsx',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
