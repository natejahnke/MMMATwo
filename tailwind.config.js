/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "iphone13-mini": {
          raw: "(width: 375px) and (height: 812px) and (-webkit-device-pixel-ratio: 3)",
        },
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },
      container: {
        center: true,
      },
      fontFamily: {
        sans: ["Caveat", "Helvetica", "Arial", "sans-serif"],
        // display: ["Dosis", "sans-serif"],
        // body: ["Oswald", "sans-serif"],
      },
      fontWeight: {
        bold: "bold",
      },
      fontSize: {
        "2xs": "10px",
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "20px",
        xl: "24px",
        "2xl": "32px",
      },
      backgroundColor: {
        primary: "#313654",
        secondary: "#454F88",
      },
      textColor: {
        main: "#FFFFFF",
        secondary: "#F3F6FB",
        tertiary: "#89A3D1",
        quaternary: "#C8D5BB",
        five: "#D0DAED",
        six: "#313654"
      },
      backgroundImage: {
        "red-gradient": "linear-gradient(to bottom, #EF3432, #454F88)",
        "blue-gradient": "linear-gradient(to bottom, #3245EF, #454F88)",
      },
    },
  },
  plugins: [],
};
