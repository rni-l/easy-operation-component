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
import { componentsMap } from '@/types/common'

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
  componentsMap: componentsMap = {
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
