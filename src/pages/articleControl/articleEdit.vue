<template>
  <div class="ts-Ueditor" v-loading='loading'>
    <div class="titleHeader">
      <title-art @title='titleForm' :detail='articleDetail'></title-art>
    </div>
    <div class="options">
      <screening @state='stateSubmit' @option='option' :detail='articleDetail'></screening>
      <uploader @coverImg="coverImg" :detail='articleDetail'></uploader>
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
import titleArt from '@/components/article/articleBasic/title.vue'
import screening from '@/components/article/articleBasic/screening.vue'
import uploader from '@/components/article/articleBasic/uploader.vue'

@Component({
  name: 'articleEdit',
  components: {
    markdownEditor,
    titleArt,
    screening,
    uploader
  }
})

export default class TheEditor extends Vue {
  private ueditor: string = ''

  private cover = ''

  private title = JSON.parse('{}')

  private optionsState = JSON.parse('{}')

  private stateSub = JSON.parse('{}')

  private loading = false

  private articleDetail = JSON.parse('{}')

  private titleForm (text: object): void {
    this.title = text
  }

  private stateSubmit (text: object): void {
    this.stateSub = text
  }

  private option (text: object): void {
    this.optionsState = text
  }

  private coverImg (item: string) {
    this.cover = item
  }

  private async submit () {
    this.loading = true
    const res = await this.$store.dispatch('article/addArticle', {
      id: JSON.stringify(this.articleDetail) === '{}' ? '' : this.articleDetail.id,
      ...this.title,
      ...this.optionsState,
      ...this.stateSub,
      cover: this.cover ? this.cover : this.articleDetail.cover,
      content: this.ueditor
    })
    if (!res) {
      this.$router.push('/viewAriicle')
    }
    this.loading = false
  }

  private async mounted () {
    if (this.$route.query.id) {
      await this.$store.dispatch('article/viewArticle', {
        id: this.$route.query.id
      })
      this.articleDetail = this.$store.state.article.articleDetail
      this.ueditor = this.articleDetail.content
    }
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
