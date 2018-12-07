<template>
<div class="detail-comments">
    <div class="detailBody">
      <ul>
        <li><span>评论文章：<i>{{ detail.commentsArticle }}</i></span><span>留言人：<i>{{ detail.commentsUser }}</i></span></li>
        <li><span>评论内容：</span><p>{{ detail.commentsContent }}</p></li>
        <li class="createTime"><span>评论时间：<i>{{ detail.commentsTime }}</i></span></li>
      </ul>
    </div>
    <div class="footer">
      <el-button type="primary" size="small">确 定</el-button>
    </div>
</div>
</template>
<script lang='ts'>
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'

interface Detail {
  messageTitle: string,
  commentUser: string,
  instructions: string,
  createTime: string
}

@Component({
  name: 'detailComments'
})
export default class DetailComments extends Vue {
  @Prop({ default: () => JSON.parse('{}') })
  private detail: Detail
}
</script>
<style lang='scss'>
.detail-comments {
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
  .footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
