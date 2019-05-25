<template>
  <div class='m-pagination'>
    <pagination
      :currentPage.sync="currentPage"
      :pageSize.sync="pageSize"
    />
  </div>
</template>

<script lang='ts'>
import Pagination from '@packages/Pagination'
import { merge } from '@packages/utils'

import { Component, Vue } from 'vue-property-decorator'

const obj1 = {
  a: '1',
  aa: {
    aa1: 'aa1',
    aa2: {
      aa2_1: 'aa2_1'
    }
  },
  z: 1,
  x: [],
  g: () => 1,
  y: undefined
}
const obj2 = {
  b: '2',
  aa: {
    aa3: 'aa3'
  }
}

console.log(merge(obj1, obj2))

@Component({
  components: {
    Pagination
  }
})
export default class Com extends Vue {
  currentPage: number = 1
  pageSize: number = 10
}
</script>

<style lang='scss'>
.m-pagination {}
</style>
