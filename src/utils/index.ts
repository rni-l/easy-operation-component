import moment from 'moment'

// 辅助通用方法
// 检查支付宝环境
export const checkAlipay = (): Boolean => {
  const ua = window.navigator.userAgent
  return /AlipayDefined/.test(ua)
}
// 检查微信环境
export const checkWechat = (): Boolean => {
  const ua = window.navigator.userAgent
  return /MicroMessenger/.test(ua)
}
// 检查 ios 环境
export const checkIfIos = (): Boolean => {
  const ua = window.navigator.userAgent
  return /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(ua)
}
// 检查 android 环境
export const checkIfAndroid = (): Boolean => {
  const ua = window.navigator.userAgent
  return /Android/i.test(ua)
}

export const getPoint = (callback: Function, err: Function) => {
  navigator.geolocation.getCurrentPosition(
    (position: any) => {
      console.log('h5 获取地理:', position)
      const coords = position.coords
      // 拒绝
      if (coords.error === 11) {
        console.log('用户拒绝')
        err && err()
        return
      }
      // 转换成百度地图坐标
      const convertor = new window.BMap.Convertor()
      convertor.translate([new window.BMap.Point(coords.longitude, coords.latitude)], 1, 5, (data: any) => {
        console.log('转换后的数据:', data)
        if (data.status === 0) {
          callback && callback(data.points[0])
        } else {
          // ...
          console.log('转换失败：', data)
        }
      })
    },
    errData => {
      console.log('err 获取地理:', errData)
      err && err(errData)
    }
  )
}

interface LoadJS {
  obj: string
  url: string
}

/**
 * 动态加载 js 文件
 * @param {Object} opts 配置参数
 * @param {String} opts.obj 加载 js 文件后的 全局对象 必填
 * @param {String} opts.url 加载 js 的路径，必填
 * @return {Promise}
 */
export const loadJS = (opts: LoadJS) => {
  if (!opts.obj) throw new Error('请传入全局对象名')
  if (!opts.url) throw new Error('请传入js资源地址')
  if (window[opts.obj]) return new Promise(resolve => resolve())
  const oScript = document.createElement('script')
  oScript.src = opts.url
  document.body.appendChild(oScript)
  return new Promise(resolve => {
    oScript.onload = () => resolve()
  })
}

export const getRandom = (num: Number) => {
  const arr: Array<number | string> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'i', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'I', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  const len: number = arr.length
  let str = ''
  const $num = num || 16
  for (let i = 0; i < $num; i++) {
    str += arr[Math.floor(Math.random() * (len - 0 + 1) + 0)]
  }
  return str
}

interface HandleUploadFileResponse {
  success: boolean
  msg: string
}
/**
 * 限制图片上传
 * @param {File} file 文件对象
 * @param {number} size 文件大小，默认 2m
 * @param {string|Array} type 限制的文件类型
 * @returns boolean
 */
function handleUploadFile(file: any, size: number, type: string): HandleUploadFileResponse
function handleUploadFile(file: any, size: number, type: Array<string>): HandleUploadFileResponse
function handleUploadFile(file: any, size: number, type: any): any {
  let isOk = true
  let msg = ''
  if (file.size > (size || 1024 * 1024 * 2)) {
    isOk = false
    msg = '文件过大'
  }
  if (type) {
    const checkType = Object.prototype.toString.call(type)
    if (checkType === '[object String]' && file.type !== type) {
      isOk = false
    }
    if (checkType === '[object Array]') {
      isOk = !type.some((v: string) => v === type)
    }
    msg = '文件类型不符合'
  }
  return {
    success: isOk,
    msg
  }
}
export { handleUploadFile }

export const formatTime = (time: any, formatValue?: string): string => {
  if (!time) return ''
  if (isNaN(time)) return time
  let _time = parseInt(time, 10)
  if (!_time) return time
  // 小于 13 位，默认为秒，转换为分秒
  if (('' + _time).length < 13) _time *= 1000
  return time ? moment(_time).format(formatValue || 'YYYY-MM-DD hh:mm:ss') : ''
}

export const clearUserInfo = () => {
  sessionStorage.userInfo = ''
  sessionStorage.MID = ''
  sessionStorage.Token = ''
}

