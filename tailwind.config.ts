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
      transitionDuration: {
        '2000': '2000ms',
      },
      borderRadius: {},
      colors: {
        davysGray: '#5B5B5D',
        dimGray: '#71717A',
        antiFlashWhite: '#F4F4F5',
        slateGray: '#6B7280',
        tropicalIndigo: '#8381D9',
        moonstone: '#50B2C0',
        silver: '#A9A9A9',
        xanthous: '#EAB308',
        jet: '#333333',
        platinum: '#D9D9D9',
        lavenderBlush: '#FDEDED',
        indianRed: '#EB5D5F'
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('daisyui'),
    require('tailwind-scrollbar'),
  ],
};
export default config;
