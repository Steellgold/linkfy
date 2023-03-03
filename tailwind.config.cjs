/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        behind: "#273345"
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
