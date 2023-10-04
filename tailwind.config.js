/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yellow-main': '#f5af19',
        'orange-main': '#f16b11',
      }
    },
  },
  plugins: [],
}

