import terser from "@rollup/plugin-terser";

export default {
  input: "main.js",
  output: {
    file: "./dist/main.js",
    format: "cjs",
  },
  plugins: [terser()],
};
