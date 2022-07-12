/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Source Sans Pro", "sans-serif"],
        encode: ["Encode Sans", "sans-serif"],
        pop: ["Poppins"],
      },
      colors: {
        grayish: "#f4f5f7",
      },
    },
  },
  plugins: [],
};
