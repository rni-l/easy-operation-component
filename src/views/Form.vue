<template>
  <div class='m_form'>
    <u-form :options='options1' @change='change' ref='form' @resetSearch="handleResetSearch"
      @search="handleSearch"
    >
      <template slot="sdf">
        <el-input v-model='sdf' @change="handleSdfInput" />
      </template>
    </u-form>
    <el-button @click='set'>设置</el-button>
    <el-button @click='set2'>赋值</el-button>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'
import UForm from '@packages/Form'
import { listData } from '@/mock/listData'
import { EasyFormOptions } from '../../types/form'
import { EasyFormValue } from '../../types/easy-form'

@Component({
  components: {
    UForm
  }
})
export default class FormCom extends Vue {
  options1: EasyFormOptions = {
    inline: false,
    labelPosition: 'left',
    labelWidth: '120px',
    labelSuffix: '',
    hideRequired: false,
    showMessage: true,
    inlineMessage: false,
    statusIcon: false,
    validateOnRuleChange: true,
    disabled: false,
    columns: [
      {
        prop: 'username',
        label: '用户名',
        type: 'editor',
        required: true,
        rules: [
          { type: 'string', required: true, message: '请输入账号', trigger: 'change' }
        ],
        options: {
          handleUpload: this.handleUpload,
          defaultValue: 'hah'
        }
      },
      {
        prop: 'test',
        label: 'input',
        type: 'input',
        required: true,
        rules: [
          { type: 'string', required: true, message: '请输入内容', trigger: 'change' }
        ],
        options: {
          type: 'text',
          defaultValue: '11'
        }
      },
      {
        prop: 'test1',
        label: 'input number',
        type: 'inputNumber',
        required: true,
        options: {
          handleInput: this.inputChange,
          type: 'number',
          min: 10,
          max: 50,
          defaultValue: 11
        }
      },
      {
        prop: 'test2',
        label: 'select',
        type: 'select',
        required: true,
        rules: [],
        data: listData,
        options: {
          defaultValue: listData[0].value
        }
      },
      {
        prop: 'test3',
        label: 'radio',
        type: 'radio',
        required: true,
        rules: [],
        data: listData,
        options: {
          defaultValue: listData[0].value
        }
      },
      {
        prop: 'test4',
        label: 'checkbox',
        type: 'checkbox',
        required: true,
        rules: [],
        data: listData,
        options: {
          defaultValue: []
        }
      },
      {
        prop: 'sdf',
        label: '内容',
        slot: true,
        required: true,
        rules: [
          // { type: 'string', required: true, message: '请输入内容', trigger: 'change' }
        ]
      }
    ]
  }

  sdf = ''

  mounted() {
    const form: any = this.$refs['form']
    console.log(form.data)
  }

  inputChange(value: any) {
    console.log('input:', value)
  }

  async change({ data }: any) {
    console.log('change:', JSON.parse(JSON.stringify(data)))
    const form: any = this.$refs['form']
    const result = await form.validate()
    console.log(result)
  }

  set() {
    const form: any = this.$refs['form']
    form.setValue({ prop: 'test', value: 'hah' })
  }

  set2() {
    const form: any = this.$refs['form']
    form.setValue([
      { prop: 'username', value: 'hah' },
      { prop: 'test3', value: listData[1].value }
    ])
  }

  handleSdfInput(e: any) {
    const form: any = this.$refs['form']
    form.setValueByProp(e, 'sdf')
  }

  handleResetSearch(data: any) {
    console.log('resetSearch:', JSON.parse(JSON.stringify(data)))
  }

  handleSearch(data: any) {
    console.log(data)
  }

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
.m_form {}
</style>
