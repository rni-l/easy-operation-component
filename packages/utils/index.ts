interface arg {
  [key: string]: any
}

/**
 * 合并对象
 * 增量覆盖
 * 1. 两个值类型只要都不是对象，则后者覆盖
 * 2. 两个值为对象，则增量覆盖
 * @returns {Object}
 */
export const merge = (...args: any[]): arg => {
  function checkIsObject(value: any): boolean {
    return Object.prototype.toString.call(value) === '[object Object]'
  }
  return args.reduce((acc, cur: arg): arg => {
    if (!checkIsObject(cur)) {
      // 如果不是 object
      return acc
    }
    // 叠加
    Object.keys(cur).forEach(key => {
      const curValue = cur[key]
      if (!acc[key] || !checkIsObject(curValue) || !checkIsObject(acc[key])) {
        acc[key] = curValue
      } else {
        acc[key] = merge(acc[key], curValue)
      }
    })
    return acc
  }, {} as arg)
}
