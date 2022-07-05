/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        ...defaultTheme.screens,
      },
      colors: {
        'base-blue-100': '#B3D0E7',
        'base-blue-200': '#78B7E7',
        'base-blue-300': '#1D5C8D',
        'base-blue-400': '#2C4457',
        'base-blue-500': '#032641',
        'use-blue': '#1B6AA5',
        'use-red': '#E8110F',
        'use-yellow': '#FBC723',
        'use-dark': {
          100: '#0F0F14',
          200: '#1A1A23',
          300: '#252531',
          400: '#303040',
          500: '#3B3B4E',
          600: '#46465D',
          700: '#51516C',
          900: '#677D89',
        },
        'use-white': '#F0F3F4',
      },
      boxShadow: {
        'button': `inset 1px 1px 2px rgba(255,255,255,0.3), 
        inset 3px 15px 45px rgba(255,255,255,0.1),
        inset -1px -1px 2px rgba(0,0,0,0.5), 
        inset -3px -15px 45px rgba(0,0,0,0.2),
        1px 5px 30px -4px rgba(0,0,0,1)`,
        'button-before': `inset -1px -1px 2px rgba(255,255,255,0.3), 
        inset -5px -15px 40px rgba(255,255,255,0.1),
        inset 1px 1px 2px rgba(0,0,0,0.5), 
        inset 5px 15px 40px rgba(0,0,0,0.2),
        -2px -40px 50px -20px rgba(255,255,255,0.1),
        2px 35px 50px -10px rgba(0,0,0,0.4),
        0px 0px 25px 8px rgba(60,60,60,1)`,
        'button-hover': `inset 1px 1px 2px rgba(255,255,255,0.3), 
        inset 3px 15px 45px rgba(0,0,0,0.2),
        inset -1px -1px 2px rgba(0,0,0,0.5), 
        inset -3px -15px 45px rgba(255,255,255,0.1),
        1px 5px 10px -4px rgba(0,0,0,1)`,
      },
      keyframes: {
        bgmain: {
          '0%': { opacity: 0 },
          '25%': { opacity: .25 },
          '50%': { opacity: .5 },
          '75%': { opacity: .75 },
          '100%': { opacity: 1 }
        }
      },
      animation: {
        bgmain: 'bgmain .6s ease-in-out',
      }
    },
  },
  plugins: [],
}
