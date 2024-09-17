import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-roboto)', ...fontFamily.sans],
        body: ['var(--font-roboto)', ...fontFamily.mono],
      },
      borderRadius: {},
      colors: {},
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
