/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#FFFFFF",
        ink: "#111111",
        mute: "#737373",
        accent: "#525252",
        line: "#E5E5E5",
        surface: "#F5F5F5",
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', '"Space Grotesk"', "system-ui", "sans-serif"],
        // Client-requested display face for the five headline wordmarks.
        aurix: ['"Aurix"', '"Space Grotesk Variable"', '"Space Grotesk"', "sans-serif"],
        text: ['"DM Sans Variable"', '"DM Sans"', "system-ui", "sans-serif"],
        // Client-requested system font for navigation, menu and the About prose.
        vcr: ['"VCR OSD Mono"', '"Courier New"', "monospace"],
      },
    },
  },
  plugins: [],
};
