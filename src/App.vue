<template>
  <div id="app">
    <transition name='van-fade'>
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import { config } from '@/config'

@Component({
  components: {
  }
})
export default class App extends Vue {
  created() {
    // 测试代码
  }
}
</script>

<style lang="scss">
</style>
