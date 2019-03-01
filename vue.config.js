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

  // pages: {
  //   // index: {
  //   //   // page 的入口
  //   //   entry: 'src/main.ts',
  //   //   // 模板来源
  //   //   template: 'public/index.html',
  //   //   // 在 dist/index.html 的输出
  //   //   filename: 'index.html'
  //   //   // 当使用 title 选项时，
  //   //   // 在这个页面中包含的块，默认情况下会包含
  //   //   // 提取出来的通用 chunk 和 vendor chunk。
  //   //   // chunks: ['chunk-vendors', 'chunk-common', 'index']
  //   // },
  //   // mobile: {
  //   //   entry: 'src/mobile.ts',
  //   //   template: 'public/mobile.html',
  //   //   filename: 'mobile.html',
  //   //   // 当使用 title 选项时，
  //   //   title: 'mobile'
  //   //   // chunks: ['chunk-vendors', 'chunk-common', 'index']
  //   // }
  // },

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
        '@': resolve('src')
      }
    }
  }
}
