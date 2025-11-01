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
          primary: "#E1EEC3",     // мягкий светло-зелёный
          secondary: "#F05053",   // кораллово-розовый
        },
      },
    },
  },
  plugins: [],
};
