<template>
  <el-slider class='easy_slider' v-bind='options' v-model='value'
    :size="options.size || mixinConfig.componentSize"
    @change='change' />
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Emit } from 'vue-property-decorator'
import { easySliderOptions } from '@/types/form'
import { sliderValue } from '@/types/common'
import formMixin from '@/mixins/form'

@Component({
  components: {}
})
export default class SliderCom extends Mixins(formMixin) {
  // @Prop({ default: undefined }) defaultValue?: any
  @Prop() options!: easySliderOptions

  value: sliderValue = this.options.defaultValue || 0

  @Emit()
  change() {
    return this.getValue()
  }

  getValue() {
    return this.value
  }

  setValue(value: sliderValue) {
    this.value = value
  }
}
</script>

<style lang='scss'>
.easy_slider {}
</style>
