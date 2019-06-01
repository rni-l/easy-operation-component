<template>
  <div class='m_editor'>
    <editor content="sdf" :handleUpload="handleUpload" />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import Editor from '@packages/Editor'
import axios from 'axios'

@Component({
  components: {
    Editor
  }
})
export default class Com extends Vue {
  async handleUpload(e: HTMLInputElement) {
    const { token, action, bucketUrl } = await this.getToken()
    const files = e.files
    if (!files) return { isSuccess: false }
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('token', token)
    formData.append('key', files[0].name + ('' + new Date().getTime()))
    const { data } = await axios({
      method: 'POST',
      url: action,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
    return {
      isSuccess: true,
      result: `${bucketUrl}/${data.key}`
    }
  }

  async getToken(): Promise<any> {
    const { data } = await axios({
      method: 'GET',
      url: 'http://localhost:1234/api/qiniu/getToken'
    })
    return data.data
  }
}
</script>

<style lang='scss'>
.m_editor {}
</style>
