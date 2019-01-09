<template>
  <div class="leaveMessage">
    <p class="iconfont blog-vertical">留言列表</p>
    <div class="leave">
      <el-table
        :data="messgae"
        style="width: 100%"
        stripe
        border>
        <el-table-column
          prop="id"
          label="留言编号"
          width="90">
          <template slot-scope="scope">
            <div style="text-align: center;">
              {{ scope.row.id }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="leaveTitle"
          label="留言标题">
          <template slot-scope="scope">
            {{ scope.row.leaveTitle ? scope.row.leaveTitle : '没有填写' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="leaveUser"
          label="留言人">
          <template slot-scope="scope">
            {{ scope.row.leaveUser ? scope.row.leaveUser : '没有填写' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="leaveTime"
          label="留言时间">
        </el-table-column>
        <el-table-column
          prop="leaveContent"
          label="留言内容"
          width="300">
          <template slot-scope="scope">
            <div>
              {{ scope.row.leaveContent.length > 20 ?  scope.row.leaveContent.slice(0, 20) + '....' : scope.row.leaveContent}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          label="编辑">
          <template slot-scope="scope">
            <div class="editor">
              <el-button size="small" type="primary" @click="viewDetails(scope.row.id)" >查看详情</el-button>
              <el-button size="small" type="danger" @click="deleteTable(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    <el-dialog
      :visible.sync="viewDetail"
      width="450px">
      <header slot="title">
        <span>详情信息</span>
      </header>
      <div class="detailBody">
        <ul>
          <li><span>留言标题：<i>{{ detail.leaveTitle }}</i></span><span>留言人：<i>{{ detail.leaveUser }}</i></span></li>
          <li><span>留言内容：</span><p>{{ detail.leaveContent }}</p></li>
          <li class="createTime"><span>留言时间：<i>{{ detail.leaveTime }}</i></span></li>
        </ul>
      </div>
      <div class="addTagsBody">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { LeaveMsg } from '@/store/module/leave'

@Component
export default class leaveMessage extends Vue {

  private messgae: LeaveMsg[] = []

  private viewDetail: boolean = false

  private loading = false

  private get totalPage () {
    return this.$store.state.leave.total
  }

  private get pageNo () {
    return this.$store.state.leave.pageNo
  }

  private detail: LeaveMsg = JSON.parse('{}')

  private async viewDetails (data: number) {
    // this.detail = data
    await this.$store.dispatch('leave/getLeaveMessage', {
      id: data
    })
    this.detail = this.$store.state.leave.leaveMessage
    this.viewDetail = true
  }

  private handleCurrentChange (val: number): void {
    this.switchPage(val)
  }

  private deleteTable (data: LeaveMsg):void {
    this.$confirm(`<string style='color:red; font-size:16px;' >该留言是否违反规定？是否确定删除？</string>`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      dangerouslyUseHTMLString: true
    }).then(async () => {
      await this.$store.dispatch('leave/delLeaveMessage')
    })
  }

  private async switchPage (page: number) {
    this.loading = true
    await this.$store.dispatch('leave/getLeaveMessageList', {
      pageSize: 10,
      pageNo: page
    })
    this.messgae = this.$store.state.leave.leaveList
    this.loading = false
  }

  private mounted () {
    this.switchPage(1)
  }
}

</script>
<style lang='scss' scoped>
.leaveMessage {
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
  }
  .detailBody {
    width: 100%;
    border: 1px solid $border;
    padding: 15px;
    border-radius: 5px;
    ul {
      li:nth-child(1) {
        margin-bottom: 8px;
        span {
          margin-right: 20px;
        }
      }
      li {
        p {
          margin-top: 5px;
          padding: 2px 8px;
          line-height: 1.8;
        }
      }
      .createTime {
        margin-top: 10px;
        text-align: right;
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
