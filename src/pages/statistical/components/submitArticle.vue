<template>
  <div class="submitArticle">
    <p><img src="@/assets/image/browse.png">最近发布的文章</p>
      <el-table
        :data="articleList"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <ul class="details">
              <li>文章说明：{{ props.row.subTitle }}</li>
              <li>文章标签：{{ props.row.tag }}</li>
              <li>文章浏览量：{{ props.row.views }}</li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column
          label="文章标题"
          prop="title">
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
          label="操作">
          <template slot-scope="scope">
            <el-button type='primary' size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
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
export default class submitInfo extends Vue {
  private articleList: list[] = [
    {title: 'web前端进阶之路', user: 'qzuser', date: 1526198985076, subTitle: 'html5 + 迎接移动时代', tag: 'web前端', views: 20},
    {title: 'python 与 人工智能', user: 'qzuser', date: 1526198985076, subTitle: 'html5 + 迎接移动时代', tag: 'web前端', views: 20},
    {title: '波士顿机械狗', user: 'qzuser', date: 1526198985076, subTitle: 'html5 + 迎接移动时代', tag: 'web前端', views: 20}
  ]
}

</script>
<style lang='scss' scoped>
.submitArticle {
  width: 100%;
  height: 360px;
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
