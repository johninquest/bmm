// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#81C784',
        secondary: '#F0F4C3',         
        warning: '#FFCCBC',
        'custom-blue': '#4B89DA',
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#81C784",
          "secondary": "#F0F4C3",
          "accent": "#4B89DA",
          "neutral": "#2a2e37",
          "base-100": "#ffffff",
          "warning": "#FFCCBC",
        },
      },
    ],
  },
}