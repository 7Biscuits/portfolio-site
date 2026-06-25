import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: {
          dark: "#0B0F19",
          light: "#F7F6F0", // Retro Cream
        },
        card: {
          dark: "#161B26",
          light: "#FFFFFF",
        },
        border: {
          dark: "#FFFFFF",  // Solid white borders in dark mode
          light: "#000000", // Solid black borders in light mode
        },
        accent: {
          dark: "#00F2FE",   // Electric Cyan
          light: "#0284C7",  // Sky Blue
        },
        brutal: {
          coral: "#FF6B6B",
          cyan: "#38BDF8",
          yellow: "#FDE047",
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
