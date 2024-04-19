/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: ["./src/**/*.{html,js,ts,vue,css}"],
  theme: {
    extend: {
      colors: {
        red: colors.red,
        blue: colors.blue,
        yellow: colors.yellow,
        green: colors.green,
        gray: colors.gray,
        white: colors.white,
        black: colors.black,
        },
    },
  },
  plugins: [],
}

