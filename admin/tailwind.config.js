/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#B5282D", hover: "#9A2126" },
        secondary: { DEFAULT: "#5C7A4A", hover: "#4D663E" },
        accent: { DEFAULT: "#D89A3E" },
        cream: { DEFAULT: "#FBF4E9", alt: "#F5EAD8" },
        bark: { DEFAULT: "#2E211A", muted: "#6B5A4E" },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: { brand: "10px" },
      boxShadow: { soft: "0 10px 30px rgba(46, 33, 26, 0.08)" },
    },
  },
  plugins: [],
};
