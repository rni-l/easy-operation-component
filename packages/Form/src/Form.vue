<template>
  <el-form class='easy_form'
    :model='data' :rules='getRules'
    :inline="curOptions.inline || false"
    :labelPosition="curOptions.labelPosition || 'right'"
    :labelWidth="curOptions.labelWidth || ''"
    :labelSuffix="curOptions.labelSuffix || ''"
    :hideRequired="curOptions.hideRequired || false"
    :showMessage="curOptions.showMessage"
    :inlineMessage="curOptions.inlineMessage || false"
    :statusIcon="curOptions.statusIcon || false"
    :validateOnRuleChange="curOptions.validateOnRuleChange"
    :size="curOptions.size || mixinConfig.componentSize"
    :disabled="curOptions.disabled || false"
    ref="form"
    @validate='handleValidate'
  >
    <el-form-item v-for='item in curOptions.columns'
      :key="item.prop"
      :prop='item.prop'
      :label="item.label || ''"
      :required="item.required || false"
      :error="item.error || ''"
      :showMessage="item.showMessage || true"
      :inlineMessage="item.inlineMessage || false"
      :size="item.size || ''"
    >
      <component
        v-if="!item.slot"
        :is='getComponentByType(item)'
        :ref="item.prop"
        :options='item.options || {}'
        :data='item.data'
        :prop='item.prop'
        @input='handleInput'
        @change="handleChange"
      />

      <slot :name="item.prop" :data="item" v-if="item.slot"></slot>

      <template slot='label' slot-scope='error'>
        <slot name='label' :error='error' />
      </template>
    </el-form-item>

    <el-form-item
      :size="mixinConfig.componentSize"
      v-if="curOptions.isShowBtnGroup"
    >
      <el-button :size="mixinConfig.componentSize" type="primary" @click="search">搜索</el-button>
      <el-button :size="mixinConfig.componentSize" @click="resetSearch">清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Watch, Emit } from 'vue-property-decorator'
import { EasyFormValue, EasyFormItem, EasyFormRules } from '../../../types/easy-form'
import { EasyFormOptions } from '../../../types/form'
import formMixin from '../../mixins/form'
import addComponentsMixin from '../../mixins/addComponents'
import { merge } from '@packages/utils'

interface eventCallbackParams {
  [key: string]: any
  value: any
  prop: string
}

@Component({
  components: {}
})
export default class Com extends Mixins(addComponentsMixin, formMixin) {
  @Prop({ default: () => ({}) }) options!: EasyFormOptions

  data: EasyFormValue = {}

  get curOptions() {
    return merge({
      isShowBtnGroup: true,
      isResetDefaultValue: true
    }, this.options) as EasyFormOptions
  }

  // 将每个 column 里面的 rules 抽出来，封装成 Object 形式
  get getRules() {
    const rules = !this.curOptions.columns
      ? {}
      : this.curOptions.columns.reduce((preValue: EasyFormRules, curValue) => {
        if (curValue.rules) {
          preValue[curValue.prop] = curValue.rules
        }
        return preValue
      }, {})
    return rules
  }

  @Emit('handleValidate')
  handleValidate(prop: EasyFormValue, valid: boolean, error?: string) {
    return { prop, valid, error }
  }

  @Emit('change')
  change() {
    return { data: this.data }
  }

  @Emit('resetSearch')
  resetSearch() {
    if (this.curOptions.isResetDefaultValue) {
      this.resetDefaultValue()
    }
    return this.data
  }

  @Emit('search')
  search() {
    return this.data
  }

  created() {
    this.setDefaultValue()
  }

  /**
   * 获取每个 column 里面的 defaultValue
   */
  setDefaultValue() {
    if (this.curOptions.columns) {
      this.data = this.curOptions.columns.reduce((preValue: EasyFormValue, curValue) => {
        preValue[curValue.prop] = curValue.options ? (curValue.options.defaultValue) : ''
        return preValue
      }, {})
    }
  }

  getComponentByType({ type }: EasyFormItem) {
    if (!type || !this.ComponentsMap[type]) return false
    return this.ComponentsMap[type]
  }

  getValue (): EasyFormValue {
    return this.data
  }

  /**
   * 表单赋值
   * setValue 不会触发 change 事件
   */
  setValue(values: eventCallbackParams | eventCallbackParams[]) {
    if (Array.isArray(values)) {
      values.forEach(v => {
        const com: any = this.$refs[v.prop]
        Array.isArray(com)
          ? (com[0] && com[0].setValue(v.value))
          : com && com.setValue(v.value)
      })
    } else if (values.prop) {
      const com: any = this.$refs[values.prop]
      com[0] && com[0].setValue(values.value)
    }
  }

  /**
   * 根据默认值清空
   */
  resetDefaultValue() {
    // 将当前组件的 data ，根据 defaultValue 设置值
    this.setDefaultValue()
    Object.keys(this.data).forEach(prop => {
      const com: any = this.$refs[prop]
      // 再设置组件的值
      com[0] && com[0].setValue(this.data[prop])
    })
  }

  setValueByProp(value: eventCallbackParams['value'], prop: eventCallbackParams['prop']) {
    this.$set(this.data, prop, value)
    console.log(this.data)
  }

  /**
   * 通过这两个事件订阅，去改变数据
   */
  handleFormComponentChange({ value, prop }: eventCallbackParams) {
    const isDiff = this.checkDiffByProp({ value, prop })
    if (!isDiff) return
    // 当两个值不一样时，触发 change 事件
    this.setValueByProp(value, prop)
    this.$nextTick(() => {
      this.change()
    })
  }

  /**
   * 监听组件的 change 事件
  */
  handleChange({ value, prop }: eventCallbackParams) {
    this.handleFormComponentChange({ value, prop })
  }

  /**
   * 监听组件的 input 事件
  */
  handleInput({ value, prop }: eventCallbackParams) {
    this.handleFormComponentChange({ value, prop })
  }

  checkDiffByProp({ value, prop }: eventCallbackParams): boolean {
    return this.data[prop] !== value
  }

  checkFormDom(): any {
    const form: any = this.$refs['form']
    if (!form) {
      throw new Error('Form 组件未挂载，无法调用该方法')
    }
    return form
  }

  validate(): Promise<boolean> {
    const form: any = this.checkFormDom()
    return new Promise((resolve) => {
      if (!form) resolve(false)
      form.validate((valid: Boolean) => {
        if (valid) {
          resolve(true)
        } else {
          resolve(false)
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
