<template>
  <div class="stateBtn">
    <p class="stateBar">
      <span>标签:</span>
      <span v-for="(item, index) in state" class="options" :class="index === select ? 'optionSelect' : ''" :key="index" @click="selection(item, index)">{{ item.content }}</span>
    </p>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Emit, Watch } from 'vue-property-decorator'

interface stateOption {
  content: string,
  state: number | string
}

@Component
export default class stateBtn extends Vue {
  private state: stateOption[] = [{content: '全部', state: ''}, {content: 'web', state: 1}, {content: '后台', state: 0}, {content: '随笔', state: 2}]
  private select: number = 0

  private selection (item: stateOption, index: number) {
    console.log(index)
    this.select = index
  }
}
</script>
<style lang='scss' scoped>
.stateBtn {
  width: 100%;
  border-bottom: 2px dashed $border;
  padding: 10px 10px 10px 0px;
  .stateBar {
    padding: 6px 10px 6px 0px;
    span {
      color: $border;
      &:first-child {
        font-size: 16px;
        margin-right: 10px;
      }
      &.options {
        font-size: 15px;
        color: $border;
        padding:5px 18px;
        margin-right: 23px;
        border-radius: 5px;
        box-sizing: border-box;
        border: 2px solid $border;
        &:hover {
          background: $border;
          color: #fff;
        }
      }
      &.optionSelect {
        background: $border;
        color: #fff;
      }
    }
  }
}
</style>
