/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#928DAB",     // мягкий светло-зелёный
          secondary: "#7303c0",   // кораллово-розовый
        },
      },
    },
  },
  plugins: [],
};
