/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "320px",
      md: "426px",
      lg: "769px",
    },
  },
  plugins: [],
};
