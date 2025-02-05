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
      fontSize: {
        "mobile-actionable": "1.5rem",
        "mobile-reading": "1.4rem",
        "tablet-actionable": "1.5rem",
        "tablet-reading": "1.5rem",
        "desktop-actionable": "2.4rem",
        "desktop-reading": "2rem",
      },
    },
  },
  plugins: [],
};
