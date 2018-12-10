<template>
  <div class="infoHead">
    <div class="info"
      v-for="(item, index) in infoList"
      :key="index"
      :style="{'background': item.state === 1 ? '#909399' : item.state === 2 ? '#409EFF' : item.state === 3 ? '#67C23A' : item.state === 4 ? '#F56C6C' : '#fff' }">
        <img v-if="item.state === 1" src="@/assets/image/draft.png">
        <img v-else-if="item.state === 2" src="@/assets/image/release.png">
        <img v-else-if="item.state === 3" src="@/assets/image/common.png">
        <img v-else-if="item.state === 4" src="@/assets/image/praise.png">
        <dl>
          <dt>{{ item.state === 1 ? '草稿' : item.state === 2 ? '发布' : item.state === 3 ? '评论' : item.state === 4 ? '赞' : '赞' }}</dt>
          <dd>
            {{ item.totalCount }}
          </dd>
        </dl>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component,Vue } from 'vue-property-decorator'

// ts 检测说明


@Component({
  name: 'InfoHead'
})
export default class infoHead extends Vue {
  private infoList = []

  private async mounted () {
    await this.$store.dispatch('statistical/getReadArticle')
    this.infoList = this.$store.state.statistical.infoHeadList
  }
}


</script>
<style lang='scss' scoped>
.infoHead {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .info {
    width: 22%;
    height: 100px;
    background: #fff;
    margin-bottom: 20px;
    border-radius: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #fff;
    dl {
      color: #fff;
      margin-right: 10px;
      dt {
        font-size: 17px;
        letter-spacing: 3px;
        &::after {
          margin-top: 5px;
          display: block;
          content: '';
          width: 50px;
          height: 1px;
          background: #fff;
        }
      }
      dd {
        margin: -5px;
        font-size: 40px;
      }
    }
    img {
      width: 70px;
      height: 70px;
    }
  }
}
</style>
