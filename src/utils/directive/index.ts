/**
 * 全局 directive 方法
 * @returns []
 * @params: name: String
 * @params: func: Function
 */
interface directiveOption {
  name: string
  func: Function
}

const directives: Array<directiveOption> = [
  {
    name: 'test',
    func: <T>(v: T): T => {
      return v
    }
  }
]

export default directives
