export type EasyTableValue = any[]

export interface EasyTableItem {
  [key: string]: any
  prop: string
  width?: string | number
}

export interface EasyTableAttrOptions {
  [key: string]: any
  align?: string
}
