<template>
  <el-checkbox-group class='easy_checkbox_group'
    :size="options.size || mixinConfig.componentSize"
    v-model="value" v-bind='options' @change='change'>
    <el-checkbox v-for='(item, index) in data' :key='index'
      :size="options.size || mixinConfig.componentSize"
      :label="item.label" v-bind='item.option' />
  </el-checkbox-group>
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Emit } from 'vue-property-decorator'
import { CommonData, checkboxValue, EventCallbackValue, ReturnCommonData } from '../../../../types/common'
import { EasyCheckboxOptions } from '../../../../types/form'
import formMixin from '../../../mixins/form'

@Component({
  components: {}
})
export default class Checkbox extends Mixins(formMixin) {
  @Prop({ default: () => [] }) data?: CommonData[]
  @Prop({ default: () => ({}) }) options!: EasyCheckboxOptions

  value: checkboxValue = this.options.defaultValue || []

  @Emit()
  change(): EventCallbackValue {
    const { value, obj } = this.getValue()
    this.options.handleChange && this.options.handleChange(value)
    return { value, objValue: obj, prop: this.prop || '' }
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

  setValue(value: checkboxValue) {
    this.value = value
    this.change()
  }
}
</script>

<style lang='scss'>
.easy_checkbox_group {}
</style>
