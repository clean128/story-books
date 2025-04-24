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
            background: "#F0F9FF", // Brighter blue-tinted background
            foreground: "#1E3A8A", // Deeper blue for text
            focus: "#06B6D4", // Bright cyan for focus
            content1: {
              DEFAULT: "#FFFFFF",
              foreground: "#1E3A8A",
            },
            content2: {
              DEFAULT: "#E0F2FE", // Light blue
              foreground: "#1E3A8A",
            },
            primary: {
              50: "#F0F9FF",
              100: "#E0F2FE",
              200: "#BAE6FD",
              300: "#7DD3FC",
              400: "#38BDF8",
              500: "#0EA5E9", // Bright sky blue as primary
              600: "#0284C7",
              700: "#0369A1",
              800: "#075985",
              900: "#0C4A6E",
              DEFAULT: "#0EA5E9",
              foreground: "#FFFFFF",
            },
            error: "#EF4444", // Brighter red
            success: "#10B981", // Brighter green
          },
        },
      },
    }),
  ],
};
