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
import { easyTransferOptions } from '@/types/form'
import { transferValue, CommonData } from '@/types/common'
import formMixin from '@/mixins/form'

@Component({
  components: {}
})
export default class Transfer extends Mixins(formMixin) {
  @Prop({ default: [] }) data?: CommonData[]
  @Prop() options!: easyTransferOptions

  value: transferValue = this.options.defaultValue || []

  @Emit()
  change() {
    return this.getValue()
  }

  getValue() {
    return this.value
  }

  setValue(value: transferValue) {
    this.value = value
  }

  leftCheckChange() {}

  rightCheckChange() {}
}
</script>

<style lang='scss'>
.easy_transfer {}
</style>
