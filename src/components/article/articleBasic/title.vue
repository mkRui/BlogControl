<template>
  <div class="titleArt">
    <p>标题选项</p>
    <el-form :model="titleForm" ref="titleFrom" :rules="titleRules">
      <el-form-item prop="title">
        <el-input v-model="titleForm.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item prop="minTitle">
        <el-input v-model="titleForm.minTitle" type='textarea' placeholder="请输入文章副标题"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { ArticleDetail } from '@/store/module/article'

interface titleList {
  title: string,
  minTitle: string
}

@Component({
  name: 'articleTitle'
})
export default class ArticleTitle extends Vue {
  private titleForm: titleList = {
    title: '',
    minTitle: ''
  }

  private titleRules: any = {
    title: [
      { required: true, message: '请输入文章标题', trigger: 'blur' }
    ],
    minTitle: [
      { required: true, message: '请输入文章副标题', trigger: 'blur' }
    ]
  }

  @Prop()
  private detail: ArticleDetail

  @Watch('titleForm', { deep: true })
  private titlForm (text: object) {
    this.$emit('title', text)
  }

  @Watch('detail', { immediate: true })
  private updateDetail () {
    if (JSON.stringify(this.detail) !== '{}') {
      this.titleForm = {
        title: this.detail.title,
        minTitle: this.detail.titleMin
      }
    }
  }

}
</script>
<style lang='scss'>
.titleArt {
  width: 100%;
  > p {
    color: $border;
    margin-bottom: 10px;
    font-size: 16px;
  }
  .el-textarea__inner {
    height: 100px;
  }
}
</style>
