/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
       
        orange: {
          500: '#FF5C02;', // Couleur du bouton de connexion
          600: '#E25928', // Version plus foncée pour hover
          
        }
      }
    },
  },
  plugins: [],
}