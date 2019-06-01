<template>
  <el-pagination
    class="easy_pagination"
    :size="size || mixinConfig.componentSize"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :total="total"
    :layout="layout">
  </el-pagination>
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Emit, Watch } from 'vue-property-decorator'
import formMixin from '../../mixins/form'

@Component({
  components: {}
})
export default class Checkbox extends Mixins(formMixin) {
  @Prop({ default: () => ([10, 20, 50, 100]) }) pageSizes!: number[]
  @Prop({ default: 10 }) pageSize!: number
  @Prop({ default: 0 }) total!: number
  @Prop({ default: 1 }) currentPage!: number
  @Prop({ default: 'total, sizes, prev, pager, next, jumper' }) layout!: string
  @Prop({ default: '' }) size!: string

  handleSizeChange(val: number) {
    this.$emit('sizeChange', val)
  }

  handleCurrentChange(val: number) {
    this.$emit('currentChange', val)
  }

  getValue() {
  }

  setValue() {
  }
}
</script>

<style lang='scss'>
.easy_pagination {}
</style>
