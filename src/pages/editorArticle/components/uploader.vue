<template>
  <div class="uploadContent">
    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"  drag>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <el-input placeholder="上传图片后的图片地址" v-model="imgUrl"></el-input>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class uploader extends Vue {
  private imgUrl:string = ''
}

</script>
<style lang='scss'>
.uploadContent {
  width: 41%;
  height: 200px;
  padding: 20px;
  border-radius: 5px;
  background: #fff;
  .el-upload {
    width: 100%;
  }
  .el-upload-dragger {
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
    i {
      margin: 8px 0 7px;
    }
  }
}
</style>
