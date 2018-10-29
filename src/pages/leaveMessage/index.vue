<template>
  <div class="leaveMessage">
    <p class="el-icon-star-off">留言列表</p>
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
          prop="messageTitle"
          label="留言标题">
        </el-table-column>
        <el-table-column
          prop="createdUser"
          label="留言人">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="留言时间">
          <template slot-scope="scope">
            <span> {{ scope.row.createTime | format('yyyy-MM-dd hh:mm') }} </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="instructions"
          label="留言内容"
          width="300">
          <template slot-scope="scope">
            <div>
              {{ scope.row.instructions.length > 20 ?  scope.row.instructions.slice(0, 20) + '....' : scope.row.instructions}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          label="编辑">
          <template slot-scope="scope">
            <div class="editor">
              <el-button size="small" type="primary" @click="viewDetails(scope.row)" >查看详情</el-button>
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
        :page-size="pageSize"
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
          <li><span>留言标题：<i>{{ detail.messageTitle }}</i></span><span>留言人：<i>{{ detail.createdUser }}</i></span></li>
          <li><span>留言内容：</span><p>{{ detail.instructions }}</p></li>
          <li class="createTime"><span>留言时间：<i>{{ detail.createTime | format('yyyy-MM-dd hh:mm') }}</i></span></li>
        </ul>
      </div>
      <div class="addTagsBody">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang='ts'>

import { Component, Vue } from 'vue-property-decorator'

interface messgae {
  messageTitle?: string,
  id?: number,
  createdUser?: string,
  createTime?: number,
  instructions?: string
}

@Component
export default class leaveMessage extends Vue {

  private messgae: messgae[] = [
    {messageTitle: 'javaScript', id: 1, createdUser: 'user', createTime: 1526909000843, instructions: '这个blog 分享的问题很棒 十分的陶冶情操 让我学习到不少的代码只是创建人很帅'},
    {messageTitle: 'java8', id: 2, createdUser: 'qzuser', createTime: 1526909000843, instructions: 'java 文章'}
  ]

  private viewDetail: boolean = false

  private pageSize: number = 10

  private totalPage:number = 20

  private detail: messgae = {}

  private viewDetails (data: messgae): void {
    this.detail = data
    this.viewDetail = true
  }

  private handleCurrentChange (val: number): void {
  }

  private deleteTable (data: messgae):void {
    this.$confirm(`<string style='color:red; font-size:20px;' >该留言是否违反规定？是否确定删除？</string>`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      dangerouslyUseHTMLString: true
    }).then(() => {
      this.messgae.forEach((item, index) => {
        if (item.id === data.id) {
          this.messgae.splice(index, 1)
        }
      })
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success'
      })
    }).catch(() => {
      this.$notify.info({
        title: '提示',
        message: '已取消删除'
      })
    })
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
    &::after {
      margin-top: 5px;
      content: " ";
      display: block;
      width: 110px;
      height: 2px;
      background-color: $border;
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
