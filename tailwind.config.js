/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        primaryblue: "#0275ff",
      },
      darkMode: "class",
      colors: {
        background: "#212121",
        primaryblue: "#0275ff",
        primary: "#ff6600",
        hoverblue: "#024BA3",
        textcolor: "#b3b7bc",
        bordercolor: "#f1f0f3",
        outline: "#E0E0E0",
        fortrexorange: "#ff6600",
        secondary: "#ff6600",
        primaryred: "#ff0000",
      },
    },
  },
  plugins: [],
};
