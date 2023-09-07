const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)", ...fontFamily.sans],
      },
      keyframes: {
        "skeleton-loading": {
          "0%": { backgroundPosition: "-100% 0" },
          "100%": { backgroundPosition: "100% 0" },
        },
        "fully-button": {
          "0%": {
            backgroundColor: "red",
          },
          "100%": {
            backgroundColor: "black",
          },
        },
      },
      animation: {
        "skeleton-loading": "skeleton-loading 1s infinite reverse",
      },
    },
    screens: {
      movile: {
        min: "360px",
        // max: "767px",
      },

      tablet: {
        min: "768px",
        // max: "1023px",
      },

      laptop: {
        min: "1024px",
        // max: "1279px",
      },

      desktop: "1280px",
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar"), require('@tailwindcss/typography'),],
  variants: {
    scrollbar: ["rounded"],
  },
};
