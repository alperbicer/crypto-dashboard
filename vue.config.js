const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const AnalyzerMode = function () {
  return process.env.NODE_ENV === 'production' ? 'static' : 'disabled';
};
module.exports = {
  publicPath: '/',
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin(Object.assign({
        defaultSizes: 'gzip',
        generateStatsFile: true,
        analyzerMode: AnalyzerMode(),
        reportFilename: './reports-index.html',
        statsFilename: './reports-index.json',
      })),
    ],
  },
  pwa: {
    'name': 'crypto-map-dashboard',
    'short_name': 'crypto-map-dashboard',
    'icons': [
      {
        'src': 'img/icons/android-chrome-192x192.png',
        'sizes': '192x192',
        'type': 'image/png',
      },
      {
        'src': 'img/icons/android-chrome-512x512.png',
        'sizes': '512x512',
        'type': 'image/png',
      },
    ],
    'display': 'standalone',
    'scope': '/',
    'start_url': '/',
    'background_color': '#000000',
    'theme_color': '#4DBA87',
  },
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
  },
};