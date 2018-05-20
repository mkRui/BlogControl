<template>
  <div class="tableContent">
    <div class='tableList'>
      <el-table
        :data="articleList"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <ul class="details">
              <li><span>文章说明：</span>{{ props.row.subTitle }}</li>
              <li><span>文章标签：</span>{{ props.row.tag }}</li>
              <li><span>文章浏览量：</span>{{ props.row.views }}</li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column
          label="文章标题"
          prop="title">
          <template slot-scope="props">
            {{ props.row.title.length > 15 ? props.row.title.slice(0,15) + '...' : props.row.title }}
          </template>
        </el-table-column>
        <el-table-column
          label="发布人"
          prop="user">
        </el-table-column>
        <el-table-column
          label="发布时间"
          prop="date">
        </el-table-column>
        <el-table-column
          label="所属标签"
          prop="tag">
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
    <div class='pagination'>
       <el-pagination
        background
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

interface list {
  title: string,
  user: string,
  date: number,
  subTitle: string,
  tag: string,
  views: number
}

@Component
export default class tableList extends Vue {
  private articleList: list[] = [
    {title: 'web前端进阶之路', user: 'qzuser', date: 1526198985076, subTitle: 'html5 + 迎接移动时代', tag: 'web前端', views: 20},
    {title: 'python 与 人工智能', user: 'qzuser', date: 1526198985076, subTitle: 'html5 + 迎接移动时代', tag: 'web前端', views: 20},
    {title: '波士顿机械狗', user: 'qzuser', date: 1526198985076, subTitle: 'html5 + 迎接移动时代', tag: 'web前端', views: 20},
    {title: 'react native', user: 'qzuser', date: 1526198985076, subTitle: 'html5 + 迎接移动时代', tag: 'web前端', views: 20},
    {title: 'react native', user: 'qzuser', date: 1526198985076, subTitle: 'html5 + 迎接移动时代', tag: 'web前端', views: 20}
  ]
  private pageSize: number = 5
  private totalPage: number = 10

  private handleCurrentChange (val: number):void {
    console.log(val)
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
