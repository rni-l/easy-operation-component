<template>
  <div class='m-combination'>
    <combination
    >
    </combination>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import Combination from '@packages/Combination'

@Component({
  components: {
    Combination
  }
})
export default class Com extends Vue {
}
</script>

<style lang='scss'>
.m-combination {}
</style>
