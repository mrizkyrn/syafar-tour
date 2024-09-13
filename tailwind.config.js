/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'linear-gradient': 'linear-gradient(180deg, rgba(240, 242, 245, 0) 80.6%, #D7AF57 354.32%)',
        'section-pattern': 'url("/images/pattern.png")',
        'image-linear-gradient': 'linear-gradient(180deg, rgba(240, 242, 245, 0) 80.6%, #D7AF57 354.32%), url("/images/packet-header.png")',
      },
      colors: {
        primary: '#D7AF57',
        primaryDark: '#B48E3F',
        secondary: '#353535',
        // tertiary: '#FFD166',
        dark: '#272727',
        light: '#FDFFFC',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
