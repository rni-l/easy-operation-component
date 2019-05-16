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

import { Component, Vue } from 'vue-property-decorator'

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
