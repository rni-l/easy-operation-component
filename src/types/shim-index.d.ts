declare module 'nprogress'
declare module 'quill'
declare module '@rnil/vue-draggable-resizable/src'
declare module 'mockjs'

declare module '*.png' {
  const value: string
  export default value
}

declare module '*.jpg' {
  const value: string
  export default value
}

declare namespace utils {
  interface requestHanldeType {
    errType: String
  }
}

declare namespace global {
  interface responseData {
    code: Number
    data: any
  }
}

// 初始化设置
declare interface initConfig {}

interface Window {
  BMap: any
  [key: string]: any
}

declare var window: Window
