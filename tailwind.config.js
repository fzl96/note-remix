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
        grayishDark: "#141517",
        grayishDark2: "#1a1b1e",
      },
    },
  },
  plugins: [],
};
