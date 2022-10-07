/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
    minHeight: {
      '1/2': '50%',
    },
    minWidth: {
      '1/3': '33.333333%',
    },
    maxWidth: {
      '1/2': '50%',
      '1/3': '33.333333%'
    }
  },
  plugins: [],
}
