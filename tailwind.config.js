/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}','./node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        'main':"#0aad0a",
        'secondary':"#919eab",
        'nav-bg-color':"#f0f3f2"
      },
      container:{
        center:true
      }
    },
  },
  plugins: [ require('flowbite/plugin') ],
}

