import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
        display: ['Dancing Script', 'cursive'],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#FFF8F8",
            foreground: "#4B3F3F",
            focus: "#FF8FAB",
            content1: {
              DEFAULT: "#FFFFFF",
              foreground: "#4B3F3F"
            },
            content2: {
              DEFAULT: "#FFF0F3",
              foreground: "#4B3F3F"
            },
            primary: {
              50: "#FFF0F3",
              100: "#FFE4EA",
              200: "#FFD4DE",
              300: "#FFC4D3",
              400: "#FFB4C8",
              500: "#FF8FAB",
              600: "#FF7A9B",
              700: "#FF658B",
              800: "#FF507B",
              900: "#FF3B6B",
              DEFAULT: "#FF8FAB",
              foreground: "#FFFFFF"
            }
          }
        }
      }
    })
  ],
};
