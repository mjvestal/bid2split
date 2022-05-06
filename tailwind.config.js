const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      'amber-500': '#FFA822',
      'cyan-300': '#8EEDF0',
      'cyan-500': '#1ac0c6',
      'cyan-800': '#128387',
      'salmon-200': '#FFBAB3',
      'salmon-700': '#FF6150',
      'sky-700': '#124C6E',
      // Brands
      'airbnb': '#FF385C',
      'vrbo': '#245abc',
    },
    extend: {
      fontFamily: {
        brand: ['Quicksand', 'Helvetica', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@rvxlab/tailwind-plugin-ios-full-height'),
  ],
}
