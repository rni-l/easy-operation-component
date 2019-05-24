<template>
  <el-select class='easy_select' v-bind='options'
    :size="options.size || mixinConfig.componentSize"
    v-model='value' @change='change'>
    <slot name='prefix' />
    <el-option v-for='(item, index) in data' :key='index'
      :size="options.size || mixinConfig.componentSize"
      :value='item.value' :label='item.label'  v-bind='item.option' />
  </el-select>
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Emit } from 'vue-property-decorator'
import { CommonData, ReturnCommonData, selectValue, EventCallbackValue } from '../../../../types/common'
import { EasySelectOptions } from '../../../../types/form'
import formMixin from '@/mixins/form'

@Component({
  components: {}
})
export default class Select extends Mixins(formMixin) {
  @Prop({ default: [] }) data?: CommonData[]
  @Prop({ default: () => ({}) }) options!: EasySelectOptions

  value: selectValue = this.options.defaultValue || ''

  @Emit()
  change(): EventCallbackValue {
    const value = this.getValue()
    this.options.handleChange && this.options.handleChange(value)
    return { value, prop: this.prop || '' }
  }

  getObjByValue(value: CommonData['value']): CommonData | undefined {
    return this.data ? this.data.find(item => item.value === value) : undefined
  }

  getValue(): ReturnCommonData {
    return {
      value: this.value,
      obj: this.getObjByValue(this.value)
    }
  }

  setValue(value: selectValue) {
    this.value = value
    this.change()
  }
}
</script>

<style lang='scss'>
.easy_select {}
</style>
