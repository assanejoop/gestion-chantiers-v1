/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // définit 'sans' comme Inter
      },
      colors: {
       
        orange: {
          500: '#FF5C02;', // Couleur du bouton de connexion
          600: '#E25928', // Version plus foncée pour hover
          orangeCustom: 'var(--orange-color)', // nom personnalisé
        },
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
      }
      
    },
  },
  plugins: [],
}