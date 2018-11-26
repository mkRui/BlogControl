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
          width='230'
          label="操作">
          <template slot-scope="scope">
            <el-button type='success' size="small">查看</el-button>
            <el-button type='primary' size="small">编辑</el-button>
            <el-button type='danger' size="small">删除</el-button>
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

@Component({
  name: 'articleTable'
})
export default class tableList extends Vue {
  private articleList: Article[] = []

  private get totalPage () {
    return this.$store.state.article.total
  }

  private get pageNo () {
    return this.$store.state.article.pageNo
  }

  private loading = false

  private handleCurrentChange (val: number):void {
  }

  private async switchPage (page: number, search?: any) {
    this.loading = true
    if (search) {
      
    }
    await this.$store.dispatch('article/getArticleList', {
      pageNo: page,
      pageSize: 5
    })
    console.log(this.$store.state.article.articleList)
    this.articleList = this.$store.state.article.articleList
    this.loading = false
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
