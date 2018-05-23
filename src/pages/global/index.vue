<template>
  <div class="global">
    <p class="el-icon-star-off">全局设置</p>
    <div class="globalBody">
      <div class="leftGlobal">
        <div class="aboutImage"></div>
      </div>
      <div class="rightGlobal">
        <div class="aboutTitle">
          <span>作者标题：</span>
          <div>
            <transition  tag="div" name="slide-up" mode="out-in">
              <span :key="1" @click="titleBooean = false" v-if="titleBooean">{{ aboutTitle }}</span>
              <el-input :key="1" v-else v-focus @blur="titleBooean = true" v-model="aboutTitle"></el-input>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>

import { Component, Vue } from 'vue-property-decorator'
import focus from './../../utils/foucs'
@Component({
  directives: {
    focus
  }
})
export default class global extends Vue {
  private aboutTitle: string = '嘿 嘿 嘿～ 关于作者'

  private titleBooean: boolean = true
}

</script>
<style lang='scss' scoped>
.global {
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
  .globalBody {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .leftGlobal {
      width: 60%;
    }
    .rightGlobal {
      width: 35%;
      .aboutTitle {
        width: 100%;
        height: 54px;
        padding: 7px;
        background: #fff;
        border-radius: 5px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        > span:nth-child(1) {
          font-size: 16px;
          margin-right: 5px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
