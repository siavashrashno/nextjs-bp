const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
const fontFamily = defaultTheme.fontFamily;

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  dark: false,
  theme: {
    fontFamily: {
      ...fontFamily,
      mulish: ["Mulish", ...fontFamily.sans],
    },
    extend: {
      colors: {
        primary: "#d41114",
        background: "#ffffff",
      },
      zIndex: {
        layout: 50,
      },
      spacing: {
        header: "5.8125rem",
        "header-md": "3.8125rem",
      },
    },
    screens: {
      xs: "375px",
      ...defaultTheme.screens,
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        body: {
          "background-color": theme("colors.background"),
          color: theme("colors.primary"),
        },

        h1: { fontSize: ["2.3125rem", "1.11"], fontWeight: "700" },
        h2: { fontSize: ["1.875rem", "1.2"], fontWeight: "700" },
        h3: { fontSize: ["1.5rem", "1.33"] },
        h4: { fontSize: ["1.25rem", "1.6"] },
        h5: { fontSize: ["1rem", "1.5"] },
      });
    }),
  ],
};
