<template>
  <div class="viewMain">
    <p class="el-icon-star-off">文章列表</p>
    <div class="screening">
      <state-btn></state-btn>
      <tag-state></tag-state>
      <classification></classification>
      <article-state></article-state>
      <article-search></article-search>
    </div>
    <table-list></table-list>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import stateBtn from './components/state.vue'
import articleState from './components/articleState.vue'
import tagState from './components/tagState.vue'
import classification from './components/classification.vue'
import articleSearch from './components/articleSearch.vue'
import tableList from './components/tableList.vue'

@Component({
  components: {
    stateBtn,
    articleState,
    tagState,
    classification,
    articleSearch,
    tableList
  }
}) 
export default class viewAriticle extends Vue {

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
    &::after {
      margin-top: 5px;
      content: " ";
      display: block;
      width: 110px;
      height: 2px;
      background-color: $border;
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
