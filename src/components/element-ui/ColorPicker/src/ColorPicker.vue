<template>
  <el-color-picker class='easy_colorPicker' v-bind='options' v-model='value'
    :size="options.size || mixinConfig.componentSize"
    @change='change' />
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Emit } from 'vue-property-decorator'
import { easyColorPickerOptions } from '@/types/form'
import { colorPickerValue } from '@/types/common'
import formMixin from '@/mixins/form'

@Component({
  components: {}
})
export default class ColorPickerCom extends Mixins(formMixin) {
  // @Prop({ default: undefined }) defaultValue?: any
  @Prop() options!: easyColorPickerOptions

  value: colorPickerValue = this.options.defaultValue || ''

  @Emit()
  change() {
    return this.getValue()
  }

  getValue() {
    return this.value
  }

  setValue(value: colorPickerValue) {
    this.value = value
  }
}
</script>

<style lang='scss'>
.easy_colorPicker {}
</style>
