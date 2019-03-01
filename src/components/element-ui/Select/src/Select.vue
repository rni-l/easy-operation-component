<template>
  <el-select class='easy_select' v-bind='options'
    :size="options.size || mixinConfig.componentSize"
    v-model='value' @change='change'>
    <slot name='prefix' />
    <el-option v-for='(item, index) in data' :key='index'
      :size="options.size || mixinConfig.componentSize"
      :value='item.value' :label='item.label'  v-bind='item.option' />
  </el-select>
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Emit } from 'vue-property-decorator'
import { CommonData, ReturnCommonData, selectValue } from '@/types/common'
import { easySelectOptions } from '@/types/form'
import formMixin from '@/mixins/form'

@Component({
  components: {}
})
export default class Select extends Mixins(formMixin) {
  @Prop({ default: [] }) data?: CommonData[]
  @Prop() options!: easySelectOptions

  value: selectValue = this.options.defaultValue || ''

  @Emit()
  change(): ReturnCommonData {
    return this.getValue()
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

  setValue(value: selectValue) {
    this.value = value
  }
}
</script>

<style lang='scss'>
.easy_select {}
</style>
