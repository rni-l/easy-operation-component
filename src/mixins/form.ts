import { Component, Vue } from 'vue-property-decorator'
import { formConfig } from '@/config/common'

@Component
export default class From extends Vue {
  mixinConfig = {
    componentSize: formConfig.componentSize
  }
}
