/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        serif: ["var(--font-serif)", "Playfair Display", "serif"],
      },
      colors: {
        dark: {
          bg: "#09090b",       // Zinc 950
          card: "#18181b",     // Zinc 900
          border: "#27272a",   // Zinc 800
          text: "#f4f4f5",     // Zinc 100
          muted: "#a1a1aa",    // Zinc 400
        }
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
