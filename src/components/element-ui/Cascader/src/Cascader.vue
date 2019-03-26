<template>
  <el-cascader class='easy_cascader' v-bind='options' v-model='value'
    :size="options.size || mixinConfig.componentSize"
    @change='change' :options='data'
  />
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Emit } from 'vue-property-decorator'
import { CommonData, ReturnCommonData, cascaderValue, EventCallbackValue } from '@/types/common'
import { EasyCascaderOptions } from '@/types/form'
import formMixin from '@/mixins/form'

@Component({
  components: {}
})
export default class CascaderCom extends Mixins(formMixin) {
  @Prop({ default: [] }) data?: CommonData[]
  @Prop() options!: EasyCascaderOptions

  value: cascaderValue = this.options.defaultValue || []

  @Emit()
  change(): EventCallbackValue {
    const value = this.getValue()
    this.options.handleChange && this.options.handleChange(value)
    return { value, prop: this.prop || '' }
  }

  getValue(): cascaderValue {
    return this.value
  }

  setValue(value: cascaderValue) {
    this.value = value
    this.change()
  }
}
</script>

<style lang='scss'>
.easy_cascader {}
</style>
