<template>
  <div class="userFace">
    <el-upload
      class="upload-demo"
      :action="actionUrl"
      :show-file-list='false'
      name='fileName'
      :before-upload='before'
      :on-success="success"
      drag>
      <img :src="timg ? timg : ''">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <div class="footer">
      <el-button type="primary" @click="save">确定</el-button>
    </div>
  </div>
</template>
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import { error } from '@/utils/message'
import { contentPath } from '@/config'


@Component({
  name: 'updateUserFace'
})

export default class UpdateUserFace extends Vue {
  private timg = ''

  public cancel () {
    this.timg = ''
  }

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
      this.timg = item.result.filePath
    }
  }

  private save () {
    if (this.timg) {
      this.$emit('save', {
        filePath: this.timg
      })
    } else {
      error('请选择图片')
    }
  }
}
</script>
<style lang='scss' scoped>
.userFace {
  width: 100%;
  img {
    width: 100%;
  }
  >.footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
 