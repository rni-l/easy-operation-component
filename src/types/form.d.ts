import { checkboxValue, dateComponentValue, cascaderValue, radioValue, selectValue, inputNumberValue, inputValue, switchValue, sliderValue, rateValue, colorPickerValue, transferValue, easyFormValue, easyFormItem } from './common'

export interface easyInputOptions {
  defaultValue?: inputValue
  handleInput?: Function
  handleBlur?: Function
  handleFocus?: Function
  handleChange?: Function
  handleClear?: Function
}

export interface easyInputNumberOptions {
  defaultValue?: inputNumberValue
  handleChange?: Function
  handleBlur?: Function
  handleFocus?: Function
}

export interface easySelectOptions {
  defaultValue?: selectValue
  handleChange?: Function
}

export interface easyCascaderOptions {
  defaultValue?: cascaderValue
  handleChange?: Function
}

export interface easyRadioOptions {
  defaultValue?: radioValue
  handleChange?: Function
}

export interface easyCheckboxOptions {
  defaultValue?: checkboxValue
  handleChange?: Function
}

export interface easyDateOptions {
  defaultValue?: dateComponentValue
  componentType?: String
  handleChange?: Function
}

export interface easySwitchOptions {
  defaultValue?: switchValue
  checkIfSwitch?: Function
  handleChange?: Function
}

export interface easySliderOptions {
  defaultValue?: sliderValue
  handleChange?: Function
}

export interface easyRateOptions {
  defaultValue?: rateValue
  handleChange?: Function
}

export interface easyColorPickerOptions {
  defaultValue?: colorPickerValue
  handleChange?: Function
}

export interface easyTransferOptions {
  defaultValue?: transferValue
  handleChange?: Function
  handleLeftCheckChange?: Function
  handleRightCheckChange?: Function
}

export interface easyFormOptions {
  inline?: boolean
  labelPosition?: string
  labelWidth?: string
  labelSuffix?: string
  hideRequired?: boolean
  showMessage?: boolean
  inlineMessage?: boolean
  statusIcon?: boolean
  validateOnRuleChange?: boolean
  size?: string
  disabled?: boolean
  columns?: easyFormItem[]
}
