import vue from "rollup-plugin-vue";

export default {
  input: "src/index.js",
  output: {
    format: "esm",
    file: "dist/index.js",
  },
  plugins: [vue()],
};
