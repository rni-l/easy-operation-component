export interface componentConfigIf {
  dateFormat: String
  dateValueFormat: String
}

export interface formConfigIf {
  componentSize: String
}

export const componentConfig: componentConfigIf = {
  dateFormat: 'yyyy-MM-dd hh:mm:ss',
  dateValueFormat: 'yyyy-MM-dd hh:mm:ss'
}

export const formConfig: formConfigIf = {
  componentSize: 'small'
}
