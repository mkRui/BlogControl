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
      <img :src="timg">
      <div class="replaceImg">
        <el-button type="primary" @click="changeImg = true">更改图片</el-button>
      </div>
    </div>
    <div class="save">
      <el-button type="primary" @click="saveSubmit">保 存</el-button>
    </div>
    <el-dialog
      title="图片上传"
      :visible.sync="changeImg"
      width="400px">
      <div class="aboutBody">
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
      </div>
    </el-dialog>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Global } from '@/store/module/global'
import focus from '@/utils/foucs'
import { error } from '@/utils/message'
import { contentPath } from '@/config'

export interface RightGlobal {
  authorTitle: string,
  authorFace: string
}

@Component({
  name: 'rightGlobal',
  directives: {
    focus
  }
})
export default class rightGlobal extends Vue {
  private aboutTitle: string = ''

  private timg: string = ''

  private titleBooean: boolean = true

  private changeImg: boolean = false

  private get actionUrl () {
    return contentPath + `/article/uploadImg`
  }

  @Prop({ default: () => JSON.parse('{}') })
  private detailGlobal: Global

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

  @Watch('detailGlobal', {deep: true})
  private updateDetailGlobal () {
    if (JSON.stringify(this.detailGlobal) !== '{}') {
      const detail = this.detailGlobal
      this.timg = detail.authorImg
      this.aboutTitle = detail.authorTitle
    }
  }

  private saveSubmit (): void {
    this.$emit('save', {
      authorTitle: this.aboutTitle,
      authorImg: this.timg
    })
  }

  
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
  .save {
    margin-top: 20px;
    padding: 10px;
    background: #fff;
    border-radius: 5px;
    button {
      width: 100%;
    }
  }
}
</style>
