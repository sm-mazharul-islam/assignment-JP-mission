import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // Customized daisyUI themes
  daisyui: {
    themes: [
      {
        weddingtheme: {
          primary: "#0FCFEC",
          secondary: "#19D3AE",
          accent: "#37CDBE",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
        },
      },
    ],
  },

  theme: {
    extend: {
      // Ticker Animation
      animation: {
        "smooth-scroll": "infinite-scroll 25s linear infinite",
      },
      // Ticker Keyframes
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },

  plugins: [daisyui],
};

// plugins: [require("daisyui")]
