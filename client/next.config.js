const path = require("path");

module.exports = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  webpack(config) {
    config.resolve.alias["@"] = path.join(__dirname, "src");
    return config;
  },
};
