/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // costomized themes
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
  //
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
