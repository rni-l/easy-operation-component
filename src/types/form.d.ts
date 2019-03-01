import { checkboxValue, dateComponentValue, cascaderValue, radioValue, selectValue, inputNumberValue, inputValue } from './common'

export interface easyInputOptions {
  defaultValue?: inputValue
}

export interface easyInputNumberOptions {
  defaultValue?: inputNumberValue
}

export interface easySelectOptions {
  defaultValue?: selectValue
}

export interface easyCascaderOptions {
  defaultValue?: cascaderValue
}

export interface easyRadioOptions {
  defaultValue?: radioValue
}

export interface easyCheckboxOptions {
  defaultValue?: checkboxValue
}

export interface easyDateOptions {
  defaultValue?: dateComponentValue
  componentType?: String
}
