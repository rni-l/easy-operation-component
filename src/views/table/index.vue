<template>
  <div class='m_table'>
    <u-table :options='options1' :data='data'>
      <template slot="append">
        append
      </template>
      <template slot-scope="scope" slot="date">
        {{ scope.row.date }} sdf
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
import { options1 } from './config'

@Component({
  components: {
    UTable
  }
})
export default class Com extends Vue {
  options1 = options1
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
