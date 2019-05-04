const CONFIG = require('./private-config.js')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  baseUrl: CONFIG.publicPath,
  devServer: CONFIG.dev.target
    ? {
      port: CONFIG.dev.port,
      proxy: {
        '/': {
          target: CONFIG.dev.target,
          // ws: true,
          changeOrigin: true
        }
      }
    }
    : {},

  productionSourceMap: false,
  filenameHashing: false,

  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/base.scss";`
      }
    },
    extract: false
  },

  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@utils': resolve('src/utils'),
        '@config': resolve('src/config'),
        '@static': resolve('src/static'),
        '@mixins': resolve('src/mixins'),
        '@api': resolve('src/api'),
        '@module': resolve('src/module'),
        '@components': resolve('src/components'),
        '@assets': resolve('src/assets'),
        '@store': resolve('src/store'),
        '@packages': resolve('packages'),
        '@': resolve('src')
      }
    }
  }
}
