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
        coral: "#e1999f",
        gold: "#f6c177",
      },
      screens: {
        mobile: { max: "480px" },
        tablet: { max: "767px", min: "481px" },
      },
    },
  },
  plugins: [],
}
