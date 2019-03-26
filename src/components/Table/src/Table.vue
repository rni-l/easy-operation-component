<template>
  <div class='easy_table'>
    <el-table
      :data='data'
      v-bind='options'>
      <el-table-column
        v-for="column in options.columns" :key="column.prop"
        :minWidth="column.width || tableConfig.columnMinWidth"
        v-bind="column"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { EasyTableOptions } from '@/types/form'
import { tableConfig } from '@/config/common'

@Component({
  components: {}
})
export default class Com extends Vue {
  @Prop() options!: EasyTableOptions
  @Prop({ default: () => ([]) }) data?: Array<any>

  tableConfig = tableConfig

  created() {
    console.log(this.options)
  }
}
</script>

<style lang='scss'>
.easy_table {}
</style>
