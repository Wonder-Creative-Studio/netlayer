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
        void: "#010306",
        deep: "#030810",
        navy: "#061220",
        elevated: "#0a1a34",
        surface: "rgba(8,20,40,0.5)",
        accent: {
          blue: "#3888ff",
          "blue-light": "#5ea3ff",
          "blue-dark": "#1c60cc",
          cyan: "#00d4ff",
        },
        status: {
          up: "#00e676",
          warn: "#ffc040",
          down: "#ff3860",
        },
        txt: {
          primary: "#f2f6fc",
          secondary: "#c0d0e8",
          muted: "#7a92b4",
          dim: "#4a6488",
        },
        border: {
          dim: "rgba(40,100,200,0.05)",
          mid: "rgba(56,136,255,0.10)",
          bright: "rgba(56,136,255,0.22)",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      borderRadius: {
        card: "20px",
        button: "14px",
        pill: "100px",
        badge: "6px",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        shimmer: "shimmer 4s ease-in-out infinite",
        "pulse-line": "pulse-line 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        shimmer: {
          "0%, 100%": { backgroundPosition: "200% center" },
          "50%": { backgroundPosition: "-200% center" },
        },
        "pulse-line": {
          "0%, 100%": { opacity: "0.3", transform: "scaleY(0.5)" },
          "50%": { opacity: "1", transform: "scaleY(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
