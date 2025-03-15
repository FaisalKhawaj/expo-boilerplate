/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src//**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      fontSize: {
        dynamic: "1.5rem",
        "heading-1": ["32px", { lineHeight: "32px" }],
        "heading-2": ["24px", { lineHeight: "24px" }],
        "heading-3": ["20px", { lineHeight: "20px" }],
        "heading-4": ["18px", { lineHeight: "18px" }],
        "heading-5": ["16px", { lineHeight: "16px" }],
        "heading-6": ["14px", { lineHeight: "16px" }],
        "heading-7": ["12px", { lineHeight: "12px" }],

        "body-l": ["18px", { lineHeight: "24px" }],
        "body-m": ["16px", { lineHeight: "20px" }],
        "body-s": ["14px", { lineHeight: "18px" }],
        "body-xs": ["12px", { lineHeight: "12px" }],
        "body-2xs": ["11px", { lineHeight: "12px" }],
      },
      screens: {
        xs: "375px", // Small devices (iPhone SE)
        sm: "640px", // Tablets
        md: "768px", // Medium devices (iPad)
        lg: "1024px", // Large devices
        xl: "1280px", // Extra large devices
      },
      colors: {
        primary: {
          25: "#D5F1F6",
          50: "#EFEEFB",
          100: "#CCC9F2",
          200: "#B4AFEC",
          300: "#928AE4",
          400: "#7D73DE",
          500: "#5C50D6",
          600: "#5449C3",
          700: "#413998",
        },
        secondary: {},
        background: {
          screen: "#fff",
          darkScreen: "#121212",
          card: "#fafa",
        },
        error: {},
        lines: {
          iconLine: "#F9F9F9",
          inputLine: "#e0e0e0",
        },
        texts: {
          descripton: "#717273",
        },
        buttons: {
          primary: "#007AFF",
          secondary: "#007AFF",
        },
      },
    },
  },
  plugins: [],
};
