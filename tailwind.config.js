module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      worksans: ["Work Sans", "ui-sans-serif", "system-ui"],
      sans: ["Roboto", "ui-sans-serif", "system-ui"],
    },
    boxShadow: {
      locationBubble: "0px 10px 32px rgba(23, 23, 23, 0.15);",
      locationBubbleHover: "0px 10px 32px rgba(23, 23, 23, 0.05);",
      modal: "0px 16.4076px 48.6723px rgba(23, 23, 23, 0.15);",
    },
    extend: {
      colors: {
        beige: {
          // light: "#85d7ff",
          DEFAULT: "#F7F4EA",
          dark: "#A8A696",
        },
        gray: {
          10: "#FAFAFA",
          100: "#EBEBEB",
          200: "#CBCBCB",
          300: "#B9B9B9",
          500: "#7C7C7C",
          800: "#393939",
          900: "#171717",
        },
        red: {
          100: "#F8E5E2",
          500: "#DB4437",
          600: "#C53930",
        },
        nature: {
          DEFAULT: "#61E786",
        },
      },
      spacing: {
        1.5: "0.375rem",
        2.5: "0.625rem",
        15: "3.75rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        fade: {
          "0%, 100%": {
            opacity: 0.35,
            // transform: "rotate(-2deg)"
          },
          "25%, 75%": { opacity: 1 },
          // "12.5%": {
          //   transform: "rotate(2deg)",
          // },
          // "25%": {
          //   transform: "rotate(-2deg)",
          // },
          // "37.5%": {
          //   transform: "rotate(2deg)",
          // },
          // "50%": {
          //   transform: "rotate(-2deg)",
          // },
          // "62.5%": {
          //   transform: "rotate(2deg)",
          // },
          // "75%": {
          //   transform: "rotate(-2deg)",
          // },
          // "87.5%": {
          //   transform: "rotate(2deg)",
          // },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        fade: "fade 3s ease-in-out infinite",
      },
      transitionProperty: {
        blur: "backdrop-filter",
      },
    },
  },
  variants: {
    outline: ["focus"],
  },
  plugins: [require("@tailwindcss/forms")],
};
