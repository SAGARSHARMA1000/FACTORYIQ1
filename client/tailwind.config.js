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
        steeldim: '#1F314F',
        ink: '#DCE8F0',
        inkdim: '#8FA4B8',
      },
      fontFamily: {
        sans: ['Geist', 'Space Grotesk', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['Chakra Petch', 'Space Grotesk', 'sans-serif'],
        display: ['Chakra Petch', 'Space Grotesk', 'sans-serif'],
        mono: ['Space Mono', 'Geist Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
