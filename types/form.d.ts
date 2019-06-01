import { checkboxValue, dateComponentValue, cascaderValue, radioValue, selectValue, inputNumberValue, inputValue, switchValue, sliderValue, rateValue, colorPickerValue, transferValue, editroValue } from './common'
import { EasyFormValue, EasyFormItem } from './easy-form'
import { EasyTableItem, EasyTableAttrOptions } from './easy-table'
import { HandleUpload } from './easy-editor'

export interface EasyInputOptions {
  defaultValue?: inputValue
  handleInput?: Function
  handleBlur?: Function
  handleFocus?: Function
  handleChange?: Function
  handleClear?: Function
}

export interface EasyInputNumberOptions {
  defaultValue?: inputNumberValue
  handleChange?: Function
  handleBlur?: Function
  handleFocus?: Function
}

export interface EasySelectOptions {
  defaultValue?: selectValue
  handleChange?: Function
}

export interface EasyCascaderOptions {
  defaultValue?: cascaderValue
  handleChange?: Function
}

export interface EasyRadioOptions {
  defaultValue?: radioValue
  handleChange?: Function
}

export interface EasyCheckboxOptions {
  defaultValue?: checkboxValue
  handleChange?: Function
}

export interface EasyDateOptions {
  defaultValue?: dateComponentValue
  componentType?: String
  handleChange?: Function
}

export interface EasySwitchOptions {
  defaultValue?: switchValue
  checkIfSwitch?: Function
  handleChange?: Function
}

export interface EasySliderOptions {
  defaultValue?: sliderValue
  handleChange?: Function
}

export interface EasyRateOptions {
  defaultValue?: rateValue
  handleChange?: Function
}

export interface EasyColorPickerOptions {
  defaultValue?: colorPickerValue
  handleChange?: Function
}

export interface EasyTransferOptions {
  defaultValue?: transferValue
  handleChange?: Function
  handleLeftCheckChange?: Function
  handleRightCheckChange?: Function
}

export interface EasyUpload {
  defaultValue?: transferValue
  handleChange?: Function
}

export interface EasyFormOptions {
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
  columns?: EasyFormItem[]
  isShowBtnGroup?: boolean
  isResetDefaultValue?: boolean
}

export interface EasyTableOptions {
  [key: string]: any
  tableOption: EasyTableAttrOptions
  columns?: EasyTableItem[]
  isShowAddBtn?: boolean
  isShowRefreshBtn?: boolean
}

export interface EasyEditorOptions {
  [key: string]: any
  editorOption: any
  defaultValue?: editroValue,
  handleUpload?: HandleUpload
}
