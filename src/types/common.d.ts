export interface CommonData {
  value: any
  label: [Number, String]
  key?: any,
  children?: CommonData[]
}

export interface ReturnCommonData {
  value: any
  obj?: CommonData
}

export type checkboxValue = Array<any>
export type radioValue = any
export type selectValue = Number | String | [Number | String | undefined]
export type inputValue = any
export type inputNumberValue = Number
export type dateComponentValue = Number | String | [Number | String | undefined]
export type cascaderValue = any[]
export type switchValue = Boolean
export type sliderValue = Number
export type rateValue = Number
export type colorPickerValue = String
export type transferValue = any[]
