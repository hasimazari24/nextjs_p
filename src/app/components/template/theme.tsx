// theme.js atau theme.ts

import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  fontSizes: {
    xs: "0.85rem", // Ganti dengan ukuran font yang Anda inginkan
    sm: "0.9375rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "4rem",
  },
  styles: {
    global: {
      "html, body": {
        fontSize: "15px", // Atur ukuran font default di sini
        fontFamily: "sans-serif", // Atur font default di sini
      },
      ".tox.tox-tinymce-aux": {
        zIndex: 1401,
        position: "fixed !important",
      },
      "ol, ul": {
        pl: "40px", // padding-inline-start
        mt: "1em", // margin-block-start
        mb: "1em", // margin-block-end
        ml: "0", // margin-inline-start
        mr: "0", // margin-inline-end
      },
      ".chakra-breadcrumb__list": {
        pl: "0", // padding-inline-start
        width : "fit-content",
      },
      // ".tox .tox-tbtn .tox-icon svg": {
      //   height: "20px",
      //   width: "20px",
      //   ViewBox : "0 0 28 28",
      //   // viewBox: "0 0 28 28",
      // },
      // ".react-datepicker": {
      //   zIndex: 1402,
      //   fontFamily: "unset",
      //   fontSize: "15px",
      // },
      // ".react-datepicker__input-container": {
      //   fontSize: "15px",
      // },
    },
  },

  "bg-image-wrap": {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
  },
  colors: {
    "--color-transparent-white": "rgba(255, 0, 0, 0.5)",
    teal: {
      50: "#E6FFFA",
      100: "#B2F5EA",
      200: "#81E6D9",
      300: "#4FD1C5",
      400: "#38B2AC",
      500: "#319795",
      600: "#2C7A7B",
    },
    grey: {
      50: "#F7FAFC",
      100: "#EDF2F7",
      200: "#E2E8F0",
      300: "#CBD5E0",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568",
    },
    orange: {
      50: "#FFFAF0",
      100: "#FEEBC8",
      200: "#FBD38D",
      300: "#F6AD55",
      400: "#ED8936",
      500: "#DD6B20",
      600: "#C05621",
    },
    blue: {
      50: "#EBF8FF",
      100: "#BEE3F8",
      200: "#90CDF4",
      300: "#63B3ED",
      400: "#4299E1",
      500: "#3182CE",
      600: "#2B6CB0",
    },
    red: {
      50: "#FFF5F5",
      100: "#FED7D7",
      200: "#FEB2B2",
      300: "#FC8181",
      400: "#F56565",
      500: "#E53E3E",
      600: "#C53030",
    },
    cyan: {
      50: "#EDFDFD",
      100: "#C4F1F9",
      200: "#9DECF9",
      300: "#76E4F7",
      400: "#0BC5EA",
      500: "#00B5D8",
      600: "#00A3C4",
    },
  },
});

export default customTheme;
