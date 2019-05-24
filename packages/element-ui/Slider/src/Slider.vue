<template>
  <el-slider class='easy_slider' v-bind='options' v-model='value'
    :size="options.size || mixinConfig.componentSize"
    @change='change' />
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Emit } from 'vue-property-decorator'
import { EasySliderOptions } from '../../../../types/form'
import { sliderValue, EventCallbackValue } from '../../../../types/common'
import formMixin from '@/mixins/form'

@Component({
  components: {}
})
export default class SliderCom extends Mixins(formMixin) {
  // @Prop({ default: undefined }) defaultValue?: any
  @Prop({ default: () => ({}) }) options!: EasySliderOptions

  value: sliderValue = this.options.defaultValue || 0

  @Emit()
  change() {
    const value = this.getValue()
    this.options.handleChange && this.options.handleChange(value)
    return { value, prop: this.prop || '' }
  }

  getValue() {
    return this.value
  }

  setValue(value: sliderValue) {
    this.value = value
    this.change()
  }
}
</script>

<style lang='scss'>
.easy_slider {}
</style>
