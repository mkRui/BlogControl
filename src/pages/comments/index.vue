<template>
  <div class="comments">
    <p class="iconfont blog-vertical">评论列表</p>

    <!-- table 主体 -->
    <div class="leave" v-loading='loading'>
      <!-- select -->
      <div class="header">
          <el-select
            v-model="articleTitle"
            filterable
            remote
            clearable
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            @change="changeSearch">
              <el-option
              v-for="(item, index) in articleList"
              :key="index"
              :label="item.articleTitle"
              :value='item.id'>
                {{ item.articleTitle }}
              </el-option>
          </el-select>
      </div>

      <!-- table -->
      <el-table
        :data="message"
        style="width: 100%"
        stripe
        border>
        <el-table-column
          prop="id"
          label="评论编号"
          width="90">
          <template slot-scope="scope">
            <div style="text-align: center;">
              {{ scope.row.id }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="commentsArticle"
          label="评论文章">
        </el-table-column>
        <el-table-column
          prop="commentsUser"
          label="评论人">
        </el-table-column>
        <el-table-column
          prop="commentMinUser"
          label="被评论人">
          <template slot-scope="scope">
            <div :style="{'text-align': scope.row.commentsUserMin ? '' : 'center'}">
              {{ scope.row.commentsUserMin ? scope.row.commentsUserMin : '---' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="commentsTime"
          label="评论时间">
        </el-table-column>
        <el-table-column
          prop="instructions"
          label="评论内容"
          width="250">
          <template slot-scope="scope">
            <div>
              {{
                scope.row.commentsContent.length > 20 ?
                scope.row.commentsContent.slice(0, 20) + '....' :
                scope.row.commentsContent
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="300"
          label="编辑">
          <template slot-scope="scope">
            <div class="editor">
              <el-button size="small" type="success" @click="commentState(scope.row, 1)" >回复评论</el-button>
              <el-button size="small" type="primary" @click="commentState(scope.row, 0)" >查看详情</el-button>
              <el-button size="small" type="danger" @click="deleteTable(scope.row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <!-- 分页 -->
    <div class="pege">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :page-size="10"
        :current-page="pageNo"
        layout="prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </div>

    <!--详情弹出-->
    <el-dialog
      title="详情信息"
      :visible.sync="viewDetail"
      width="450px">
      <detail-comment :detail='detail'></detail-comment>
    </el-dialog>

    <!-- 恢复弹出 -->
    <el-dialog
      title="回复评论"
      :visible.sync="replyComment"
      width="400px">
      <add-comment @save='save'></add-comment>
    </el-dialog>

  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import addComment from '@/components/comments/addComments.vue'
import detailComment from '@/components/comments/detailComments.vue'
import { CommentsList } from '@/store/module/comments'
 
@Component({
  name: 'comments',
  components: {
    addComment,
    detailComment
  }
})
export default class Comments extends Vue {

  private message = []

  private viewDetail: boolean = false

  private replyComment: boolean = false

  private loading = false

  private articleTitle = ''

  private articleList = ''

  private get totalPage () {
    return this.$store.state.comments.totalPage
  }

  private get pageNo () {
    return this.$store.state.comments.pageNo
  }

  private get user () {
    return this.$store.state.user
  }

  private detail: CommentsList = JSON.parse('{}')

  // 评论弹出
  private commentState (data: CommentsList, state: number): void {
    this.detail = data
    if (state) {
      this.replyComment = true
    } else {
      this.viewDetail = true
    }
  }

  // 分页
  private handleCurrentChange (val: number): void {
    this.switchPage(val, this.articleTitle)
  }

  // 搜索
  private changeSearch () {
    this.switchPage(1, this.articleTitle)
  }

  private save (item: { content: string }) {
    setTimeout(async () => {
      let comments
      if (this.detail.commentsParentid) {
        comments = {
          parentId: this.detail.commentsParentid,
          commentUser: this.user.nickName,
          content: item.content,
          articleId: this.detail.commentsArticleId,
          commentMinUser: this.detail.commentsUser,
          article: this.detail.commentsArticle
        }
      } else {
        comments = {
          parentId: this.detail.id,
          commentUser: this.user.nickName,
          content: item.content,
          articleId: this.detail.commentsArticleId,
          commentMinUser: this.detail.commentsUser,
          article: this.detail.commentsArticle
        }
      }
      const res = await this.$store.dispatch('comments/addComments', comments)
      if (!res) {
        this.replyComment = false
      }
      this.switchPage(this.pageNo, this.articleTitle)
    }, 200)
  }

  private deleteTable (data: number):void {
    this.$confirm(`<string style='color:red; font-size:16px;' >该留言是否违反规定？是否确定删除？</string>`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      dangerouslyUseHTMLString: true
    }).then(async () => {
      await this.$store.dispatch('comments/delComments', {
        id: data
      })
      this.switchPage(this.pageNo, this.articleTitle)
    })
  }

  // 加载文章列表
  private async remoteMethod (query: string) {
    await this.$store.dispatch('common/getAllArticle', {
      articleTitle: query
    })
    this.articleList = this.$store.state.common.articleList
  }

  // 初始化列表
  private async switchPage (page: number, id = '') {
    this.loading = true
    await this.$store.dispatch('comments/getCommentsList', {
      articleId: id,
      pageNo: page,
      pageSize: 10
    })
    this.message = this.$store.state.comments.commentsList
    this.loading = false
  }

  private mounted () {
    this.switchPage(1)
    this.remoteMethod('')
  }

}

</script>
<style lang='scss'>
.comments {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  min-width: 1100px;
  overflow: auto;
  > P {
  width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    padding-bottom: 20px;
    margin-bottom: 10px;
    color: $border;
    &::before {
      margin-right: 5px;
    }
  }
  .editor {
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .leave {
    width: 100%;
    padding: 20px;
    margin-top: 10px;
    background: #fff;
    border-radius: 5px;
    > .header {
      margin-bottom: 20px;
      input {
        background: transparent;
      }
    }  
  }

  .pege {
    display: flex;
    justify-content: flex-end;
    padding: 20px 0px;
  }
}
</style>
