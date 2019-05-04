<template>
  <div class='m_table'>
    <u-table :options='options1' :data='data'>
      <template slot="append">
        append
      </template>
      <template slot-scope="scope" slot="date">
        {{ scope.row.date }}
      </template>
      <template  slot="dateHeader">
        date header
      </template>
    </u-table>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import UTable from '@packages/Table'
import { EasyTableOptions } from '../../types/form'

@Component({
  components: {
    UTable
  }
})
export default class Com extends Vue {
  options1: EasyTableOptions = {
    tableOption: {
      align: 'center'
    },
    columns: [
      {
        prop: 'date',
        label: '时间',
        fixed: true
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
  data = [
    {
      date: 1, date1: '11'
    },
    { date: 2 },
    { date: 3 }
  ]
}
</script>

<style lang='scss'>
.m_table {}
</style>
