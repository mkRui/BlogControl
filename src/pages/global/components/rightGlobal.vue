<template>
  <div class="globalContainRight">
    <div class="aboutTitle">
      <span>作者标题：</span>
      <div>
        <transition  tag="div" name="slide-up" mode="out-in">
          <span :key="1" @click="titleBooean = false" v-if="titleBooean">{{ aboutTitle }}</span>
          <el-input :key="1" v-else v-focus @blur="titleBooean = true" v-model="aboutTitle"></el-input>
        </transition>
      </div>
    </div>
    <div class="aboutImage">
      <img src="./../../../assets/image/timg.jpeg">
      <div class="replaceImg">
        <el-button type="primary" @click="changeImg = true">更改图片</el-button>
      </div>
    </div>
    <el-dialog
      title="图片上传"
      :visible.sync="changeImg"
      width="400px">
      <div class="aboutBody">
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"  drag>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
    </el-dialog>
  </div>
</template>
<script lang='ts'>

import { Component, Vue } from 'vue-property-decorator'
import focus from './../../../utils/foucs'
@Component({
  directives: {
    focus
  }
})
export default class rightGlobal extends Vue {
  private aboutTitle: string = '嘿 嘿 嘿～ 关于作者'

  private titleBooean: boolean = true

  private changeImg: boolean = false
}

</script>
<style lang='scss' scoped>
.globalContainRight {
  width: 100%;
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
      font-size: 15px;
      margin-right: 5px;
      margin-left: 10px;
    }
    div {
      width: 70%;
      div {
        width: 100%;
      }
    }
  }
  .aboutImage {
    width: 100%;
    margin-top: 15px;
    padding: 20px 20px 16px 20px;
    background: #fff;
    border-radius: 5px;
    .replaceImg {
      display: flex;
      justify-content: flex-end;
      margin-top: 13px;
    }
    img {
      width: 100%;
    }
  }
}
</style>
