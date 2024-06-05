/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'cyan-normal': '#0891B2', // cyan-600
        'cyan-deep': '#0E7490', // cyan-700
      },
      animation: {
        'bounce': 'bounce 1.5s ease infinite',
        'fade-in': 'fade-in 0.5s forwards;',
        'fade-in-no-delay': 'fade-in 1s forwards;',
        'fade-in-slower': 'fade-in 2s ease-in 0.5s forwards',
        'right-appear': 'appear-from-right 0.5s ease-in 0.5s forwards',
        'bottom-appear': 'appear-from-bottom 0.5s ease-in both ',
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
        'appear-from-right': {
          '0%': {
            opacity: 0,
            transform: 'translateX(50px)',
          },
          '80%': {
            opacity: 30,
          },
          '100%': {
            opacity: 100,
            transform: 'translateX(0)',
          },
        },
        'appear-from-bottom': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '100',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: ['flowbite/plugin'],
};
