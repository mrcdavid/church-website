/** @type {import('tailwindcss').Config} */

// Semantic colors resolve to CSS variables (defined in src/index.css) so a
// single class like `bg-surface` works in both light and dark mode.
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── Brand palette (fixed in both themes) ──────────────────────────
        forest: {
          50: '#F0F2EE',
          100: '#DEE3DA',
          200: '#BCC6B6',
          300: '#95A38D',
          400: '#6B7A68',
          500: '#4F5C4D',
          600: '#3E4A3D', // brand
          700: '#333D32',
          800: '#283027',
          900: '#1B211B',
          DEFAULT: '#3E4A3D',
        },
        sage: {
          50: '#F4F6EF',
          100: '#E6EBDC',
          200: '#D0D8BF',
          300: '#BAC5A5',
          400: '#A3B18A', // brand
          500: '#8A9A70',
          600: '#6E7D57',
          DEFAULT: '#A3B18A',
        },
        linen: {
          50: '#FBF8F3',
          100: '#F2EDE4', // brand
          200: '#E6DFD2',
          300: '#D6CCBA',
          DEFAULT: '#F2EDE4',
        },
        clay: {
          50: '#FAF0E9',
          100: '#F2DCCD',
          200: '#E5BA9D',
          300: '#D4916A',
          400: '#C07A4F', // brand
          500: '#A8633B', // button background (AA with white text)
          600: '#93552F',
          700: '#774426',
          DEFAULT: '#C07A4F',
        },
        charcoal: {
          700: '#30342F',
          800: '#272A26',
          900: '#1E1E1E', // brand
          DEFAULT: '#1E1E1E',
        },

        // ── Semantic tokens (switch with the theme) ───────────────────────
        bg: token('bg'),
        surface: token('surface'),
        'surface-alt': token('surface-alt'),
        fg: token('fg'),
        muted: token('muted'),
        line: token('line'),
        heading: token('heading'),
        primary: token('primary'),
        'primary-hover': token('primary-hover'),
        'on-primary': token('on-primary'),
        accent: token('accent'),
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      boxShadow: {
        soft: '0 1px 2px rgb(30 30 30 / 0.04), 0 10px 30px -12px rgb(30 30 30 / 0.18)',
        lift: '0 2px 4px rgb(30 30 30 / 0.05), 0 24px 48px -16px rgb(30 30 30 / 0.28)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'scroll-hint': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(6px)', opacity: '0.5' },
        },
      },
      animation: {
        'scroll-hint': 'scroll-hint 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
