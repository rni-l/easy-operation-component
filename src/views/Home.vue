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

    <wrap-demo title='switch'>
      <h3>普通用法</h3>
      <u-switch :options='switchOption' @change='change' />
      <h3>判断限制，通过</h3>
      <u-switch :options='switchOption1' @change='change' />
      <h3>判断限制，拒绝</h3>
      <u-switch :options='switchOption2' @change='change' />
    </wrap-demo>

    <wrap-demo title='slider'>
      <u-slider :options='sliderOption' @change='change' />
    </wrap-demo>

    <wrap-demo title='rate'>
      <u-rate :options='rateOption' @change='change' />
    </wrap-demo>

    <wrap-demo title='colorPicker'>
      <u-color-picker :options='colorPickerOption' @change='change' />
    </wrap-demo>

    <wrap-demo title='transfer'>
      <u-transfer :options='transferOption' :data='transferData' @change='change' />
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
import USwitch from '@/components/element-ui/Switch'
import USlider from '@/components/element-ui/Slider'
import URate from '@/components/element-ui/Rate'
import UColorPicker from '@/components/element-ui/ColorPicker'
import UTransfer from '@/components/element-ui/Transfer'
import { listData, cascaderList, transferData } from '@/mock/listData'
import { ReturnCommonData } from '@/types/common'

@Component({
  components: {
    USelect,
    UInput,
    URadio,
    UCheckbox,
    UInputNumber,
    UDate,
    UCascader,
    USwitch,
    USlider,
    URate,
    UColorPicker,
    UTransfer
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
  switchOption = {
    defaultValue: false
  }
  switchOption1 = {
    defaultValue: false,
    checkIfSwitch: this.checkIfSwitch
  }
  switchOption2 = {
    defaultValue: false,
    checkIfSwitch: this.checkIfSwitch1
  }
  sliderOption = {
    defaultValue: 20,
    min: 0,
    max: 100
  }
  rateOption = {
    defaultValue: 1
  }
  colorPickerOption = {
    defaultValue: 'red'
  }
  transferData = transferData
  transferOption = {
    defaultValue: [transferData[0].value]
  }

  mounted() {
  }

  change(value: any) {
    console.log(value)
  }

  blur() {
    console.log('blur')
  }

  checkIfSwitch() {
    return Promise.resolve()
  }

  checkIfSwitch1() {
    return Promise.reject(new Error())
  }
}
</script>

<style lang='scss'>
.m_home {}
</style>
