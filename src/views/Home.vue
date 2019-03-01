<template>
  <div class='m_home'>
    <wrap-demo title='下拉框'>
      <u-select v-bind='selectOption' :data='list' :options='selectOption' ref='select'
      />
    </wrap-demo>

    <wrap-demo title='input'>
      <u-input :options='inputOption' @input='change' @blur='blur' />
    </wrap-demo>

    <wrap-demo title='inputNumber'>
      <u-input-number :options='inputNumberOption' @change='change' @blur='blur' />
    </wrap-demo>

    <wrap-demo title='radio'>
      <u-radio :options='radioOption' :data='list' @change='change' />
    </wrap-demo>

    <wrap-demo title='checkbox'>
      <u-checkbox :options='checkboxOption' :data='list' @change='change' />
    </wrap-demo>

    <wrap-demo title='date'>
      <u-date :options='dateOption' @change='change' />
      <u-date :options='dateOption1' @change='change' />
      <u-date :options='dateOption2' @change='change' />
    </wrap-demo>

    <wrap-demo title='cascader'>
      <u-cascader :options='cascaderOption' :data='cascaderList' @change='change' />
    </wrap-demo>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import USelect from '@/components/element-ui/Select'
import UInput from '@/components/element-ui/Input'
import UInputNumber from '@/components/element-ui/InputNumber'
import URadio from '@/components/element-ui/Radio'
import UCheckbox from '@/components/element-ui/Checkbox'
import UDate from '@/components/element-ui/Date'
import UCascader from '@/components/element-ui/Cascader'
import { listData, cascaderList } from '@/mock/listData'
import { ReturnCommonData } from '@/types/common'

@Component({
  components: {
    USelect,
    UInput,
    URadio,
    UCheckbox,
    UInputNumber,
    UDate,
    UCascader
  }
})
export default class Home extends Vue {
  // data
  list = JSON.parse(JSON.stringify(listData))
  cascaderList = cascaderList
  selectOption = {
    defaultValue: listData[0].value
  }
  inputOption = {
    defaultValue: 'hah',
    type: 'text',
    disabled: false
  }
  inputNumberOption = {
    defaultValue: 1,
    disabled: false
  }
  radioOption = {
    defaultValue: listData[0].value
  }
  checkboxOption = {
    defaultValue: [listData[0].label]
  }
  dateOption = {
    defaultValue: new Date()
  }
  dateOption1 = {
    defaultValue: '01:30',
    componentType: 'time',
    pickerOptions: {
      start: '01:30',
      step: '00:15',
      end: '18:30'
    }
  }
  dateOption2 = {
    defaultValue: [new Date(), new Date((new Date().getTime() + (864000 * 1000)))],
    type: 'datetimerange'
  }
  cascaderOption = {
    defaultValue: [cascaderList[0].value],
    changeOnSelect: true
  }

  mounted() {
  }

  change(value: any) {
    console.log(value)
  }

  blur() {
    console.log('blur')
  }
}
</script>

<style lang='scss'>
.m_home {}
</style>
