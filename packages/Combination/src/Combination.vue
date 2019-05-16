<template>
  <div class='easy_combination'>
    <slot name="top" />
    <!-- form -->

    <slot name="operation-top" />
    <!-- operation -->
    <slot name="table-earch" />

    <!-- table -->
    <u-table></u-table>

    <slot name="table-bottom" />

    <!-- pagination -->
    <pagination
      :size="size || mixinConfig.componentSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :total="total"
      :layout="layout"
    />

    <slot name="bottom" />
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import UTable from '@packages/Table'
import UForm from '@packages/Form'
import Pagination from '@packages/Pagination'

@Component({
  components: {
    UTable,
    UForm,
    Pagination
  }
})
export default class Com extends Vue {
  // pagniation
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
}
</script>

<style lang='scss'>
.easy_combination {}
</style>
