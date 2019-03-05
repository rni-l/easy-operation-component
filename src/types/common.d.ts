export interface CommonData {
  value: any
  label: [number, string]
  key?: any
  children?: CommonData[]
}

export interface ReturnCommonData {
  value: any
  obj?: CommonData
}

export interface easyFormValue {
  [key: string]: any
}

export interface easyFromItemRules {
  required?: boolean
  message?: string
  trigger: string
  min?: number
  max?: number
  validator?: Function
  [key: string]: any
}

export interface easyFormRules {
  [key: string]: easyFromItemRules[]
}

export interface easyFormItem {
  defaultValue?: any
  prop: string
  label?: string
  type: string // 组件类型
  required?: boolean
  error?: string
  showMessage?: boolean
  inlineMessage?: boolean
  size?: string
  rules: easyFromItemRules[]
  data?: any,
  options: easyFormItemComponentOptions
}

export interface easyFormItemComponentOptions {
  defaultValue?: any
  [key: string]: any
}

export type checkboxValue = Array<any>
export type radioValue = any
export type selectValue = number | string | [number | string | undefined]
export type inputValue = any
export type inputNumberValue = number
export type dateComponentValue = number | string | [number | string | undefined]
export type cascaderValue = any[]
export type switchValue = boolean
export type sliderValue = number
export type rateValue = number
export type colorPickerValue = string
export type transferValue = any[]

export interface eventCallbackValue {
  value: any
  prop?: string
}

export interface componentsMap {
  [key: string]: any
}
