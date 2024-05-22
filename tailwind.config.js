/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        graphik: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "blockchain-bg": "url('/public/assets/images/dashboardBackground.svg')",
        "error-bg": "url('/public/assets/images/mainBackgound.svg')",
        floorPlanBg:
          "url('/src/Components/dashboard/Dashboard_New/DashboardBottomLinkedPages/FreeFloorPlanPage/assets/img-banner-1-1.png')",
      },
      signupbackground: {
        signupbg: "url('/public/assets/images/signupbackground.png')",
      },
      fontSize: {
        "heading-xs": "16px",
        "heading-sm": "25px",
        "heading-lg": "40px",
        "label-s": "13px",
        "label-xs": "13px",
        "label-sm": "17px",
        "label-md": "12px",
        "label-lg": "22px",
      },
    },
    colors: {
      white: "#fff",
      black: "#000",
      primary: {
        main: "#556cd6",
      },
      secondary: {
        main: "#19857b",
        purpleBlue: "#6720FF",
      },
      "dark-blue": "rgba(29, 6, 104, 1)",
      "light-pink": "rgb(172, 97, 215)",
      "light-blue": "#313770",
      grayish: "#e0e0e0cc",
    },

    screens: {
      xs: "0px",
      ss: "350px",
      sm: "600px",
      md: "900px",
      lg: "1200px",
      xl: "1536px",
      xxl: "2000px",
    },

    button: {
      base: {
        background: "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
        borderRadius: "24px",
        width: "100%",
        border: 0,
        padding: "10px",
        fontSize: "15px",
        fontWeight: "bold",
      },
      primary: {
        // You can define additional button styles here if needed
      },
      secondary: {
        // You can define additional button styles here if needed
      },
      // Add more button variants as needed
    },
  },
  corePlugins: { preflight: false },
};
