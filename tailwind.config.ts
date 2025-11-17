import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Grayscale Colors
        grayscale: {
          50: 'var(--grayscale-50)',
          100: 'var(--grayscale-100)',
          200: 'var(--grayscale-200)',
          300: 'var(--grayscale-300)',
          400: 'var(--grayscale-400)',
          500: 'var(--grayscale-500)',
          600: 'var(--grayscale-600)',
        },
        // Primary Green Colors
        primary: {
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
        },
        // Secondary Colors
        secondary: {
          red: {
            100: 'var(--secondary-red-100)',
            200: 'var(--secondary-red-200)',
          },
          purple: {
            100: 'var(--secondary-purple-100)',
          },
          yellow: {
            100: 'var(--secondary-yellow-100)',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
