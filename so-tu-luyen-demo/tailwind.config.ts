import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      fontFamily: {
        sans: ['"Be Vietnam Pro"', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        ink: {
          50: '#f4f7fb',
          100: '#e8ecf5',
          200: '#cbd7eb',
          300: '#a7b8d8',
          400: '#7d93c1',
          500: '#5f74a8',
          600: '#4b5b8b',
          700: '#3e4a6f',
          800: '#343e5b',
          900: '#2c344b'
        }
      },
      boxShadow: {
        soft: '0 20px 35px -20px rgba(15, 23, 42, 0.35)'
      }
    }
  },
  plugins: []
};

export default config;
