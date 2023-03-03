/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      neutral: {
        100: "#f8f8f8",
        200: "#f0f0f0",
        300: "#e8e8e8",
        400: "#d8d8d8",
        500: "#cccccc",
        600: "#999999",
        700: "#666666",
      },
      shades: {
        black: "#333333",
        white: "#ffffff",
      },
      accent: {
        a: {
          100: "#e8a973",
          200: "#df8e4e",
        },
        b: {
          100: "#edf7f7",
          200: "#77d5d3",
        },
        c: {
          100: "#f8f8f8",
        },
      },

      success: {
        100: "#dcefe2",
        200: "#64b980",
      },
      error: {
        100: "#c55757",
      },
    },
    fontSize:{
      normal:'32px'
    },
    extend: {
      boxShadow: {
        small: "0px 0px 88px -24px rgba(0, 0, 0, 0.08)",
        medium: "0px 8px 24px rgba(0, 0, 0, 0.04)",
        large: "0px 0px 64px -24px rgba(0, 0, 0, 0.16)",
      },
      fontFamily: {
        sans: ['var(--font-primary)'],
      },
    },
  },
  plugins: [],
}
