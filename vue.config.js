const CONFIG = require('./private-config.js')
const path = require('path')
const components = require('./components.json')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const isPro = process.env.NODE_ENV === 'production'
console.log(isPro)

function resolve(dir) {
  return path.join(__dirname, dir)
}

const entrys = Object.keys(components).reduce((acc, item) => {
  acc[item] = components[item]
  return acc
}, {})

module.exports = {
  baseUrl: CONFIG.publicPath,
  devServer: CONFIG.dev.target
    ? {
      port: CONFIG.dev.port,
      proxy: {
        '/api': {
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

  outputDir: resolve('./lib'),

  chainWebpack: config => {
    if (!isPro) return false
    config.plugins
      .delete('html')
      .delete('preload')
      .delete('prefetch')
      .delete('copy')
      .delete('hmr')
      .end()
    config.optimization.minimize(true).end()
    config.optimization.splitChunks(false)
  },

  configureWebpack: function(config) {
    config.resolve = {
      ...config.resolve,
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
    if (!isPro) return false
    config.entry = entrys
    config.output = {
      ...config.output,
      filename: '[name].js',
      // libraryExport: 'default',
      library: 'EasyOperationComponent',
      libraryTarget: 'commonjs2'
    }
    config.externals = {
      vue: {
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue',
        root: 'Vue'
      },
      'element-ui': {
        commonjs: 'element-ui',
        commonjs2: 'element-ui',
        amd: 'element-ui',
        root: 'ELEMENT'
      }
    }
  }
}
