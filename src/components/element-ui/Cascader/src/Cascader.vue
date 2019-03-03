<template>
  <el-cascader class='easy_cascader' v-bind='options' v-model='value'
    :size="options.size || mixinConfig.componentSize"
    @change='change' :options='data'
  />
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Emit } from 'vue-property-decorator'
import { CommonData, ReturnCommonData, cascaderValue } from '@/types/common'
import { easyCascaderOptions } from '@/types/form'
import formMixin from '@/mixins/form'

@Component({
  components: {}
})
export default class CascaderCom extends Mixins(formMixin) {
  @Prop({ default: [] }) data?: CommonData[]
  @Prop() options!: easyCascaderOptions

  value: cascaderValue = this.options.defaultValue || []

  @Emit()
  change(): cascaderValue {
    return this.getValue()
  }

  getValue(): cascaderValue {
    return this.value
  }

  setValue(value: cascaderValue) {
    this.value = value
  }
}
</script>

<style lang='scss'>
.easy_cascader {}
</style>
