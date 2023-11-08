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
  button: {
    cursor: "pointer",
    padding: "16px 24px",
    borderRadius: "8px",
    border: "none",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
  },
  input: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
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
