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
      backgroundImage: {
        "hero-pattern": "url('/hero.jpg')",
        // Custom gradients
        "gradient-pink": "linear-gradient(135deg, #FF2E93 0%, #FF85C2 100%)",
        "gradient-teal": "linear-gradient(135deg, #06B6D4 0%, #67E8F9 100%)",
        "gradient-purple": "linear-gradient(135deg, #A855F7 0%, #D8B4FE 100%)",
        "gradient-mixed": "linear-gradient(135deg, #FF2E93 0%, #06B6D4 100%)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            // Background with subtle gradient hint
            background: "#FFF0F7",
            foreground: "#4B3F3F",
            focus: "#FF2E93",

            // Content areas with updated colors
            content1: {
              DEFAULT: "#FFFFFF", // Keep white for main content
              foreground: "#4B3F3F",
              // Add a border color for content1
              border: "#FFE4F0",
            },
            content2: {
              DEFAULT: "#FFF0F3", // Slight pink tint for secondary content
              foreground: "#4B3F3F",
              // Add a border color for content2
              border: "#FFD4E8",
            },
            content3: {
              DEFAULT: "#F0FBFF", // Light cyan/blue tint for tertiary content
              foreground: "#4B3F3F",
              border: "#A5F3FC",
            },
            content4: {
              DEFAULT: "#F8F0FF", // Light purple tint for quaternary content
              foreground: "#4B3F3F",
              border: "#E9D5FF",
            },

            // Dialog specific colors
            dialog: {
              DEFAULT: "#FFFFFF",
              foreground: "#4B3F3F",
              border: "#FFD4E8",
            },

            // Original pink primary colors
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

            // Secondary teal colors
            secondary: {
              50: "#ECFEFF",
              100: "#CFFAFE",
              200: "#A5F3FC",
              300: "#67E8F9",
              400: "#22D3EE",
              500: "#06B6D4",
              600: "#0891B2",
              700: "#0E7490",
              800: "#155E75",
              900: "#164E63",
              DEFAULT: "#06B6D4",
              foreground: "#FFFFFF",
            },

            // Accent purple colors
            accent: {
              50: "#FAF5FF",
              100: "#F3E8FF",
              200: "#E9D5FF",
              300: "#D8B4FE",
              400: "#C084FC",
              500: "#A855F7",
              600: "#9333EA",
              700: "#7E22CE",
              800: "#6B21A8",
              900: "#581C87",
              DEFAULT: "#A855F7",
              foreground: "#FFFFFF",
            },

            // Brightened error and success
            error: "#EF4444",
            success: "#10B981",

            // Warning color
            warning: {
              50: "#FFFBEB",
              100: "#FEF3C7",
              200: "#FDE68A",
              300: "#FCD34D",
              400: "#FBBF24",
              500: "#F59E0B",
              600: "#D97706",
              700: "#B45309",
              800: "#92400E",
              900: "#78350F",
              DEFAULT: "#F59E0B",
              foreground: "#FFFFFF",
            },

            // Info color
            info: {
              50: "#EFF6FF",
              100: "#DBEAFE",
              200: "#BFDBFE",
              300: "#93C5FD",
              400: "#60A5FA",
              500: "#3B82F6",
              600: "#2563EB",
              700: "#1D4ED8",
              800: "#1E40AF",
              900: "#1E3A8A",
              DEFAULT: "#3B82F6",
              foreground: "#FFFFFF",
            },
          },
        },
      },
    }),
  ],
};
