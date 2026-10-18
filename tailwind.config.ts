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
        // Qatar-inspired brand palette
        brand: {
          50:  "#fff3f0",
          100: "#ffe4dc",
          200: "#ffcabc",
          300: "#ffa38e",
          400: "#ff7358",
          500: "#ff4a28",  // primary brand: warm red-orange (Qatar flag red + modern)
          600: "#e83510",
          700: "#c12a0d",
          800: "#9e2610",
          900: "#832614",
          950: "#471009",
        },
        // Qatar Maroon accent
        maroon: {
          50:  "#fdf2f4",
          100: "#fce7ec",
          200: "#f9d0da",
          300: "#f4a8bb",
          400: "#ec7597",
          500: "#e04878",
          600: "#cb2a5e",
          700: "#8b1a3f",  // deep Qatar maroon
          800: "#751538",
          900: "#651432",
          950: "#3b0719",
        },
        gold: {
          400: "#f6cc5c",
          500: "#e6b429",
          600: "#c99410",
        },
        surface: {
          DEFAULT: "#ffffff",
          secondary: "#f8f7f5",
          tertiary: "#f0eeea",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.1)",
        product: "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #ff4a28 0%, #e83510 100%)",
        "hero-gradient": "linear-gradient(120deg, #1a0a06 0%, #3b1208 50%, #8b1a3f 100%)",
        "card-gradient": "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7) 100%)",
      },
      animation: {
        ticker: "ticker 30s linear infinite",
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
