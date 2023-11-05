import { defineConfig, defineGlobalStyles } from "@pandacss/dev";

const globalCss = defineGlobalStyles({
  // Global styles go here
  "*": {
    boxSizing: "border-box",
  },
  html: {
    height: "100%",
  },
  body: {
    margin: 0,
    padding: 0,
    width: "100vw",
    height: "100%",
  },
});

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./app/**/*.{js,jsx,ts,tsx}", "./modules/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Global styles
  globalCss,

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // The output directory for your css system
  outdir: "styled-system",
});
