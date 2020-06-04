module.exports = {
  pwa: {
    name: 'crypto-map-dashboard',
    "short_name": "vue-crypto-dashboard",
    icons: [
      {
        src: "img/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "img/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    display: "standalone",
    scope: "/",
    "start_url": "/vue-crypto-dashboard",
    themeColor: '#4DBA87',
    "background_color": "#000000",
    msTileColor: 'purple',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'dev/sw.js',
    },
  },
}