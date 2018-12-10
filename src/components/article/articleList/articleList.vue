<template>
  <div class="tableContent">

    <!-- table 主体 -->
    <div class='tableList'>
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
          label="发布时间"
          prop="createTime">
          <template slot-scope="scope">
            <span> {{ scope.row.createTime }} </span>
          </template>
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
          label="文章发布地址"
          prop="state">
          <template slot-scope="scope">
            <span> {{ scope.row.draft === 1 ? '已发布' : '草稿箱' }} </span>
          </template>
        </el-table-column>
        <el-table-column
          width='230'
          label="操作">
          <template slot-scope="scope">
            <el-button type='success' size="small" @click="viewArticle(scope.row.id)">查看 / 编辑</el-button>
            <el-button type='danger' @click="deleArticle(scope.row.id)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- footer 分页 -->
    <div class='pagination'>
       <el-pagination
        background
        @current-change="handleCurrentChange"
        :page-size="10"
        :current-page="pageNo"
        layout="prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { Article } from '@/store/module/article'
import { SearchState } from './articleBasic.vue'

@Component({
  name: 'articleTable'
})
export default class tableList extends Vue {
  private articleList: Article[] = []

  private loading = false

  private searchParma = JSON.parse('{}')

  private get totalPage () {
    return this.$store.state.article.total
  }

  private get pageNo () {
    return this.$store.state.article.pageNo
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

  // 删除文章
  private deleArticle (item: number) {
    this.$confirm(`<string style='color:red; font-size:20px;' >是否确定删除该标签？</string>`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      dangerouslyUseHTMLString: true
    }).then(async () => {
      await this.$store.dispatch('article/delArticle', {
        id: item
      })
      this.switchPage(this.pageNo, this.searchParma)
    })
  }

  // 初始化分页
  public async switchPage (page: number, search?: SearchState) {
    this.loading = true
    if (search) {
      this.searchParma = search
    } else {
      this.searchParma = JSON.parse('{}')
    }
    await this.$store.dispatch('article/getArticleList', {
      pageNo: page,
      pageSize: 5,
      ...this.searchParma
    })
    this.articleList = this.$store.state.article.articleList
    this.loading = false
  }

  // 切换分页
  private handleCurrentChange (val: number):void {
    this.switchPage(val, this.searchParma)
  }

  private mounted () {
    this.switchPage(1)
  }
}

</script>
<style lang='scss' scoped>
.tableContent {
  width: 100%;
  .tableList {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    overflow: auto;
  }
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
  .details {
    li {
      line-height: 2;
      span {
        margin-right: 10px;
      }
    }
  }
}
</style>
