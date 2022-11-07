/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#db147f",
        love: "#eb6f92",
        fade: "#857e7f",
      },
      screens: {
        mobile: "480px",
      },
    },
  },
  plugins: [],
}
