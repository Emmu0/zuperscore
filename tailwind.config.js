module.exports = {
  content: [
    "./pages/**/*.{tsx,jsx}",
    "./components/**/*.{jsx,tsx}",
    "./layouts/**/*.tsx",
    "./ui/**/*.tsx",
  ],
  plugins: [require("@tailwindcss/line-clamp")],
  theme: {
    extend: {
      colors: {
        violet: {
          0: "#CC96AE", // primary text color on primary color
          100: "#721154", // primary background color
        },
        yellow: {
          0: "#F3E4B1", // primary text color
          100: "#FAEDC4", // primary background color
          200: "#FAEDC4E5",
        },
        border: {
          light: "#E2E2E2", // primary border color for light backgrounds
          dark: "#8F939B", // primary border color for dark backgrounds
        },
        table: {
          light: "#E2E2E2", //primary color for table light backgrounds
          dark: "#FFFFFF", //primary color for table dark backgrounds
        },
        light: {
          0: "#FBFBFD",
          100: "#F6F6F6",
          200: "#FFFFFF",
          300: "#FCFCFC",
        },
        dark: {
          0: "#8F939B",
          100: "#878787",
          200: "#080708",
          300: "#8A8A8A",
          400: "#303030",
          500: "#000000",
        },
        lightpurple: "#F4ECF1",
        maroon: "#721154",
        cream: "#F0E5C3",
        goldenyellow: "#E8CE79",
        textslate: "#080708",
        backgray: "#E5E5E5",
      },
      backgroundImage: {
        signin:
          "url('/images/Signin.png'),linear-gradient(156.35deg, #721154 6.42%, #3C003E 107.02%);",
        signup:
          "url('/images/Signup.png'),linear-gradient(156.35deg, #721154 6.42%, #3C003E 107.02%);",
      },
      keyframes: {
        leftToaster: {
          "0%": { left: "-20rem" },
          "100%": { left: "0" },
        },
        rightToaster: {
          "0%": { right: "-20rem" },
          "100%": { right: "0" },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
};
