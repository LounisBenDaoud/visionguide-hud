/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hud-cyan': '#00ffff',
        'hud-green': '#39ff14',
        'hud-orange': '#ff6b35',
        'hud-dark': '#0a0a0f',
        'hud-panel': 'rgba(0, 20, 30, 0.85)',
      },
      animation: {
        'scan': 'scan 2.5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 1.5s ease-in-out infinite',
        'flicker': 'flicker 0.1s infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { top: '0%' },
          '50%': { top: '100%' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px #00ffff, 0 0 10px #00ffff' },
          '50%': { boxShadow: '0 0 20px #00ffff, 0 0 40px #00ffff' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      fontFamily: {
        'hud': ['Orbitron', 'Rajdhani', 'monospace'],
      },
    },
  },
  plugins: [],
}
