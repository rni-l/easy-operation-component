<template>
  <el-transfer class='easy_transfer' v-bind='options' v-model='value'
    :data='data'
    :size="options.size || mixinConfig.componentSize"
    @left-check-change='leftCheckChange'
    @right-check-change='rightCheckChange'
    @change='change'>
    <template slot='left-footer'>
      <slot name='left-footer' />
    </template>
    <template slot='right-footer'>
      <slot name='right-footer' />
    </template>
  </el-transfer>
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Emit } from 'vue-property-decorator'
import { EasyTransferOptions } from '../../../../types/form'
import { transferValue, CommonData, EventCallbackValue } from '../../../../types/common'
import formMixin from '@/mixins/form'

@Component({
  components: {}
})
export default class Transfer extends Mixins(formMixin) {
  @Prop({ default: [] }) data?: CommonData[]
  @Prop() options!: EasyTransferOptions

  value: transferValue = this.options.defaultValue || []

  @Emit()
  change(): EventCallbackValue {
    const value = this.getValue()
    this.options.handleChange && this.options.handleChange(value)
    return { value, prop: this.prop || '' }
  }

  @Emit()
  leftCheckChange() {
    this.options.handleLeftCheckChange && this.options.handleLeftCheckChange()
  }

  @Emit()
  rightCheckChange() {
    this.options.handleRightCheckChange && this.options.handleRightCheckChange()
  }

  getValue() {
    return this.value
  }

  setValue(value: transferValue) {
    this.value = value
    this.change()
  }
}
</script>

<style lang='scss'>
.easy_transfer {}
</style>
