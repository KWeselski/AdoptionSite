import { hero } from "./src/assets";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "hero-image": `url('../src/assets/hero.jpg')`,
        "hero-adoption": `url('../src/assets/hero_1.png')`,
      }),
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease-out",
      },
      keyframes: {
        "fade-in-up": {
          "0%": {
            opacity: 0,
            transform: "translateY(1rem)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [],
};
