<template>
  <el-color-picker class='easy_colorPicker' v-bind='options' v-model='value'
    :size="options.size || mixinConfig.componentSize"
    @change='change' />
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Emit } from 'vue-property-decorator'
import { EasyColorPickerOptions } from '../../../../types/form'
import { colorPickerValue, EventCallbackValue } from '../../../../types/common'
import formMixin from '../../../mixins/form'

@Component({
  components: {}
})
export default class ColorPickerCom extends Mixins(formMixin) {
  // @Prop({ default: undefined }) defaultValue?: any
  @Prop({ default: () => ({}) }) options!: EasyColorPickerOptions

  value: colorPickerValue = this.options.defaultValue || ''

  @Emit()
  change(): EventCallbackValue {
    const value = this.getValue()
    this.options.handleChange && this.options.handleChange(value)
    return { value, prop: this.prop || '' }
  }

  getValue() {
    return this.value
  }

  setValue(value: colorPickerValue) {
    this.value = value
    this.change()
  }
}
</script>

<style lang='scss'>
.easy_colorPicker {}
</style>
