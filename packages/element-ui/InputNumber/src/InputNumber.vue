<template>
  <el-input-number class='easy_inputNumber' v-bind='options' v-model='value'
    :size="options.size || mixinConfig.componentSize"
    @focus='focus'
    @blur='blur'
    @change='change' />
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Emit } from 'vue-property-decorator'
import { EasyInputNumberOptions } from '../../../../types/form'
import { inputNumberValue, EventCallbackValue } from '../../../../types/common'
import formMixin from '@/mixins/form'

@Component({
  components: {}
})
export default class InputNumber extends Mixins(formMixin) {
  // @Prop({ default: undefined }) defaultValue?: any
  @Prop() options!: EasyInputNumberOptions

  value: inputNumberValue = this.options.defaultValue || 0

  @Emit()
  change(): EventCallbackValue {
    const value = this.getValue()
    this.options.handleChange && this.options.handleChange(value)
    return { value, prop: this.prop || '' }
  }

  @Emit()
  focus() {
    this.options.handleFocus && this.options.handleFocus()
  }

  @Emit()
  blur() {
    this.options.handleBlur && this.options.handleBlur()
  }

  getValue() {
    return this.value
  }

  setValue(value: inputNumberValue) {
    this.value = value
    this.change()
  }
}
</script>

<style lang='scss'>
.easy_inputNumber {}
</style>
