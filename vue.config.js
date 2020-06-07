module.exports = {
  publicPath: '/',
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
  css: {
    requireModuleExtension: false,
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/app.scss";
        `,
      },
    },
  },
};