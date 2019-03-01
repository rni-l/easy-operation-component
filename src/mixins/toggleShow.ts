import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Com extends Vue {
  @Prop(Boolean) isShow!: boolean
  curIsShow: boolean = this.isShow

  @Watch('isShow')
  onIsShow() {
    this.curIsShow = this.isShow
  }

  @Watch('curIsShow')
  oncurIsShow() {
    this.$emit('update:isShow', this.curIsShow)
  }
}
