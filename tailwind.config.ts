import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
        keshar: {          
          50: '#fff8e1',
          100: '#ffecb3',
          200: '#ffe68f',
          300: '#ffd54f',
          400: '#ffca28',
          450 : '#ffab00',
          500: '#ffc107',
          600: '#ffb300',          
          800: '#ff8f00',
          900: '#ff6f00',
          brown: '#3e2d17',
          saffron : '#e5870a',
          saffronRedDark : "#690000",
          saffronRedLight:'#d6231c',
          maroon: '#320404',
          maroonLight: '#441618',
          rose:'#8e0528',
          orange:'#cf6632',
        }
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
