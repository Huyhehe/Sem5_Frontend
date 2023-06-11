/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#db147f",
        secondary: "#32a4fc",
        love: "#eb6f92",
        fade: "#857e7f",
        coral: "#e1999f",
        gold: "#f6c177",
        base: "#1890ff",
        dollar: "#009111",
        error: "#ff4d4f",
        border: "#e5e7eb",
      },
      screens: {
        mobile: { max: "480px" },
        tablet: { max: "767px", min: "481px" },
      },
    },
  },
  plugins: [],
}
