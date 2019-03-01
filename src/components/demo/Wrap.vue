<template>
  <div class='u_demoWrap'>
    <div class="u_demoWrap_title">{{ title }}</div>
    <div class="u_demoWrap_wrap">
      <slot />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class Com extends Vue {
  @Prop(String) title?: ''
}
</script>

<style lang='scss'>
.u_demoWrap {
  padding: 0 10px;
  &_title {
    font-size: 14px;
    color: #333;
    padding: 10px 0;
  }
  &_wrap {}
}
</style>
