/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'keywords-fade': 'fade-in 0.5s 1.5s forwards;',
        'non-keywords-fade': 'fade-in 2s 2.5s forwards',
        'header-appear-from-left': 'appear-from-left 1s ease-in-out forwards;',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
        'appear-from-left': {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0',
            left: '-100%',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
            left: '0',
          },
        },
      },
    },
  },
  plugins: ['flowbite/plugin'],
};
