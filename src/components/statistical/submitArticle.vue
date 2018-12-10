<template>
  <div class="submitArticle">
    <p><img src="@/assets/image/browse.png">最近发布的文章</p>
      <el-table
        v-loading='loading'
        :data="articleList"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <ul class="details">
              <li><span>文章副标题：</span>{{ props.row.articleMin }}</li>
              <li><span>文章标签：</span>{{ props.row.articleTag }}</li>
              <li><span>文章浏览量：</span>{{ props.row.readArticleNumber }}</li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column
          label="文章标题"
          prop="title">
          <template slot-scope="props">
            {{ props.row.articleTitle.length > 15 ? props.row.articleTitle.slice(0,15) + '...' : props.row.articleTitle }}
          </template>
        </el-table-column>
        <el-table-column
          label="发布人"
          prop="articleCreateUser">
        </el-table-column>
        <el-table-column
          label="所属分类"
          prop="articleClassification">
        </el-table-column>
        <el-table-column
          label="文章状态"
          prop="state">
          <template slot-scope="scope">
            <span> {{ scope.row.state === 1 ? '公开' : '私密' }} </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type='success' size="small" @click="viewArticle(scope.row.id)">查看 / 编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'hotArticle'
})
export default class submitInfo extends Vue {
  private articleList = []

  private loading = false

  private async mounted () {
    this.loading = true
    await this.$store.dispatch('article/getArticleList', {
      pageNo: 1,
      pageSize: 4,
    })
    this.articleList = this.$store.state.article.articleList
    this.loading = false
  }

  // 查看/编辑文章
  private viewArticle (item: number) {
    this.$router.push({
      path: '/editorAricle',
      query: {
        id: item.toString()
      }
    })
  }
}

</script>
<style lang='scss' scoped>
.submitArticle {
  width: 100%;
  height: 460px;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  p {
    z-index: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 25px;
      margin-right: 5px;
    }
  }
  .details {
    li {
      line-height: 2;
    }
  }
}
</style>
