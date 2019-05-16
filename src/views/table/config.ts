import { EasyTableOptions } from '../../../types/form'

export const options1: EasyTableOptions = {
  tableOption: {
    align: 'center'
  },
  columns: [
    {
      prop: 'date',
      label: '时间',
      fixed: true,
      headerSlot: true
    },
    {
      prop: 'date1',
      label: '时间1',
      minWidth: '400px',
      formatter: (row: any) => {
        return 'hah'
      }
    },
    {
      prop: 'date2',
      label: '时间2',
      minWidth: '400px',
      formatter: (row: any) => {
        return 'hah'
      }
    }
  ]
}
