module.exports = {
  plugins: {
    // swiper 12 publica su CSS con nesting; el plugin tiene que correr antes
    // que tailwind para que no quede sin resolver.
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
  },
}
