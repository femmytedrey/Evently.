/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#7952FC",
        primary_gradient: "#B15CDE",
        primary_outline: "#D5D5DD",
        secondary: "#13123A"
      }
    },
  },
  plugins: [],
};
