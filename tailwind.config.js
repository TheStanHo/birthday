/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'birthday-gold': '#FFD700',
        'birthday-pink': '#FF69B4',
        'birthday-purple': '#9370DB',
      },
      animation: {
        'flicker': 'flicker 0.15s infinite',
        'blow-out': 'blow-out 0.5s ease-out forwards',
        'confetti': 'confetti 3s ease-out forwards',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        'blow-out': {
          '0%': { opacity: 1, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(0)' },
        },
        confetti: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}

