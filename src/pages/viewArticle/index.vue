<template>
  <div class="viewMain">
    <p class="iconfont blog-vertical">文章列表</p>

    <basic @search='search'></basic>

    <table-list ref="articleTable"></table-list>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import tableList from './components/articleList.vue'
import basic, { SearchState } from '@/components/article/articleBasic.vue'

@Component({
  components: {
    tableList,
    basic
  }
}) 
export default class viewAriticle extends Vue {
  public $refs: {
    articleTable: tableList
  }

  private search (item: SearchState) {
    console.log(item)
    this.$refs.articleTable
  }
}
</script>
<style lang='scss' scoped>
.viewMain {
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
  .screening {
    background: #fff;
    padding: 13px 20px 20px 20px;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 25px;
  }
}
</style>
