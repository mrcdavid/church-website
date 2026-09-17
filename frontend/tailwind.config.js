/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F7CAC', // Primary Blue
          dark: '#315A7D',    // Deep Blue
        },
        softblue: '#DCEAF5',
        deepblue: '#315A7D',
        green: {
          DEFAULT: '#6FA58A', // Primary Green
        },
        softgreen: '#DDEDE5',
        cream: '#FAF9F4',
        ink: '#263238', // Text
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1180px',
      },
    },
  },
  plugins: [],
}
