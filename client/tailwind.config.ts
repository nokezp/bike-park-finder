import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        body: ['var(--font-roboto)', 'system-ui', 'sans-serif'],
        display: ['var(--font-oswald)', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#2E7D32', // Forest Green
        'primary-dark': '#1B5E20',
        secondary: '#5D4037', // Dark Brown
        'secondary-light': '#795548',
        accent: '#FF9800', // Bright Orange
        'accent-dark': '#F57C00',
        background: '#F5F5F5', // Light Gray
      },
    },
  },
  plugins: [],
};

export default config; 