import EasyTable from './Table'
import EasyForm from './Form'
import EasyCascader from './element-ui/Cascader'
import EasyCheckbox from './element-ui/Checkbox'
import EasyColorPicker from './element-ui/ColorPicker'
import EasyDate from './element-ui/Date'
import EasyInput from './element-ui/Input'
import EasyInputNumber from './element-ui/InputNumber'
import EasyRadio from './element-ui/Radio'
import EasyRate from './element-ui/Rate'
import EasySelect from './element-ui/Select'
import EasySlider from './element-ui/Slider'
import EasySwitch from './element-ui/Switch'
import EasyTransfer from './element-ui/Transfer'

const components = [
  EasyTable, EasyForm, EasyCascader, EasyCheckbox, EasyColorPicker, EasyDate, EasyInput, EasyInputNumber, EasyRadio, EasyRate, EasySelect, EasySlider, EasySwitch, EasyTransfer
]
const install = function (Vue: any, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  EasyTable,
  EasyForm,
  EasyCascader,
  EasyCheckbox,
  EasyColorPicker,
  EasyDate,
  EasyInput,
  EasyInputNumber,
  EasyRadio,
  EasyRate,
  EasySelect,
  EasySlider,
  EasySwitch,
  EasyTransfer
}
