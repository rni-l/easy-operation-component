<template>
  <el-form class='easy_form'
    :model='data' :rules='getRules'
    :inline="options.inline || false"
    :labelPosition="options.labelPosition || 'right'"
    :labelWidth="options.labelWidth || ''"
    :labelSuffix="options.labelSuffix || ''"
    :hideRequired="options.hideRequired || false"
    :showMessage="options.showMessage"
    :inlineMessage="options.inlineMessage || false"
    :statusIcon="options.statusIcon || false"
    :validateOnRuleChange="options.validateOnRuleChange"
    :size="options.size || mixinConfig.componentSize"
    :disabled="options.disabled || false"
    ref="form"
    @validate='handleValidate'
  >
    <el-form-item v-for='item in options.columns'
      :key="item.prop"
      :prop='item.prop'
      :label="item.label || ''"
      :required="item.required || false"
      :error="item.error || ''"
      :showMessage="item.showMessage || true"
      :inlineMessage="item.inlineMessage || false"
      :size="item.size || ''"
    >
      <component :is='getComponentByType(item)'
        :ref="item.prop"
        :options='item.options || {}'
        :data='item.data'
        :prop='item.prop'
        @input='handleInput'
        @change="handleChange"
      />

      <template slot='label' slot-scope='error'>
        <slot name='label' :error='error' />
      </template>
    </el-form-item>
  </el-form>
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Watch, Emit } from 'vue-property-decorator'
import { EasyFormValue, EasyFormItem, EasyFormRules } from '../../../types/easy-form'
import { EasyFormOptions } from '../../../types/form'
import formMixin from '@/mixins/form'
import addComponentsMixin from '@/mixins/addComponents'

interface eventCallbackParams {
  value: any
  prop: string
}

@Component({
  components: {}
})
export default class Com extends Mixins(addComponentsMixin, formMixin) {
  @Prop() options!: EasyFormOptions

  data: EasyFormValue = {}

  created() {
    this.setDefaultValue()
  }

  // 获取每个 column 里面的 defaultValue
  setDefaultValue() {
    if (this.options.columns) {
      this.data = this.options.columns.reduce((preValue: EasyFormValue, curValue) => {
        if (curValue.rules) {
          preValue[curValue.prop] = curValue.options.defaultValue
        }
        return preValue
      }, {})
    }
  }

  // 将每个 column 里面的 rules 抽出来，封装成 Object 形式
  get getRules() {
    const rules = !this.options.columns
      ? {}
      : this.options.columns.reduce((preValue: EasyFormRules, curValue) => {
        if (curValue.rules) {
          preValue[curValue.prop] = curValue.rules
        }
        return preValue
      }, {})
    return rules
  }

  getComponentByType({ type }: EasyFormItem) {
    if (!type || !this.ComponentsMap[type]) return false
    return this.ComponentsMap[type]
  }

  getValue () {
    this.$emit('getValue', this.data)
  }

  setValue({ value, prop }: eventCallbackParams) {
    const com: any = this.$refs[prop]
    com[0] && com[0].setValue(value)
  }

  @Emit()
  handleValidate(prop: EasyFormValue, valid: boolean, error?: string) {
    return { prop, valid, error }
  }

  @Emit()
  change() {
    return { data: this.data }
  }

  setValueByProp(value: eventCallbackParams['value'], prop: eventCallbackParams['prop']) {
    this.$set(this.data, prop, value)
  }

  // 通过这两个事件订阅，去改变数据
  handleChange({ value, prop }: eventCallbackParams) {
    const isDiff = this.checkDiffByProp({ value, prop })
    this.setValueByProp(value, prop)
    this.$nextTick(() => {
      if (isDiff) {
        this.change()
      }
    })
  }

  // 通过这两个事件订阅，去改变数据
  handleInput({ value, prop }: eventCallbackParams) {
    const isDiff = this.checkDiffByProp({ value, prop })
    this.setValueByProp(value, prop)
    this.$nextTick(() => {
      if (isDiff) {
        this.change()
      }
    })
  }

  checkDiffByProp({ value, prop }: eventCallbackParams): boolean {
    return this.data[prop] !== value
  }

  checkFormDom(): any {
    const form: any = this.$refs
    if (!form) {
      throw new Error('Form 组件未挂载，无法调用该方法')
    }
    return form
  }

  validate(): Promise<boolean> {
    const form: any = this.checkFormDom()
    return new Promise((resolve, reject) => {
      if (!form) reject(false)
      form.validate((valid: Boolean) => {
        if (valid) {
          resolve(true)
        } else {
          reject(false)
        }
      })
    })
  }

  resetForm(): boolean {
    const form: any = this.checkFormDom()
    if (!form) return false
    form.resetFields()
    return true
  }

  validateField(props?: string[]): boolean {
    const form: any = this.checkFormDom()
    if (!form) return false
    form.validateField(props || undefined)
    return true
  }

  clearValidate(props?: string[]): boolean {
    const form: any = this.checkFormDom()
    if (!form) return false
    form.clearValidate(props || undefined)
    return true
  }
}
</script>

<style lang='scss'>
.easy_form {}
</style>
