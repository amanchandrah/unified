/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        audiowide: ['"Audiowide"', 'cursive'],
        creepster: ['Creepster', 'cursive'],
        orbitron: ['Orbitron', 'sans-serif'], // optional if used elsewhere
      },
    },
  },
  plugins: []
}