/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0f766e',
        accent: '#fbbf24',
      },
      boxShadow: {
        soft: '0 10px 40px rgba(15, 118, 110, 0.12)',
      },
    },
  },
  plugins: [],
};
