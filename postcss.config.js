export default {
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-nesting': {},
    'tailwindcss': {},
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
