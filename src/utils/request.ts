import axios, { AxiosResponse, AxiosError } from 'axios'
// import qs from 'qs'
// import NProgress from 'nprogress'
// import store from '@/store'
import { config } from '@/config'
// import { Toast } from 'vant'

// axios 默认配置
axios.defaults.timeout = 150000
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8'

// 请求时的拦截器
axios.interceptors.request.use(
  config => {
    // 这里可以加一些动作, 比如来个进度条开始动作
    // NProgress.start()
    // 打印信息
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV_PRIVATE_STATE === 'debug') {
      const { url, params, data } = config
      console.group(`%c request ${url}`, 'color: #1890ff')
      console.log('params:', params)
      console.log('formData:', data)
      console.groupEnd()
    }
    return config
  },
  error => {
    console.error('请求出错：', error)
    console.dir(error)
    return Promise.reject(error)
  }
)

// 请求完成后的拦截器
axios.interceptors.response.use(
  response => response,
  error => {
    // 这里我们把错误信息捕捉, 后面就不需要写 catch 了
    console.error('请求响应出错：', error)
    console.dir(error)
    return Promise.resolve(error.response || error)
  }
)

/**
 * 根据请求返回的 response，判断是否出错了，如果返回的不是 Object 类型的就进行处理
 * @param {*} response 请求返回的 response 或者 Error
 */
function handleResponseError(response: AxiosResponse): Boolean
function handleResponseError(response: AxiosError): global.responseData
function handleResponseError(response: any): any {
  const paramType: String = Object.prototype.toString.call(response)
  // 返回的数据不是返回 object 类型的
  if (paramType !== '[object Object]') {
    let code: Number = 50000
    let data: String | AxiosError = '系统错误'
    if (paramType === '[object String]') {
      code = 50001
      data = response
    } else if (paramType === '[object Error]') {
      if (response.code === 'ECONNABORTED') {
        code = 50003
        data = '连接超时'
      } else {
        code = 50002
        data = response.message
      }
    }
    return { code, data }
  }
  return false
}

/**
 * 处理请求返回的 response，然后返回一个固定的数据结构
 * @param {*} response 请求返回的 response 或者 Error
 * @return {Object} {}
 * @return {Number} code 状态码
 * @return {Object | String} 返回 Object 通常代表成功，返回了一段数据；返回 String 通常代表错误信息；
 */
function checkStatus(reponse: AxiosResponse): global.responseData
function checkStatus(reponse: AxiosError): global.responseData
function checkStatus(response: any): any {
  // NProgress.done()
  const errorData = handleResponseError(response)
  if (errorData) return errorData
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV_PRIVATE_STATE === 'debug') {
    console.group(`%c response ${response.config.url}`, 'color: #52c41a')
    console.log(response.data)
    console.groupEnd()
  }
  const { status, data, statusText } = response
  // 如果 http 状态码正常, 则直接返回数据
  if (status === 200 || status === 304) {
    if (data.code === 200) {
      return {
        ...data,
        code: 200,
        data: data.data
      }
    }
    return {
      code: data.code,
      data: data.data
    }
  }
  // 异常状态下, 把错误信息返回去
  return {
    code: status,
    data: statusText
  }
}

// 处理来自后端的错误
function checkCode(res: global.responseData, type: String) {
  console.log(res)
  if (type !== 'noProcssing') {
    // 需要处理
    if (res.code === 555) {
      // store.commit('updateLogin', false)
    } else if (res.code !== 200) {
      // 默认 toast 显示错误信息
      const err = `${res.data}. `
      console.log(err)
      if (type === 'MessageBox') {
      } else {
        // Toast(err)
      }
    }
  }
  return res
}

/**
 * 封装好的 post 和 get 方法
 * @param {Object} opts  -- 配置参数
 * @param {String} opts.url -- 请求路径
 * @param {String} opts.errType -- 处理错误方式
 * @param {Object} data  -- 请求所带的参数
 * @return {Promise} -- 返回一个 promose 对象
 */

export default {
  post(url: String, params: Object, opts: utils.requestHanldeType = { errType: '' }) {
    return axios({
      method: 'post',
      url: config.serverURI + url,
      data: params,
      headers: {
        // Token: ”’
      }
    })
      .then(checkStatus)
      .then((res: global.responseData) => {
        return checkCode(res, opts.errType)
      })
  },
  put(url: String, params: Object, opts: utils.requestHanldeType = { errType: '' }) {
    return axios({
      method: 'put',
      url: config.serverURI + url,
      data: params,
      headers: {
        // Token: ”’
      }
    })
      .then(checkStatus)
      .then((res: global.responseData) => {
        return checkCode(res, opts.errType)
      })
  },
  delete(url: String, params: Object, opts: utils.requestHanldeType = { errType: '' }) {
    return axios({
      method: 'delete',
      url: config.serverURI + url,
      data: params,
      headers: {
        // Token: ”’
      }
    })
      .then(checkStatus)
      .then((res: global.responseData) => {
        return checkCode(res, opts.errType)
      })
  },
  get(url: String, params: Object, opts: utils.requestHanldeType = { errType: '' }) {
    return axios({
      method: 'get',
      url: config.serverURI + url,
      params,
      headers: {
        // Token: ”’
      }
    })
      .then(checkStatus)
      .then((res: global.responseData) => {
        return checkCode(res, opts.errType)
      })
  }
}
