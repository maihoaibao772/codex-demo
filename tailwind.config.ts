import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: "#f72585",
          purple: "#7209b7",
          indigo: "#4361ee",
          cyan: "#4cc9f0"
        }
      },
      fontFamily: {
        display: ["'Outfit'", "'Poppins'", "sans-serif"],
        body: ["'Outfit'", "'Poppins'", "sans-serif"]
      },
      animation: {
        "gradient-slow": "gradientShift 18s ease infinite",
        "float": "float 6s ease-in-out infinite"
      },
      keyframes: {
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        },
        float: {
          "0%, 100%": { transform: "translateY(-10px)" },
          "50%": { transform: "translateY(10px)" }
        }
      },
      boxShadow: {
        neon: "0 0 25px rgba(114, 9, 183, 0.45)",
        "neon-strong": "0 0 45px rgba(76, 201, 240, 0.55)"
      }
    }
  },
  plugins: []
};

export default config;
