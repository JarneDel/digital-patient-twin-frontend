/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors:{
        primary:{
          500: "#C42828",
          400: "#FA6262",
          300: "#FB9191",
          200: "#F19D99",
          100: "#E19393",
          50: "#F8C8CE",
        },
        secondary:{
          500: "#158E87",
          400: "#44A9A3",
          300: "#72C4BF",
          200: "#92D2CE",
          100: "#CFE7E8",
        },
        tertiary:{
          500: "#927FB8",
          400: "#AD9FCA",
          300: "#C8BFDB",
          200: "#CFC6DF",
          100: "#D3CCE3",
          50: "#BDB5CC",
        },
        neutral:{
          600: "#FAFBFD",
          500: "#F3F4F6",
          400: "#F7F6F9",
          300: "#EDECEE",
          200: "#999999",
          100: "#645F5F",
        },
        other:{
          100: "#F6CCA2",
        }
      },
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    dropShadow: {
      "black": "0 4px rgba(0, 0, 0, 0.50)",
      "normal": "0 4px rgba(0, 0, 0, 0.22)",
    },
  },
  plugins: [],
}

