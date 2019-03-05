<template>
  <el-rate class='easy_rate' v-bind='options' v-model='value'
    :size="options.size || mixinConfig.componentSize"
    @change='change' />
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Emit } from 'vue-property-decorator'
import { easyRateOptions } from '@/types/form'
import { rateValue, eventCallbackValue } from '@/types/common'
import formMixin from '@/mixins/form'

@Component({
  components: {}
})
export default class RateCom extends Mixins(formMixin) {
  // @Prop({ default: undefined }) defaultValue?: any
  @Prop() options!: easyRateOptions

  value: rateValue = this.options.defaultValue || 0

  @Emit()
  change(): eventCallbackValue {
    const value = this.getValue()
    this.options.handleChange && this.options.handleChange(value)
    return { value, prop: this.prop || '' }
  }

  getValue() {
    return this.value
  }

  setValue(value: rateValue) {
    this.value = value
    this.change()
  }
}
</script>

<style lang='scss'>
.easy_rate {}
</style>
