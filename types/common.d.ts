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

export interface EventCallbackValue {
  value: any
  // FOCUS:
  objValue?: any
  prop?: string
}

export interface ComponentsMap {
  [key: string]: any
}
