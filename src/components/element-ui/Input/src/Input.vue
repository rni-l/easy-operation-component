<template>
  <el-input class='easy_input' v-bind='options' v-model='value'
    :size="options.size || mixinConfig.componentSize"
    @focus='focus'
    @blur='blur'
    @input='input'
    @clear='clear'
    @change='change'>
    <!-- slot -->
    <template slot='prefix'>
      <slot name='prefix' :value='value' />
    </template>
    <template slot='suffix'>
      <slot name='suffix' :value='value' />
    </template>
    <template slot='prepend'>
      <slot name='prepen' :value='value' />
    </template>
    <template slot='append'>
      <slot name='append' :value='value' />
    </template>
  </el-input>
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Emit } from 'vue-property-decorator'
import { easyInputOptions } from '@/types/form'
import { inputValue } from '@/types/common'
import formMixin from '@/mixins/form'

@Component({
  components: {}
})
export default class Input extends Mixins(formMixin) {
  // @Prop({ default: undefined }) defaultValue?: any
  @Prop() options!: easyInputOptions

  value: inputValue = this.options.defaultValue || ''

  @Emit()
  change() {
    return this.getValue()
  }

  @Emit()
  focus() {
  }

  @Emit()
  input() {
    return this.getValue()
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

  setValue(value: inputValue) {
    this.value = value
  }
}
</script>

<style lang='scss'>
.easy_input {}
</style>
