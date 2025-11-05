// config-overrides.js
module.exports = function override(config) {
  const sourceMapRule = config.module.rules
    .find((rule) => Array.isArray(rule.oneOf))
    ?.oneOf.find((r) =>
      r.use?.some((u) => u.loader?.includes("source-map-loader"))
    );

  if (sourceMapRule) {
    sourceMapRule.exclude = [
      /node_modules\/@mediapipe\/tasks-vision/,
      /node_modules/,
    ];
  }

  return config;
};
