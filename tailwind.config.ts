import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        neon: {
          cyan: '#00f5ff',
          purple: '#9b5bff',
          magenta: '#ff1f8f',
        },
      },
      fontFamily: {
        sans: ['"Outfit"', '"Poppins"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-hue': 'linear-gradient(120deg, #0a0a0a, #0b0015, #100015)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(0, 245, 255, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;

