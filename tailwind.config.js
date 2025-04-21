import { heroui } from "@heroui/react";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Quicksand", "sans-serif"],
        display: ["Dancing Script", "cursive"],
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
            focus: "#FF2E93",
            content1: {
              DEFAULT: "#FFFFFF",
              foreground: "#4B3F3F",
            },
            content2: {
              DEFAULT: "#FFF0F3",
              foreground: "#4B3F3F",
            },
            primary: {
              50: "#FFF0F7",
              100: "#FFE4F0",
              200: "#FFD4E8",
              300: "#FFC4E0",
              400: "#FFB4D8",
              500: "#FF2E93",
              600: "#FF0082",
              700: "#E6007A",
              800: "#CC006D",
              900: "#B30061",
              DEFAULT: "#FF2E93",
              foreground: "#FFFFFF",
            },
          },
        },
      },
    }),
  ],
};
