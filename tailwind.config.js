/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      tablet: "768px",
      desktop: "1024px",
    },
    extend: {
      colors: {
        primary: {
          white: "#FEFDF3",
          black: "#000000",
          "light-blue": "#D9F5FC",
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        unbounded: ["Unbounded", "sans-serif"],
      },
    },
  },
  plugins: [],
};
