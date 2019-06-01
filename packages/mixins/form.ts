import { Component, Vue, Prop } from 'vue-property-decorator'
import { formConfig } from '@/config/common'

@Component
export default class From extends Vue {
  @Prop() prop?: string
  mixinConfig = {
    componentSize: formConfig.componentSize
  }
}
