<template>
  <div class='m_table'>
    <u-table :options='options1' :data='data'></u-table>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import UTable from '@/components/Table'
import { EasyTableOptions } from '@/types/form'

@Component({
  components: {
    UTable
  }
})
export default class Com extends Vue {
  options1: EasyTableOptions = {
    // border: false,
    // data: [],
    // height: '',
    // maxHeight: '',
    // stripe: false
    tableOption: {
      align: 'center'
    },
    columns: [
      {
        prop: 'date',
        label: '时间'
      },
      {
        prop: 'date1',
        label: '时间1'
      }
    ]
  }
  data = [
    { date: 1 },
    { date: 2 },
    { date: 3 }
  ]
}
</script>

<style lang='scss'>
.m_table {}
</style>
