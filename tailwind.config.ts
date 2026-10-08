import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        sm: "0.618rem",
        base: "1rem",
        xl: "1.618rem",
        "2xl": "2.618rem",
        "3xl": "4.236rem",
        "4xl": "6.854rem",
        "5xl": "11.090rem",
      },
      fontFamily: {
        heading: ["PP Neue Montreal", "sans-serif"],
        body: ["PP Neue Montreal Text", "sans-serif"],
      },
      fontWeight: {
        normal: "400",
        bold: "700",
      },
    },
  },
  plugins: [],
} satisfies Config;
