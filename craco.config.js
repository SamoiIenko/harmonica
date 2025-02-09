/* craco.config.js */
const path = require(`path`);

module.exports = {
  webpack: {
    // eslint-disable-next-line no-unused-vars
    configure: (webpackConfig, { env }) => {
      if (env === "development") {
        // Adjust webpack settings for "dev build"
        webpackConfig.devtool = "source-map";

        // Potentially remove minifiers or other dev-friendly tweaks
      }

      return webpackConfig;
    },
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@app": path.resolve(__dirname, "src/app"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@widgets": path.resolve(__dirname, "src/widgets"),
      "@features": path.resolve(__dirname, "src/features"),
      "@entities": path.resolve(__dirname, "src/entities"),
      "@shared": path.resolve(__dirname, "src/shared"),
    },
  },
};
