import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        zyvo: {
          lime: "#C5FF55",
          "lime-hover": "#b2f03f",
          "lime-muted": "#23381a",
          dark: "#101510",
          "dark-surface": "#161D16",
          "dark-card": "#1C241C",
          "dark-border": "#283628",
          "dark-hover": "#222D22",
          muted: "#8A9A8A",
          light: "#F7FAF7",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "-apple-system", "sans-serif"],
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
