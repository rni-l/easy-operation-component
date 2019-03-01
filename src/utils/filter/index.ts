/**
 * 全局 filter 方法
 * @returns []
 * @params: name: String
 * @params: func: Function
 */

export interface filterOption {
  name: string
  func: Function
}

const filters: Array<filterOption> = [
  {
    name: 'formatNumber',
    func: (value: any): any => {
      if (!value) return value
      if (isNaN(value)) return value
      if (value > 99) return '99+'
      return value
    }
  }
]

export default filters
