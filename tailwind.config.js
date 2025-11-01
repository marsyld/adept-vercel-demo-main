// tailwind.config.js
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#E1EEC3",   // фиолетовый акцент
          secondary: "#F05053", // бирюзовый акцент
          dark: "#0F172A"       // тёмный для текста/фоновых
        }
      }
    }
  },
  plugins: []
}
