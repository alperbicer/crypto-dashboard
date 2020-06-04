const { GenerateSW } = require('workbox-webpack-plugin');
module.exports = {
  configureWebpack: {
    plugins: [new GenerateSW()],
  },
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
  },
};