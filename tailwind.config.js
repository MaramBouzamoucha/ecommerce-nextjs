/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        // Utilise les variables CSS définies dans layout.js
        sans: [
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
        heading: [
          "var(--font-poppins)",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },

  plugins: [],
};