/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  plugins: [require("flowbite/plugin")],
  theme: {
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      inter: ["Inter", "system-ui", "sans-serif"],
    },
    extend: {
      colors: {
        "primary-blue": "#427fda",
        "primary-blue-hover": "#3568b8",
        "primary-blue-light": "#ebf2fc",
        "primary-blue-dark": "#2a5db0",
        surface: "#ffffff",
        "surface-muted": "#f8fafc",
        "surface-accent": "#f1f5f9",
        "footer-bg": "#232a34",
        "border-soft": "#e2e8f0",
        "border-strong": "#cbd5e1",
        "text-main": "#0f172a",
        "text-muted": "#475569",
        "text-subtle": "#64748b",
      },
      boxShadow: {
        card: "0 1px 3px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.04)",
        "card-hover": "0 4px 16px rgba(15, 23, 42, 0.12), 0 8px 24px rgba(66, 127, 218, 0.08)",
        "nav": "0 1px 0 0 #e2e8f0, 0 2px 8px rgba(15, 23, 42, 0.06)",
      },
      borderRadius: {
        card: "0.75rem",
        btn: "0.375rem",
      },
      transitionDuration: {
        400: "400ms",
        600: "600ms",
      },
    },
  },
});
