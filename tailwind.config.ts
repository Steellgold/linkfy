import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{tsx,ts}"
  ],
  theme: {
    colors: {
      white: "#ffffff",
      black: "#000000",

      primary: {
        default: "#2563eb",
        hover: "#2563eb",
        disabled: "#1d3f97"
      },
      gray: {
        DEFAULT: "#6b7280",
        hover: "#878d98",
        border: "#374151"
      },
      blue: {
        DEFAULT: "#111827",
        hover: "#0f1623",
        shadow: "#1a2231",
        card: "#1f2937"
      },
      red: {
        DEFAULT: "#ef4444",
        hover: "#f87171"
      },
      green: {
        DEFAULT: "#10b981",
        hover: "#34d399"
      },
      yellow: {
        DEFAULT: "#f59e0b",
        hover: "#fcd34d"
      }
    }
  },
  plugins: []
} satisfies Config;