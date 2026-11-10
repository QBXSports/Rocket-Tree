/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#102A43",
          navyDark: "#0B1D30",
          navyLight: "#243B53",
          orange: "#FF7A1A",
          orangeHover: "#E6680D",
          green: "#20A464",
          greenDark: "#17824E",
          greenLight: "#E8F8F0",
          bg: "#F5F7FA",
          surface: "#FFFFFF",
          text: "#182230",
          muted: "#627D98",
          border: "#E2E8F0"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
