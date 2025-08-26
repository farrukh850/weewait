/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#084DA7',
        primary_black: '#1E1E1E',
        accent: '#FFA9CF',
        accent_hover: '#F27EB1',
        accent_skyblue: '#7DADFE',
        bg_grey: '#F8FAFB'
      },
      fontFamily: {
        'figtree': ['Figtree', 'sans-serif'],
        'rocaone': ['RocaOne', 'sans-serif'],
      },
      lineHeight: {
        'extra-loose': '110px',
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
      },
      width: {
        '8xl': '1760px',
      },
      screens: {
        'xxl': '1600px',
      },
      borderRadius: {
        '32': '32px',
      },
    },
  },
  plugins: [],
}
