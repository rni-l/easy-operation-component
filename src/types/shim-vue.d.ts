import Vue from 'vue'
import EasyEventbus from 'easy-eventbus'

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue/types/vue' {
  interface Vue {
    $isPc: boolean
    $observer: EasyEventbus
  }
}
