export interface CommonData {
  value: any
  label: [Number, String]
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
