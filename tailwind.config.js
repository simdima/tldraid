/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    extend: {
      colors: {
        'cyan-normal': '#0891B2',
        'cyan-deep': '#0E7490',
      },
      // listStyleType: {
      //   'disclosure-closed': 'disclosure-closed',
      // },
      animation: {
        /* duration | easing-function | delay | iteration-count | direction | fill-mode | play-state | name  */
        // 'spin-slow': 'spin 3s linear forwards',
        'fade-in': 'fade-in 0.5s 1.5s forwards;',
        'fade-in-slower': 'fade-in 1s ease-in-out 1s forwards',
        'fade-in-slowest': 'fade-in 2s ease-in-out 2.5s 1 forwards',
        'left-appear': 'appear-from-left 1s ease-in-out forwards',
        'right-appear': 'appear-from-right 1s ease-in-out 3s forwards',
        'top-appear': 'appear-from-top 1s ease-in-out 1s forwards',
        'bottom-appear': 'appear-from-bottom 1s ease-in-out 2s forwards',
        // 'right-appear': 'appear-from-right 1s ease-in-out 2.5s 1 forwards',
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
            left: '-100%',
          },
          '100%': {
            transform: 'translateX(0)',
            left: '0',
          },
        },
        'appear-from-right': {
          '0%': {
            opacity: 0,
            transform: 'translateX(100%)',
            right: '100%',
          },
          '100%': {
            opacity: 100,
            transform: 'translateX(0)',
            right: '0',
          },
        },
        'appear-from-top': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-100%)',
            top: '-100%',
          },
          '100%': {
            opacity: '100',
            transform: 'translateY(0)',
            top: '0',
          },
        },
        'appear-from-bottom': {
          '0%': {
            opacity: '0',
            transform: 'translateY(100%)',
            bottom: '100%',
          },
          '100%': {
            opacity: '100',
            transform: 'translateY(0)',
            bottom: '0',
          },
        },
      },
    },
  },
  plugins: ['flowbite/plugin'],
};
