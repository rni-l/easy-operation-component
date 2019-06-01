// import '@babel/polyfill'
import './styles/theme.scss'
import './styles/reset.scss'
import './styles/common.scss'
// import './assets/iconfont/iconfont.css'
// import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import App from './App.vue'
import WrapDemo from '@/components/demo/Wrap.vue'
import Eventbus from './utils/observer'
import store from './store'
import router from './router'
import '@utils/install'
import elementUi from 'element-ui'
import { setStaticConfig } from '@/config'
import initAuth from './router/auth'

// const oPrivate = require('../private-config.js')
const isPro = process.env.NODE_ENV === 'production'

setStaticConfig({
  dev: {
    port: 1234, // 开发模式端口号
    target: 'http://localhost:9098', // 开发模式 api 转发地址
    notValidated: true
  },
  publicPath: '', // api 前缀
  showConsoleLog: false, // 是否显示前端日志
  productionSourceMap: false // 上线版本是否启用 sourcemap
})

Vue.config.productionTip = isPro
Vue.prototype.$observer = Eventbus
Vue.component('WrapDemo', WrapDemo)
Vue.use(elementUi)

const render = (dom: string) => {
  // /* eslint disable no-new */
  initAuth()
  new Vue({
    store,
    router,
    render: (h: any) => h(App)
  }).$mount(dom)
}

render('#app')
