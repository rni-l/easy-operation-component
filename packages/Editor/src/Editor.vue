<template>
  <div class='easy_editor'>
    <div class="quill-editor" id="editor"></div>
  </div>
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Watch, Emit } from 'vue-property-decorator'
import { EasyEditorOptions } from '../../../types/form'
import { inputValue, EventCallbackValue } from '../../../types/common'
import formMixin from '../../mixins/form'
import Quill from 'quill'
// require styles
// import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
import { merge } from '@packages/utils'

interface UploadResult {
  isSuccess: boolean
  result?: string
}

type HandleUpload = (e: HTMLInputElement) => UploadResult

@Component({
  components: {
  }
})
export default class Com extends Mixins(formMixin) {
  @Prop() options!: EasyEditorOptions

  quill: any = ''
  editContainer: Element | null = null

  get curOptions() {
    return merge({
      theme: 'snow',
      // some quill options
      modules: {
        toolbar: [
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          // ['blockquote', 'code-block'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],
          // [{ 'indent': '-1' }, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'font': [] }],
          [{ 'align': [] }],
          // ['clean'],
          ['link', 'image']
        ]
      }
    }, this.options.editorOption) as EasyEditorOptions['editorOption']
  }

  get editor() {
    const dom: any = this.$refs['myQuillEditor']
    return dom.quill
  }

  @Emit()
  change(): EventCallbackValue {
    const value = this.getValue()
    return { value, prop: this.prop || '' }
  }

  mounted() {
    this.quill = new Quill(this.$el.querySelector('#editor'), this.curOptions)
    const toolbar = this.quill.getModule('toolbar')
    toolbar.addHandler('image', this.showImageUI)
    this.editContainer = this.$el.querySelector('.ql-editor')
    if (this.editContainer) {
      this.editContainer.innerHTML = this.options.defaultValue || ''
    }

    this.quill.on('text-change', () => {
      this.change()
    })
  }

  getValue() {
    return this.editContainer && this.editContainer.innerHTML
  }

  setValue(value: string) {
    if (this.editContainer) {
      this.editContainer.innerHTML = value
      this.change()
    }
  }

  // 插入图片
  showImageUI() {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = async () => {
      if (!this.options.handleUpload) return false
      const { isSuccess, result } = await this.options.handleUpload(input)
      if (isSuccess && this.editContainer) {
        this.editContainer.innerHTML = this.editContainer.innerHTML + `<img src='${result}' />`
      }
    }
  }
}
</script>

<style lang='scss'>
.easy_editor {
  .ql-editor {
    min-height: 400px;
  }
}
</style>
