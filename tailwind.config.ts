import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        neon: {
          start: '#6366f1',
          mid: '#a855f7',
          end: '#ec4899',
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(99,102,241,0.7), rgba(168,85,247,0.6), rgba(236,72,153,0.6))',
      },
      boxShadow: {
        glow: '0 0 40px rgba(99,102,241,0.35)',
      },
      animation: {
        'slow-spin': 'slow-spin 18s linear infinite',
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.4s ease-in-out infinite',
      },
      keyframes: {
        'slow-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(-1%)' },
          '50%': { transform: 'translateY(2%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(99,102,241,0.45)' },
          '50%': { boxShadow: '0 0 30px rgba(236,72,153,0.55)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
