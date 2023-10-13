/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "0.5rem",
    },
    extend: {
      colors: {
        default: "#f9fafb",
        paper: "#ffffff",
      },
    },
  },
  plugins: [],
};
