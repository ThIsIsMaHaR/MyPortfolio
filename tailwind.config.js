/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0a192f",    // Navy Background
        secondary: "#64ffda",  // Teal Accent
        tertiary: "#112240",   // Lighter Navy for cards
      },
    },
  },
  plugins: [],
}