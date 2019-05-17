export interface EasyFormValue {
  [key: string]: any
}

export interface EasyFromItemRules {
  required?: boolean
  message?: string
  trigger: string
  min?: number
  max?: number
  validator?: Function
  [key: string]: any
}

export interface EasyFormRules {
  [key: string]: EasyFromItemRules[]
}

export interface EasyFormItem {
  defaultValue?: any
  prop: string
  label?: string
  type: string // 组件类型
  required?: boolean
  error?: string
  showMessage?: boolean
  inlineMessage?: boolean
  size?: string
  rules: EasyFromItemRules[]
  data?: any,
  options: EasyFormItemComponentOptions
}

export interface EasyFormItemComponentOptions {
  defaultValue?: any
  [key: string]: any
}

export class EasyForm {}
