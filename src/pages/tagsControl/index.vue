<template>
  <div class="tagContent">
    <p class="iconfont blog-vertical">标签列表</p>
    <div class="tagsHeader">
      <el-button type="primary" @click="addTags(1)">新增标签</el-button>
      <el-button type="primary" @click="addTags(0)">新增分类</el-button>
    </div>

    <!-- 列表 -->
    <div class="tagTables" v-loading='loading'>
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
          prop="tagTitle"
          label="标签名称">
        </el-table-column>
        <el-table-column
          prop="tagType"
          label="类型">
          <template slot-scope="scope">
            <div>
              {{ scope.row.tagType === 1 ? '标签' : '分类' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="tagCreateUser"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="tagInstructions"
          label="创建说明"
          width="300">
        </el-table-column>
        <el-table-column
          width="200"
          label="编辑">
          <template slot-scope="scope">
            <div class="editor">
              <el-button size="small" type="primary" @click="editTag(scope.row.id)" >编辑</el-button>
              <el-button size="small" type="danger" @click="deleTag(scope.row.id)">删除</el-button>
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

    <!-- 弹出框 -->
    <el-dialog
      v-loading='addLoading'
      :visible.sync="addTagsView"
      width="400px">
      <header slot="title">
        <span>{{ types ? '新增标签' : '新增分类'}}</span>
      </header>
      <tagForm @save='save' ref="tagForm"></tagForm>
    </el-dialog>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import tagForm, { TagList } from '@/components/tag/addTag.vue'

interface tags {
  createTime: string
  id: number
  tagCreateUser: string
  tagInstructions: string
  tagTitle: string
  tagType: number
}

@Component({
  name: 'tegContent',
  components: {
    tagForm
  }
})
export default class TegContent extends Vue {
  public $refs: {
    tagForm: tagForm
  }

  private tags: tags[] = []

  private get totalPage () {
    return this.$store.state.tag.total
  }

  private get pageNo () {
    return this.$store.state.tag.pageNo
  }

  private loading = false

  private addLoading = false

  private addTagsView: boolean = false

  private types: number | string = ''

  private addTags (item: number): void {
    this.types = item
    this.addTagsView = true
  }

  // 切换分页
  private handleCurrentChange (val: number): void {
    this.switchPage(val)
  }

  // 保存/新增
  private async save (item: TagList) {
    this.addLoading = true
    const res = await this.$store.dispatch('tag/addTag', {
      ...item,
      tagType: this.types
    })
    if (!res) {
      this.$refs.tagForm.cancel()
      this.addTagsView = false
    }
    this.switchPage(this.pageNo)
    this.addLoading = false
  }

  // 删除标签
  private deleTag (item: number) {
    this.$confirm(`<string style='color:red; font-size:16px;' >是否确定删除该标签？此数据将不做保存</string>`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      dangerouslyUseHTMLString: true
    }).then(async () => {
      await this.$store.dispatch('tag/delTag', {
        id: item
      })
      this.switchPage(this.pageNo)
    })
  }

  // 编辑
  private editTag (item: number) {
    this.$prompt('请输入标签说明', '编辑', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }).then(async ({ value }) => {
      await this.$store.dispatch('tag/editTag', {
        id: item,
        instructions: value
      })
      this.switchPage(this.pageNo)
    })
  }
  
  // 初始化分页列表
  private async switchPage (page: number) {
    this.loading = true
    await this.$store.dispatch('tag/getAllTag', {
      pageNo: page,
      pageSize: 10,
    })
    this.tags = this.$store.state.tag.tagList
    this.loading = false
  }

  private async mounted () {
    this.switchPage(1)
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
    margin-bottom: 10px;
    color: $border;
    &::before {
      margin-right: 5px;
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
