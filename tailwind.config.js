export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00FFC6',
          hover: '#00e6b3',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}