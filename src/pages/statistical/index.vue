<template>
  <div class="statisticalMain">
    <info-head></info-head>
    <div class="articleContent clearfix">
      <div class="leftArticle">
        <article-list></article-list>
        <submit-article></submit-article>
      </div>
      <div class="rightArticle">
        <blog-admin></blog-admin>
        <active-pie></active-pie>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

// 头部结构
import infoHead from '@/components/statistical/headers.vue'

// 文章发部数
import articleList from '@/components/statistical/articleList.vue'

// 文章活跃度
import activePie from '@/components/statistical/active.vue'

// 最近文章发布
import submitArticle from '@/components/statistical/submitArticle.vue'

// 管理员列表
import blogAdmin from '@/components/statistical/blogUser.vue'

@Component({
  components: {
    infoHead,
    articleList,
    activePie,
    submitArticle,
    blogAdmin
  },
})
export default class statistical extends Vue {
}
</script>
<style scoped lang='scss'> 
.statisticalMain {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  .articleContent {
    width: 100%;
    display: flex;
    .leftArticle {
      width: 55%;
      margin-right: 1.5%;
    }
    .rightArticle {
      width: 43.5%;
    }
  }
}
</style>
