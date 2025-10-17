// config-overrides.js
const { override, addWebpackModuleRule } = require("customize-cra");

module.exports = override(
  addWebpackModuleRule({
    test: /\.mjs$/, // ⬅️ тільки .mjs, не .js
    enforce: "pre",
    use: ["source-map-loader"],
    exclude: [/node_modules\/@mediapipe\/tasks-vision/],
  })
);