export const getUserInfo = () => {
  try {
    const tmp = sessionStorage.userInfo
    const mid = sessionStorage.MID
    const token = sessionStorage.Token
    if (!tmp || !mid || !token) {
      clearUserInfo()
      return {}
    }
    return {
      userInfo: JSON.parse(tmp),
      mid,
      token
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

interface GetDisTime {
  day: number | string
  hour: number | string
  min: number | string
  second: number | string
}
export const getDisTime = (disTime: number): GetDisTime => {
  const ONEDAY_TIME = 60 * 60 * 24
  const _disTime = disTime / 1000
  const day = Math.floor(_disTime / ONEDAY_TIME) || 0
  const dis_2 = Math.floor(_disTime % ONEDAY_TIME)
  const hour = Math.floor(dis_2 / 60 / 60) || 0
  const dis_3 = Math.floor(dis_2 % (60 * 60))
  const min = Math.floor(dis_3 / 60) || 0
  const second = dis_3 % 60
  return {
    day,
    hour,
    min,
    second
  }
}

interface ComputTime {
  second: number
  min: number
  hour: number
  day: number
}

interface ComputTimeOutput {
  second: number
  min: number
  hour: number
  day: number
  isEnd: boolean
}

export const computTime = ({ second, min, hour, day }: ComputTime): ComputTimeOutput => {
  let isEnd = false
  if (second - 1 < 0) {
    if (min - 1 < 0) {
      if (hour - 1 < 0) {
        if (day - 1 < 0) {
          isEnd = true
          // 不能领取
          console.log('结束')
        } else {
          day -= 1
          hour = 24
          second = 60
          min = 60
        }
      } else {
        hour -= 1
        second = 60
        min = 60
      }
    } else {
      min -= 1
      second = 60
    }
  } else {
    second -= 1
  }
  return {
    second,
    min,
    hour,
    day,
    isEnd
  }
}

// 格式化金额，变位万
export const formatPrice = (value: any, isFormatToTxt?: string) => {
  if (isNaN(value)) return value
  let price: number = parseFloat(value)
  if (value < 9999) {
    return '' + price + (isFormatToTxt ? '元' : 0)
  }
  // 大于等于 1万
  // 保留千位数
  let dotPoint = Math.floor(Math.round((price % 10000) / 1000)) / 10
  if (dotPoint < 0.1) dotPoint = 0
  price = Math.floor(price / 10000) + dotPoint
  return '' + price + (isFormatToTxt ? '万' : 0)
}

/**
 * 格式化数字，每隔 3 位添加 ,
 */
export const formatNumber = (value: any): string => {
  if (!value) return value
  const _value: string = '' + value
  return _value.split('').reduce((accumular, curValue, curIndex, arr) => {
    let value = accumular || ''
    if ((curIndex + 1) % 3 === 0 && curIndex !== 0 && curIndex !== arr.length - 1) {
      value += ','
    }
    value += curValue
    return value
  }, '')
}

/**
 * base64 -> file 对象
 */
export const convertBase64UrlToBlob = (urlData: string) => {
  /* eslint-disable */
  var format = 'image/jpeg'
  var code = window.atob(urlData.split(',')[1])
  var aBuffer = new window.ArrayBuffer(code.length)
  var uBuffer = new window.Uint8Array(aBuffer)
  for (var i = 0; i < code.length; i++) {
    uBuffer[i] = code.charCodeAt(i)
  }
  var Builder = window.WebKitBlobBuilder || window.MozBlobBuilder
  if (Builder) {
    var builder = new Builder()
    builder.append(uBuffer)
    return builder.getBlob(format)
  } else {
    return new window.Blob([uBuffer], { type: format })
  }
}

export const changeFileToUrl = (file: any) => {
  return new Promise(resolve => {
    const reader: FileReader = new FileReader()
    reader.onload = () => {
      resolve({ result: reader.result })
    }
    reader.readAsDataURL(file)
  })
}

export const checkID = (id: string, backInfo: any) => {
  var info = {
    y: '1900',
    m: '01',
    d: '01',
    sex: 'male',
    valid: false,
    length: 0
  }
  var initDate = function(length: number) {
    info.length = length
    var a: number = length === 15 ? 0 : 2 // 15:18
    var temp
    info.y = (a ? '' : '19') + id.substring(6, 8 + a)
    info.m = id.substring(8 + a, 10 + a)
    info.d = id.substring(10 + a, 12 + a)
    info.sex = parseInt(id.substring(14, 15 + a), 10) % 2 === 0 ? 'female' : 'male'
    const _y = parseInt(info.y, 10)
    const _m = parseInt(info.m, 10)
    const _d = parseInt(info.d, 10)
    temp = new Date(_y, _m - 1, _d)
    return temp.getFullYear() === _y * 1 && temp.getMonth() + 1 === _m * 1 && temp.getDate() === _d * 1
  }
  var back = function() {
    return backInfo ? info : info.valid
  }
  if (typeof id !== 'string') return back()

  if (/^\d{17}[0-9x]$/i.test(id)) {
    // 18
    if (!initDate(18)) return back()
    let _id: Array<string> = id.toLowerCase().split('')
    let wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    let y = '10x98765432'.split('')
    let sum = 0
    for (let i: any = 0; i < 17; i++) {
      sum += wi[i] * parseInt(_id[i], 10)
    }
    const popValue = ('' + (_id.pop() || '')).toLowerCase()
    if (y[sum % 11] === popValue) info.valid = true
    return back()
  } else if (/^\d{15}$/.test(id)) {
    // 15
    if (initDate(15)) info.valid = true
    return back()
  } else {
    return back()
  }
}

export const delay = (number = 0) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, number)
  })
}

interface ReQuqestOpts {
  maxNumber: number
  reRequestTime: number
}
/**
 * 出错递归请求
 * @param {number} number 开始次数
 * @param {Function} action 执行的方法，需要显示的返回 ture / false
 * @param {Object|?} opts
 * @property {number} maxNumber || 5 最大请求次数
 * @property {number} reRequestTime || 100 重新请求的时间
 */
export const reRequest = async(number = 0, action: Function,
    opts: ReQuqestOpts | { maxNumber: 5; reRequestTime: 100 }): Promise<any> => {
  opts.maxNumber = opts.maxNumber || 5
  opts.reRequestTime = opts.reRequestTime || 100
  if (number >= opts.maxNumber) {
    return false
  }
  const actionResult = await action()
  if (actionResult) return true
  await delay(opts.reRequestTime)
  return reRequest(number + 1, action, opts)
}

export default {
  checkAlipay,
  checkWechat,
  checkIfIos,
  checkIfAndroid,
  getPoint,
  loadJS,
  getRandom,
  handleUploadFile,
  formatTime,
  getUserInfo,
  computTime,
  getDisTime,
  clearUserInfo,
  delay,
  reRequest
}
