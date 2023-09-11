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
    },
  },
  colors: {
    teal: {
      50: "#E6FFFA",
      100: "#B2F5EA",
      200: "#81E6D9",
      300: "#4FD1C5",
    },
    blue: {
      50: "#EBF8FF",
      100: "#BEE3F8",
      200: "#90CDF4",
      300: "#63B3ED",
    },
    brand: {
      500: "#4FD1C5",
    },
    catalog: {
      500: "#63B3ED",
    },
  },
});

export default customTheme;
