import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // dark mode only via class, never auto from system
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
      colors: {
        // garde la palette emerald / stone de Tailwind, rien à étendre
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;