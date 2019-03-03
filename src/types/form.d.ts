import { checkboxValue, dateComponentValue, cascaderValue, radioValue, selectValue, inputNumberValue, inputValue, switchValue, sliderValue, rateValue, colorPickerValue, transferValue } from './common'

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

export interface easySwitchOptions {
  defaultValue?: switchValue
  checkIfSwitch?: Function
}

export interface easySliderOptions {
  defaultValue?: sliderValue
}

export interface easyRateOptions {
  defaultValue?: rateValue
}

export interface easyColorPickerOptions {
  defaultValue?: colorPickerValue
}

export interface easyTransferOptions {
  defaultValue?: transferValue
}
