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
        navy: {
          950: "#060d18",
          900: "#0a1628",
          800: "#0f2040",
          700: "#162a54",
          600: "#1e3a6e",
        },
        gold: {
          400: "#d4aa60",
          500: "#c4952a",
          600: "#a67d22",
        },
        cream: {
          50: "#faf8f4",
          100: "#f5f1e8",
          200: "#ede6d4",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.25em",
      },
    },
  },
  plugins: [],
};

export default config;
