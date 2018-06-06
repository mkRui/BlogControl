<template>
  <div class="ts-Ueditor">
    <div class="titleHeader">
      <title-art @title='titleForm'></title-art>
    </div>
    <div class="options">
      <screening @state='stateSubmit' @option='option'></screening>
      <uploader></uploader>
    </div>
    <div class="editorContent">
      <markdown-editor v-model="ueditor" ref="VueUeditor" preview-class="markdown-body" :highlight="true"></markdown-editor>
    </div>
   <div class="submit">
     <el-button type="primary" @click="submit" >发布</el-button>
   </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator'
import markdownEditor from 'vue-simplemde/src/markdown-editor.vue'
import titleArt from './components/title.vue'
import screening from './components/screening.vue'
import uploader from './components/uploader.vue'

@Component({
  components: {
    markdownEditor,
    titleArt,
    screening,
    uploader
  }
})

export default class TheEditor extends Vue {
  private ueditor: string = ''

  private handleInput () {
    console.log(1)
  }

  private mounted ():void {
    console.log(1)
  }

  private titleForm (text: object): void {
    console.log(text)
  }

  private stateSubmit (text: object): void {
    console.log(text)
  }

  private option (text: object): void {
    console.log(text)
  }

  private submit (): void {
    console.log(1)
    console.log(this.$refs.VueUeditor)
  }

  @Watch('ueditor')
  ueditorText (val: string) {
    console.log(val)
  }
}

</script>
<style lang='scss' scoped>
.ts-Ueditor {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  min-width: 1100px;
  overflow: auto;
  .titleHeader {
    background: #fff;
    padding: 20px 20px 5px 20px;
    width: 100%;
    margin-bottom: 20px;
    border-radius: 5px;
  }
  .editorContent {
    width: 100%;
  }
  .options {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .submit {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
