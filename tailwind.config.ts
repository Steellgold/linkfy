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
          100: "#4f5bd5"
        },
        stripe: {
          DEFAULT: "#635bff",
          100: "#4f5bd5"
        },
        gold: {
          DEFAULT: "#FFD700",
          100: "#FFC400"
        }
      }
    }
  },
  plugins: []
} satisfies Config;