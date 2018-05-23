<template>
  <div class="tagContent">
    <p class="el-icon-star-off">标签列表</p>
    <div class="tagsHeader">
      <el-button type="primary" @click="addTags">新增标签</el-button>
    </div>
    <div class="tagTables">
       <el-table
        :data="tags"
        style="width: 100%"
        stripe
        border>
        <el-table-column
          prop="id"
          label="标签编号"
          width="90">
          <template slot-scope="scope">
            <div style="text-align: center;">
              {{ scope.row.id }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="tagsName"
          label="标签名称">
        </el-table-column>
        <el-table-column
          prop="createdUser"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
          <template slot-scope="scope">
            <span> {{ scope.row.createTime | format('yyyy-MM-dd hh:mm') }} </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="instructions"
          label="创建说明"
          width="300">
        </el-table-column>
        <el-table-column
          width="200"
          label="编辑">
          <template slot-scope="scope">
            <div class="editor">
              <el-button size="small" type="primary" @click="Ueditor(scope.row)" >编辑</el-button>
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
      :visible.sync="ueditorDialog"
      width="400px">
      <header slot="title">
        <span>编辑标签</span>
      </header>
      <div>
        <el-input placeholder="请重新输入标签说明" v-model="tagsExplain"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeTag">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="addTagsView"
      width="400px">
      <header slot="title">
        <span>新增标签</span>
      </header>
      <div class="addTagsBody">
        <el-input placeholder="请输入标签名称" v-model="addtagsName"></el-input>
        <el-input placeholder="请输入标签说明" v-model="addtagsExplain"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addTag">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang='ts'>

import { Component, Vue } from 'vue-property-decorator'

interface tags {
  tagsName?: string,
  id?: number,
  createdUser?: string,
  createTime?: number,
  instructions?: string
}

@Component
export default class tegContent extends Vue {
  private tags: tags[] = [
    {tagsName: 'javaScript', id: 1, createdUser: 'user', createTime: 1526909000843, instructions: 'js 创建文章'},
    {tagsName: 'java8', id: 2, createdUser: 'qzuser', createTime: 1526909000843, instructions: 'java 文章'}
  ]

  private ueditorDialog: boolean = false

  private tagsExplain: string = ''

  private UeditorDate: tags = {}

  private pageSize: number = 10

  private totalPage:number = 20

  private addTagsView: boolean = false

  private addtagsName: string = ''

  private addtagsExplain: string = ''

  private addTags (): void {
    this.addTagsView = true
  }

  private addTag (): void {
    this.tags.push({
      tagsName: this.addtagsName,
      id: 3,
      createdUser: 'qzuser',
      createTime: new Date().getTime(),
      instructions: this.addtagsExplain
    })
    this.addTagsView = false
    this.addtagsName = ''
    this.addtagsExplain = ''
  }

  private Ueditor (data: object): void {
    this.ueditorDialog = true
    this.UeditorDate = data
  }

  private changeTag (): void {
    this.UeditorDate.instructions = this.tagsExplain
    this.ueditorDialog = false
  }

  private handleCurrentChange (val: number): void {
    console.log(val)
  }

  private deleteTable (data: tags):void {
    this.$confirm(`<string style='color:red; font-size:20px;' >是否确定删除该标签？</string>`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      dangerouslyUseHTMLString: true
    }).then(() => {
      this.tags.forEach((item, index) => {
        if (item.id === data.id) {
          this.tags.splice(index, 1)
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
.tagContent {
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
    margin-bottom: 20px;
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
  .tagsHeader {
    width: 100%;
    padding: 15px;
    background: #fff;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  .addTagsBody {
    div:nth-child(1) {
      margin-bottom: 20px;
    }
  }
  .tagTables {
    width: 100%;
    padding: 20px;
    border-radius: 5px;
    background: #fff;
  }
  .editor {
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .pege {
    display: flex;
    justify-content: flex-end;
    padding: 20px 0px;
  }
}
</style>
