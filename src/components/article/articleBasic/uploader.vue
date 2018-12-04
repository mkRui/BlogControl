<template>
  <div class="uploadContent">
    <el-upload
    class="upload-demo"
    :action="actionUrl"
    :show-file-list='false'
    name='fileName'
    :before-upload='before'
    :on-success="success"
    drag>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <div class="foot">
      <el-input placeholder="上传图片后的图片地址" v-model="imgUrl"></el-input>
      <el-button type="primary">设为文章封面</el-button>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { contentPath } from '@/config'
import { error } from "@/utils/message"

@Component({
  name: 'uploader'
})
export default class uploader extends Vue {
  private imgUrl: string = ''

  private get actionUrl () {
    return contentPath + `/article/uploadImg`
  }

  private before (item: File) {
    const reg = /(.jpg|.JPG|.jpeg|.JPEG|.png|.PNG)$/
    if (!reg.test(item.name)) {
      error('请上传jpg、jpeg、png类型的图片')
      return false
    }
  }

  private success (item: ajaxRes.reState) {
    if (item.code === 1) {
      this.imgUrl = item.result.filePath
    }
  }

  private mounted () {
    console.log()
  }
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
  .foot {
    display: flex;
    > button {
      margin-left: 10px;
    }
  }
}
</style>
