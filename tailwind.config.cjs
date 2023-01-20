/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,svelte,ts}"
  ],
  theme: {
    extend: {
      colors: {
        "pro": {
          DEFAULT: "#d9b745",
          "h": "#c9aa3e",
          "f": "#bda142",
          "d": "#947d2e"
        }
      }
    }
  },
  plugins: []
};