import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F9F6F0",
        "paper-deep": "#F0EAE1",
        ink: "#2B2A28",
        "ink-soft": "#5B5750",
        pine: "#3E4D3B",
        "pine-deep": "#2E3A2C",
        gold: "#B08D57",
        rose: "#C9A9A0",
        
        // Ivory & Champagne Gold theme colors
        "luxury-dark": "#FAF8F5",
        "luxury-card": "rgba(244, 239, 230, 0.65)",
        "luxury-gold": "#B08D57",
        "luxury-gold-light": "#C5A059",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        wider2: "0.28em",
      },
      keyframes: {
        "flap-open": {
          "0%": { transform: "rotateX(0deg)" },
          "100%": { transform: "rotateX(-180deg)" },
        },
        "rise-fade": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(25px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-particle": {
          "0%": { transform: "translateY(100vh) scale(0.6)", opacity: "0" },
          "10%": { opacity: "0.5" },
          "90%": { opacity: "0.5" },
          "100%": { transform: "translateY(-10vh) scale(1)", opacity: "0" },
        },
        "shimmer-gold": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "soundwave": {
          "0%, 100%": { height: "4px" },
          "50%": { height: "24px" },
        },
      },
      animation: {
        "rise-fade": "rise-fade 0.9s cubic-bezier(0.22,1,0.36,1) both",
        "fade-up": "fade-up 1s cubic-bezier(0.22,1,0.36,1) both",
        "float-particle": "float-particle 15s linear infinite",
        "shimmer-gold": "shimmer-gold 6s ease infinite",
        "soundwave-1": "soundwave 1.2s ease-in-out infinite alternate-reverse",
        "soundwave-2": "soundwave 0.8s ease-in-out infinite alternate",
        "soundwave-3": "soundwave 1.0s ease-in-out infinite alternate-reverse",
        "soundwave-4": "soundwave 0.6s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};

export default config;
