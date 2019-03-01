/**
 * @file 管理初始化和路由权限等逻辑
 * @author author-lujieqi(15625979610@163.com)
 */

import router from '@/router'
import store from '@/store'
import tools from '@/utils'
// import api from '@/api/api'
// import { Toast } from 'vant'
import { config as staticConfig } from '@/config'

let environment = '' // 判断当前是什么环境
// let authUrl = '' // 要去授权的 url
// let ifLogin = false // 是否已经登录
let init = true // 是否已经初始化
// let toast: any

/**
 * 不需要验证的路由，由路由 name 值组成
 * @const
 * @type {Array} errorRouters
 */
const errorRouters = ['sysError']
// const { origin } = window.location

// 判断用户环境
if (tools.checkWechat()) {
  // 授权
  environment = 'wechat'
  // authUrl = origin + '/wechat/xxx'
}

// 缓存当前环境状态
store.commit('updateEnvironment', environment)

/**
 * 判断当前 url 路径是否有 wechat，返回两个路径
 * @param {String} publicPath 域名后的路径
 * @return {Object} 返回一个对象
 * @return {String} Object.newHref 含有 wechat 路径的 url
 * @return {String} Object.href 当前路径的 url
 */
function getWechatUrl(publicPath: string): any {
  // 替换路由
  // 1. 自动添加问号(?)
  // 2. 自动把分隔符由#!变成#
  // 3. 分隔符后面，自动判断是否为斜杠(/)，没有则添加上
  const { href, protocol, host } = window.location
  let { search, hash } = window.location
  const pathname = `${publicPath ? publicPath + '/' : '/'}wechat/` // 解决支付路径问题添加的前缀，替换成你的
  search = search || '?'
  hash = hash || '#/'
  const newHref = `${protocol}//${host}${pathname}${search}${hash}`
  return {
    newHref,
    href
  }
}

/**
 * 兼容登录状态，授权流程是用于微信或支付宝
 * 如果要授权，会调用 window.location.href 跳去授权页面
 * 如果 checkLogin 报出非 200 code，会跳去指定的错误页面（未经过授权，不能出现在登录页面）
 */
async function checkLogin(): Promise<any> {
  // 检验登录状态
  // const { code, data } = await api.userCheckLogin()
  // if (code === 200) {
  //   ifLogin = data.hasLogin
  //   // 未登录 && 未授权 && 有授权链接
  //   if (!ifLogin && !data.hasOauth && authUrl) {
  //     window.location.href = authUrl
  //   } else {
  //     // 缓存用户登录状态
  //     store.commit('updateLogin', ifLogin)
  //   }
  //   return false
  // } else {
  //   // errcode !== 200 的情况，统一转到错误页面
  //   store.commit('updateRequestError', true)
  //   return true
  // }
  return ''
}

export default () => {
  // 导航钩子，每次路由变动生效前，都会检查登录状态
  router.beforeEach(async (to, from, next) => {
    const PATHNAME = to.name
    if (!PATHNAME) {
      throw new Error(`请配置 ${to.path} 路由的 name 属性`)
    }
    // toast = Toast.loading({
    //   mask: true,
    //   duration: 0,
    //   message: '加载中...'
    // })
    // notValidated 方便开发时，可定义是否要走验证流程
    if (!staticConfig.dev.notValidated) {
      // 如果不在微信或支付宝，弹窗提示
      if (!environment) {
        // 非微信页面，直接在这里结束，不走下面流程
        if (PATHNAME === 'wechatError') return next()
        return next({ name: 'wechatError', replace: true })
      } else if (environment === 'wechat') {
        // 微信环境，替换 url
        const { newHref, href } = getWechatUrl(staticConfig.publicPath)
        if (newHref !== href) return window.location.replace(newHref)
      }

      if (init) {
        // 存储第一次进来的位置
        if (!localStorage.firstPath) localStorage.firstPath = PATHNAME || ''
        init = false
        const isError = await checkLogin()
        if (isError) return next({ name: 'error', replace: true })
      }

      const loginStatus = store.state.user.isLogin
      // 未登录，请求报错（超时、404等），是错误路由
      if (!loginStatus && store.state.common.isRequestError && errorRouters.includes(PATHNAME)) {
        store.commit('updateRequestError', false)
        return next()
      }

      // 登录状态
      if (loginStatus) {
        // 如果存在缓存的路由信息，跳转到缓存路由页面
        let name = localStorage.firstToPath
        localStorage.firstToPath = ''
        if (errorRouters.includes(name)) name = 'home'
        // 如果 firstToPa 存在，且和 to.name 不同
        if (name && name !== PATHNAME) {
          return next({ name, replace: true })
        } else if (PATHNAME === 'login' || errorRouters.includes(PATHNAME)) {
          // 如果要去登录页或者错误页面，返回到 home
          return next({ name: 'home', replace: true })
        }
      } else {
        // 非登录状态，如果不是登录页面
        if (PATHNAME !== 'login') return next({ name: 'login', replace: true })
      }
    }
    console.log('next:', PATHNAME)
    document.title = to.meta.title
    next()
  })
  router.afterEach(() => {
    // toast.clear()
  })
}
