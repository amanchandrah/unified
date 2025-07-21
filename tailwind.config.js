/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'audiowide': ['Orbitron', 'sans-serif'],
        'creepster': ['Creepster', 'cursive'],
      },
    },
  },
  plugins: []
}

