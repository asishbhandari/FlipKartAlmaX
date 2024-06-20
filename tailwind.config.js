/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fBlue: "#2874F0",
        fBgColor: "#f1f2f4",
        fRed: "#FF6161",
        fGreen: "#388E3C",
      },
    },
  },
  plugins: [],
};
