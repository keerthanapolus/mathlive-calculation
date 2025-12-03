/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'flow-bg': '#f8fafc',
        'flow-dark': '#1a1a1a',
        'flow-node': '#ffffff',
        'flow-node-dark': '#2d2d2d',
        'flow-border': '#e2e8f0',
        'flow-border-dark': '#404040',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
