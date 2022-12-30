/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: ["Inter"],
        body: ["Poppins"],
      },

      colors: {
        primary: {
          100: "#015398",
          200: "rgba(1, 83, 152, 0.1)",
          300: "rgba(1, 83, 152, 0.2)",
        },
        secondary: {
          100: "#A098AE",
          200: "#DDE2FF",
          300: "rgba(159, 162, 180, 0.1)",
        },
        tertairy: {
          100: "#F5F6FF",
        },
        info: {
          100: "#009F40",
          200: "#FB7D5B",
          300: "#4D44B5",
          400: "#303972",
          500: "#FCC43E",
          600: "#BC2626",
        },
      },
      backgroundImage: {
        "school-logo": "url('/public/img/school-logo.jpg')",
        "lagos-logo": "url('/public/img/lagos-logo.png')",
        portal: "url('/public/img/portal.png')",
      },
      boxShadow: {
        "black-1xl": "0px 4px 9px rgba(0, 0, 0, 0.1)",
        "blue-1xl": "0px 8px 53px rgba(1, 83, 152, 0.25)",
      },
    },
  },
  plugins: [],
};
