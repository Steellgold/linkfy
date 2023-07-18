import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{tsx,ts}"
  ],
  theme: {
    extend: {
      colors: {
        discord: {
          DEFAULT: "#5865F2",
          hover: "#4f5bd5"
        }
      }
    }
  },
  plugins: []
} satisfies Config;