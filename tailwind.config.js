/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#084DA7',
        primary_black: '#1E1E1E',
        accent: '#FFA9CF',
        accent_hover: '#F27EB1',
        accent_skyblue: '#7DADFE',
        accent_yellow: '#FEEA94',
        bg_grey: '#F8FAFB',
        'childcare_card': '#F8FAFB',
        'feedbacks_bg': '#084DA7'
      },
      fontFamily: {
        'figtree': ['Figtree', 'sans-serif'],
        'rocaone': ['RocaOne', 'sans-serif'],
      },
      lineHeight: {
        'extra-loose': '110px',
        '80': '80px',
        '120': '120%',
        '110': '110%',
      },
      fontSize: {
        '6xl': '64px',
        '7xl': '90px',
        'textmed': '32px',
        'mobile': '40px'
      },
      height: {
        '736': '736px',
        '240': '240px',
        'plan_card_height': '697px'
      },
      width: {
        '8xl': '1760px',
        'daycare_btn_width': '248px',
        '600': '600px',
        '800': '800px',
      },
      screens: {
        'xxl': '1600px',
      },
      borderRadius: {
        '32': '32px',
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
}
