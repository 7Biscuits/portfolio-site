import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: {
          dark: "#09090B",   // Zinc 950
          light: "#FAFAFA",  // Zinc 50
        },
        card: {
          dark: "#18181B",   // Zinc 900
          light: "#FFFFFF",  // Pure White
        },
        border: {
          dark: "#27272A",   // Zinc 800
          light: "#E4E4E7",  // Zinc 200
        },
        accent: {
          dark: "#FFFFFF",
          light: "#09090B",
        },
        brutal: {
          coral: "#71717A",  // Muted Zinc 500
          cyan: "#E4E4E7",   // Zinc 200
          yellow: "#A1A1AA", // Zinc 400
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
