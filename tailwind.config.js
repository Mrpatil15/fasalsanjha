/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F0F7F2',
          100: '#DCEEE1',
          200: '#B8DDC3',
          500: '#2E8B3E',
          700: '#1B6A30',
          800: '#0F5426',
          900: '#0B4F2E', // Brand Primary
        },
        harvest: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          400: '#FBBF24',
          500: '#F5A623', // Brand Gold
          600: '#D97706',
        },
        limeaccent: '#8CC63F',
        cream: '#FAF8F0',
        cardmint: '#E8F5E9',
        cardsky: '#E1F5FE',
        cardlavender: '#EDE7F6',
        cardpeach: '#FFF3E0',
        cardrose: '#FCE4EC',
        cardamber: '#FEF3C7',
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        devanagari: ['Noto Sans Devanagari', 'Poppins', 'sans-serif'],
      },
      borderRadius: {
        'card': '18px',
        '2card': '24px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(11, 79, 46, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'elevated': '0 12px 32px -4px rgba(11, 79, 46, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
