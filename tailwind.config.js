// tailwind.config.js
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#7B61FF",   // фиолетовый акцент
          secondary: "#00E0FF", // бирюзовый акцент
          dark: "#0F172A"       // тёмный для текста/фоновых
        }
      }
    }
  },
  plugins: []
}
