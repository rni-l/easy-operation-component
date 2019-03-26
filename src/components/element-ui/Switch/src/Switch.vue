<template>
  <el-switch class='easy_switch' v-bind='options' v-model='value'
    :size="options.size || mixinConfig.componentSize"
    @change='change' />
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Emit } from 'vue-property-decorator'
import { EasySwitchOptions } from '@/types/form'
import { switchValue, EventCallbackValue } from '@/types/common'
import formMixin from '@/mixins/form'
// import ValidateForm from 'easy-validate-form'

@Component({
  components: {}
})
export default class SwitchCom extends Mixins(formMixin) {
  /**
   * @param {Function} checkIfSwitch 判断是否要改变 switch 的值
   */
  @Prop() options!: EasySwitchOptions

  value: switchValue = this.options.defaultValue || false

  @Emit()
  change(): EventCallbackValue | Promise<EventCallbackValue> {
    const value = this.getValue()
    if (this.options.checkIfSwitch) {
      return this.options.checkIfSwitch().then(() => {
        this.options.handleChange && this.options.handleChange(value)
        return { value, prop: this.prop || '' }
      }).catch(() => {
        // 如果拒绝了，将 swtich 值调回去
        this.value = !value
        return { value: this.value, prop: this.prop || '' }
      })
    }
    this.options.handleChange && this.options.handleChange(value)
    return { value, prop: this.prop || '' }
  }

  getValue() {
    return this.value
  }

  setValue(value: switchValue) {
    this.value = value
    this.change()
  }
}
</script>

<style lang='scss'>
.easy_switch {}
</style>
