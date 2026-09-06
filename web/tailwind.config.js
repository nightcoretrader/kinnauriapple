/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#B5282D", hover: "#9A2126" },
        secondary: { DEFAULT: "#5C7A4A", hover: "#4D663E" },
        accent: { DEFAULT: "#D89A3E" },
        cream: { DEFAULT: "#FBF4E9", alt: "#F5EAD8" },
        bark: { DEFAULT: "#2E211A", muted: "#6B5A4E" },
        blush: "#F1B6A8",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "var(--font-deva)", "system-ui", "sans-serif"],
      },
      borderRadius: { brand: "10px" },
      boxShadow: { soft: "0 10px 30px rgba(46, 33, 26, 0.08)" },
    },
  },
  plugins: [],
};
