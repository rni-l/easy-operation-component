<template>
  <el-input-number class='easy_inputNumber' v-bind='options' v-model='value'
    :size="options.size || mixinConfig.componentSize"
    @focus='focus'
    @blur='blur'
    @clear='clear'
    @change='change' />
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Emit } from 'vue-property-decorator'
import { easyInputNumberOptions } from '@/types/form'
import { inputNumberValue } from '@/types/common'
import formMixin from '@/mixins/form'

@Component({
  components: {}
})
export default class InputNumber extends Mixins(formMixin) {
  // @Prop({ default: undefined }) defaultValue?: any
  @Prop() options!: easyInputNumberOptions

  value: inputNumberValue = this.options.defaultValue || 0

  @Emit()
  change() {
    return this.getValue()
  }

  @Emit()
  focus() {
  }

  @Emit()
  blur() {
  }

  @Emit()
  clear() {
  }

  getValue() {
    return this.value
  }

  setValue(value: inputNumberValue) {
    this.value = value
  }
}
</script>

<style lang='scss'>
.easy_inputNumber {}
</style>
