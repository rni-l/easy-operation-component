<template>
  <el-switch class='easy_switch' v-bind='options' v-model='value'
    :size="options.size || mixinConfig.componentSize"
    @change='change' />
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Emit } from 'vue-property-decorator'
import { easySwitchOptions } from '@/types/form'
import { switchValue } from '@/types/common'
import formMixin from '@/mixins/form'
// import ValidateForm from 'easy-validate-form'

@Component({
  components: {}
})
export default class SwitchCom extends Mixins(formMixin) {
  /**
   * @param {Function} checkIfSwitch 判断是否要改变 switch 的值
   */
  @Prop() options!: easySwitchOptions

  value: switchValue = this.options.defaultValue || false

  @Emit()
  change() {
    if (this.options.checkIfSwitch) {
      return this.options.checkIfSwitch().then(() => {
        return this.value
      }).catch(() => {
        // 如果拒绝了，将 swtich 值调回去
        this.value = !this.value
        return this.value
      })
    }
    return this.getValue()
  }

  getValue() {
    return this.value
  }

  setValue(value: switchValue) {
    this.value = value
  }
}
</script>

<style lang='scss'>
.easy_switch {}
</style>
