import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: "#F6FFF4",
          100: "#DFF5E6",
          500: "#167A3A",
          700: "#0B4F2A",
        },
        sky: "#38BDF8",
        sun: "#F6C343",
        harvest: "#F59E0B",
        earth: "#9A6B3F",
        cream: "#FFF8E7",
        slateText: "#334155",
        mutedText: "#64748B",
        gardenBorder: "#D9E8DD",
      },
      boxShadow: {
        eco: "0 18px 45px rgba(11, 79, 42, 0.12)",
        soft: "0 10px 28px rgba(51, 65, 85, 0.08)",
        cardStroke:
          "inset 0 1px 0 rgba(255, 255, 255, 0.72), 0 12px 30px rgba(51, 65, 85, 0.08)",
      },
      borderRadius: {
        eco: "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
