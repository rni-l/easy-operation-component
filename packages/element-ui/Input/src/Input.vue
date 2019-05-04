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
import { EasyInputOptions } from '../../../../types/form'
import { inputValue, EventCallbackValue } from '../../../../types/common'
import formMixin from '@/mixins/form'

@Component({
  components: {}
})
export default class Input extends Mixins(formMixin) {
  // @Prop({ default: undefined }) defaultValue?: any
  @Prop() options!: EasyInputOptions

  value: inputValue = this.options.defaultValue || undefined

  @Emit()
  change(): EventCallbackValue {
    const value = this.getValue()
    this.options.handleChange && this.options.handleChange(value)
    return { value, prop: this.prop || '' }
  }

  @Emit()
  focus() {
    this.options.handleFocus && this.options.handleFocus()
  }

  @Emit()
  input(): EventCallbackValue {
    const value = this.getValue()
    this.options.handleInput && this.options.handleInput(value)
    return { value, prop: this.prop || '' }
  }

  @Emit()
  blur() {
    this.options.handleBlur && this.options.handleBlur()
  }

  @Emit()
  clear() {
    this.options.handleClear && this.options.handleClear()
  }

  getValue() {
    console.log(this.value)
    return this.value
  }

  setValue(value: inputValue) {
    this.value = value
    this.change()
  }
}
</script>

<style lang='scss'>
.easy_input {}
</style>
