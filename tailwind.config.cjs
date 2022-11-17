/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#DF6562",        
          "secondary": "#E7B9A5",        
          "accent": "#F8DC56",        
          "neutral": "#F9EFE8",         
          "base-100": "#FAFAFA",        
          "info": "#3ABFF8",        
          "success": "#43B549",        
          "warning": "#F8DC56",        
          "error": "#DF6562",        
        },
        fontFamily: {
          Poppins: ["Poppins", "sans-serif"],
          Margin : ['Margin DEMO', "sans-serif"]                                                
        }
      },
    ],
  },
};