<template>
  <div class='easy_date'>
    <!-- time-select -->
    <el-time-select
      v-if="options.componentType === 'time'"
      v-model="value"
      v-bind='options'
      :size="options.size || mixinConfig.componentSize"
      @change='change'
    >
    </el-time-select>
    <!-- date-select -->
    <el-date-picker
      v-else
      v-model="value"
      v-bind='options'
      :format='defaultFormat'
      :valueFormat='defaultValueFormat'
      :size="options.size || mixinConfig.componentSize"
      @change='change'
    >
      <template slot='range-separator'>
        <slot name='range-separator' />
      </template>
    </el-date-picker>
  </div>
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Emit } from 'vue-property-decorator'
import { easyDateOptions } from '@/types/form'
import { dateComponentValue } from '@/types/common'
import { componentConfig } from '@/config/common'
import formMixin from '@/mixins/form'

@Component({
  components: {}
})
export default class DateCom extends Mixins(formMixin) {
  @Prop() options!: easyDateOptions

  value: dateComponentValue = this.options.defaultValue || ''
  defaultFormat = componentConfig.dateFormat
  defaultValueFormat = componentConfig.dateValueFormat

  created() {
  }

  @Emit()
  change(): dateComponentValue {
    return this.value
  }

  setValue(value: dateComponentValue) {
    this.value = value
  }
}
</script>

<style lang='scss'>
.easy_date {}
</style>
