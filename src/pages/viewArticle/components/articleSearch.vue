<template>
  <div class="stateBtn">
    <div class="stateBar">
      <span>文章搜索:</span>
      <div>
        <el-input
          @click='selection'
          placeholder="请输入内容"
          v-model="content">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Emit, Watch } from 'vue-property-decorator'

@Component
export default class stateBtn extends Vue {
  private content: string = ''

  private selection () {
  }
}
</script>
<style lang='scss' scoped>
.stateBtn {
  width: 100%;
  padding: 15px 10px 0px 0px;
  .stateBar {
    display: flex;
    align-items: center;
    span {
      width: 90px;
      color: $border;
      &:first-child {
        font-size: 16px;
        margin-right: 10px;
      }
    }
    > div {
      width: 390px;
      > div {
        border-style: $border !important;
      }
    }
  }
}
</style>
