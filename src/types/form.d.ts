import { checkboxValue, dateComponentValue, cascaderValue, radioValue, selectValue, inputNumberValue, inputValue, switchValue, sliderValue, rateValue, colorPickerValue, transferValue } from './common'
import { EasyFormValue, EasyFormItem } from '@/types/easy-form'
import { EasyTableItem, EasyTableAttrOptions } from '@/types/easy-table'

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
}

export interface EasyTableOptions {
  [key: string]: any
  tableOption: EasyTableAttrOptions
  columns?: EasyTableItem[]
  // height: string | number
  // maxHeight: string | number
  // stripe: boolean
  // border: boolean
  // fit: boolean
  // showHeader: boolean
  // highlightCurrentRow: boolean
  // currentRowKey: string | number
  // rowClassName: string | ((param: rowCallbackParams) => string)
  // rowStyle: object | ((param: rowCallbackParams) => object)
  // cellClassName: string | ((param: cellCallbackParams) => string)
  // cellStyle: object | ((param: cellCallbackParams) => object)
  // headerRowClassName: string | ((param: rowCallbackParams) => string)
  // headerRowStyle: object | ((param: rowCallbackParams) => object)
  // headerCellClassName: string | ((param: cellCallbackParams) => string)
  // headerCellStyle: object | ((param: cellCallbackParams) => object)
  // rowKey: (row: object) => any
  // emptyText: String
  // defaultExpandAll: Boolean
  // expandRowKeys: any[]
  // defaultSort: DefaultSortOptions
  // tooltipEffect: TooltipEffect
  // showSummary: boolean
  // sumText: string
  // summaryMethod: (param: SummaryMethodParams) => any[]
  // selectOnIndeterminate: boolean
  // clearSelection(): void
  // toggleRowSelection(row: object, selected?: boolean): void
  // toggleAllSelection(): void
  // setCurrentRow(row?: object): void
  // toggleRowExpansion(row: object, expanded?: boolean): void
  // clearSort(): void
  // clearFilter(): void
  // doLayout(): void
  // sort(prop: string, order: string): void
}
