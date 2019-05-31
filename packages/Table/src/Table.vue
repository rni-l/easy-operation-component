<template>
  <div class='easy_table'>
    <!-- 顶部操作栏 -->
    <div class="easy_table_top">
      <div class="easy_table_top_left">
        <el-button v-if="curOptions.isShowAddBtn"
          icon="el-icon-plus"
          :size="mixinConfig.componentSize"
          type="primary" @click="add">添加</el-button>
        <slot name="top-left" />
      </div>
      <div class="easy_table_top_right">
        <el-button v-if="curOptions.isShowRefreshBtn"
          icon="el-icon-refresh"
          :size="mixinConfig.componentSize"
          @click="refresh">刷新</el-button>
        <slot name="top-right" />
      </div>
    </div>

    <!-- element-ui table -->
    <el-table
      ref='table'
      :data='data'
      v-bind='curOptions.tableOption'
      @select='handleSelect'
      @select-all='handleSelectAll'
      @selection-change='hanldeSelectionChange'
      @cell-mouse-enter='hanldeCellMouseEnter'
      @cell-mouse-leave='hanldeCellMouseLeave'
      @cell-click='hanldeCellClick'
      @cell-dblclick='handleCellDblclick'
      @row-click='handleRowClick'
      @row-contextmenu='handleRowContextmenu'
      @row-dblclick='handleRowDblclick'
      @header-click='handleHeaderClick'
      @header-contextmenu='handleContextMenu'
      @sort-change='handleSortChange'
      @filter-change='handleFilterChange'
      @current-change='handleCurrentChange'
      @header-dragend='handleHeaderDragend'
      @expand-change='handleExpandChange'
    >
      <template slot="append">
        <slot name="append" />
      </template>
      <el-table-column
        v-for="column in curOptions.columns" :key="column.prop"
        :minWidth="column.minWidth || tableConfig.columnMinWidth"
        :align="column.align || curOptions.tableOption.align || tableConfig.align"
        v-bind="column"
      >

        <template slot-scope="scope" slot="header">
          <slot v-if='column.headerSlot'
            :name="`${column.prop}Header`" :row="scope.row" :$index="scope.$index" />
          <span v-else>{{ column.label }}</span>
        </template>

        <template slot-scope="scope">
          <slot :name="column.prop" :row="scope.row" :$index="scope.$index">
            {{
              column.formatter ?
                column.formatter(scope.row, column, scope.row[column.prop], scope.$index) :
                scope.row[column.prop]
            }}
          </slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Emit, Mixins } from 'vue-property-decorator'
import { EasyTableOptions } from '../../../types/form'
import formMixin from '@/mixins/form'
import { tableConfig } from '@/config/common'
import { merge } from '@packages/utils'

@Component({
  components: {}
})
export default class Com extends Mixins(formMixin) {
  @Prop({ default: () => ({}) }) options!: EasyTableOptions
  @Prop({ default: () => ([]) }) data?: Array<any>

  tableConfig = tableConfig

  created() {
  }

  get curOptions() {
    return merge({
      isShowAddBtn: true,
      isShowRefreshBtn: true,
      tableOption: {
        stripe: true
      }
    }, this.options) as EasyTableOptions
  }

  @Emit()
  add() {}

  @Emit()
  refresh() {}

  // element-ui table 的内置事件
  handleSelect(...args: any[]) {
    this.$emit('select', ...args)
  }
  handleSelectAll(...args: any[]) {
    this.$emit('select-all', ...args)
  }
  hanldeSelectionChange(...args: any[]) {
    this.$emit('selection-change', ...args)
  }
  hanldeCellMouseEnter(...args: any[]) {
    this.$emit('cell-mouse-enter', ...args)
  }
  hanldeCellMouseLeave(...args: any[]) {
    this.$emit('cell-mouse-leave', ...args)
  }
  hanldeCellClick(...args: any[]) {
    this.$emit('cell-click', ...args)
  }
  handleCellDblclick(...args: any[]) {
    this.$emit('cell-dblclick', ...args)
  }
  handleRowClick(...args: any[]) {
    this.$emit('row-click', ...args)
  }
  handleRowContextmenu(...args: any[]) {
    this.$emit('row-contextmenu', ...args)
  }
  handleRowDblclick(...args: any[]) {
    this.$emit('row-dblclick', ...args)
  }
  handleHeaderClick(...args: any[]) {
    this.$emit('header-click', ...args)
  }
  handleContextMenu(...args: any[]) {
    this.$emit('context-menu', ...args)
  }
  handleSortChange(...args: any[]) {
    this.$emit('sort-change', ...args)
  }
  handleFilterChange(...args: any[]) {
    this.$emit('filter-change', ...args)
  }
  handleCurrentChange(...args: any[]) {
    this.$emit('current-change', ...args)
  }
  handleHeaderDragend(...args: any[]) {
    this.$emit('header-dragend', ...args)
  }
  handleExpandChange(...args: any[]) {
    this.$emit('expand-change', ...args)
  }

  // element-ui table 内置方法
  clearSection() {
    const table: any = this.$refs
    table.clearSection()
  }
  toggleRowSelection(row: any, selected: boolean) {
    const table: any = this.$refs
    table.clearSection(row, selected)
  }
  toggleAllSelection() {
    const table: any = this.$refs
    table.toggleAllSelection()
  }
  toggleRowExpansion(row: any, expanded: boolean) {
    const table: any = this.$refs
    table.toggleRowExpansion(row, expanded)
  }
  setCurrentRow(row: any) {
    const table: any = this.$refs
    table.setCurrentRow(row)
  }
  clearSort() {
    const table: any = this.$refs
    table.clearSort()
  }
  clearFilter(columnKey: string[]) {
    const table: any = this.$refs
    table.clearFilter(columnKey)
  }
  doLayout() {
    const table: any = this.$refs
    table.doLayout()
  }
  sort(prop: string, order: string) {
    const table: any = this.$refs
    table.clearSection(prop, order)
  }
}
</script>

<style lang='scss'>
.easy_table {
  &_top {
    padding-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &_left, &_right {
      display: flex;
      align-items: center;
    }
  }
}
</style>
