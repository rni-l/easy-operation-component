export interface ComponentConfig {
  dateFormat: string
  dateValueFormat: string
}

export interface FormConfig {
  componentSize: string
}

export interface TableConfig {
  componentSize: string
  columnMinWidth: number | string
  align: string
}

export const componentConfig: ComponentConfig = {
  dateFormat: 'yyyy-MM-dd hh:mm:ss',
  dateValueFormat: 'yyyy-MM-dd hh:mm:ss'
}

export const formConfig: FormConfig = {
  componentSize: 'small'
}

export const tableConfig: TableConfig = {
  componentSize: 'small',
  columnMinWidth: '120px',
  align: 'center'
}
