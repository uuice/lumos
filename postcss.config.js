export default {
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-nesting': {},
    'tailwindcss': { config: './tailwind.config.js' },
    'autoprefixer': {},
    'cssnano': {
      preset: 'default'
    }
  },
  map: {
    inline: false,
    annotation: true,
    sourcesContent: true,
    from: undefined
  }
}
