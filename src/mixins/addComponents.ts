import { Component, Vue } from 'vue-property-decorator'
import USelect from '@packages/element-ui/Select'
import UInput from '@packages/element-ui/Input'
import UInputNumber from '@packages/element-ui/InputNumber'
import URadio from '@packages/element-ui/Radio'
import UCheckbox from '@packages/element-ui/Checkbox'
import UDate from '@packages/element-ui/Date'
import UCascader from '@packages/element-ui/Cascader'
import USwitch from '@packages/element-ui/Switch'
import USlider from '@packages/element-ui/Slider'
import URate from '@packages/element-ui/Rate'
import UColorPicker from '@packages/element-ui/ColorPicker'
import UTransfer from '@packages/element-ui/Transfer'
import { ComponentsMap } from '../../types/common'

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
export default class From extends Vue {
  ComponentsMap: ComponentsMap = {
    cascader: UCascader,
    checkbox: UCheckbox,
    colorPicker: UColorPicker,
    date: UDate,
    input: UInput,
    inputNumber: UInputNumber,
    rate: URate,
    radio: URadio,
    select: USelect,
    switch: USwitch,
    slider: USlider,
    transfer: UTransfer
  }
}
