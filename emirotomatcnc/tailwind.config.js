/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  darkMode: 'class',
  plugins: [require("flowbite/plugin")],
  theme: {
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    extend: {
      colors: {
        "primary-blue": "#427fda",
        "dark-bg": "#1a1a1a",
        "dark-surface": "#2a2a2a",
        "dark-text": "#e5e5e5",
      },
    },
  },
});
