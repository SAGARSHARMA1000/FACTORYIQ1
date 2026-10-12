/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0A1628',
        navyMid: '#112240',
        teal: '#00C9A7',
        tealDim: '#028090',
        card: '#142035',
      },
    },
  },
  plugins: [],
};
