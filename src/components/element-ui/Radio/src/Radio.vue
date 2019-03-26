<template>
  <el-radio-group class='easy_radio_group' v-model="value" v-bind='options'
    :size="options.size || mixinConfig.componentSize"
    @change='change'>
    <el-radio v-for='(item, index) in data' :key='index' :label="item.value"
      :size="options.size || mixinConfig.componentSize"
       v-bind='item.option'>{{ item.label }}</el-radio>
  </el-radio-group>
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Emit } from 'vue-property-decorator'
import { CommonData, ReturnCommonData, radioValue, EventCallbackValue } from '@/types/common'
import { EasyRadioOptions } from '@/types/form'
import formMixin from '@/mixins/form'

@Component({
  components: {}
})
export default class Radio extends Mixins(formMixin) {
  @Prop({ default: () => [] }) data?: CommonData[]
  @Prop() options!: EasyRadioOptions

  value: radioValue = this.options.defaultValue

  @Emit()
  change(): EventCallbackValue {
    const value = this.getValue()
    this.options.handleChange && this.options.handleChange(value)
    return { value, prop: this.prop || '' }
  }

  getObjByValue(value: CommonData['value']): CommonData | undefined {
    return this.data ? this.data.find(item => item.value === value) : undefined
  }

  getValue(): ReturnCommonData {
    return {
      value: this.value,
      obj: this.getObjByValue(this.value)
    }
  }

  setValue(value: radioValue) {
    this.value = value
    this.change()
  }
}
</script>

<style lang='scss'>
.easy_radio {}
</style>
