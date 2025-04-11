/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-main': '#00f5ff',
        'primary-dark': '#00b8c4',
        'primary-light': '#33f7ff',
        'secondary-main': '#ff00ff',
        'secondary-dark': '#cc00cc',
        'secondary-light': '#ff33ff',
        'background-dark': '#0a0a0a',
        'background-light': '#1a1a1a',
        'text-primary': '#ffffff',
        'text-secondary': '#b3b3b3',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': {
            'box-shadow': '0 0 5px #00f5ff, 0 0 10px #00f5ff, 0 0 15px #00f5ff',
          },
          '50%': {
            'box-shadow': '0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 30px #00f5ff',
          },
        },
      },
    },
  },
  plugins: [],
} 