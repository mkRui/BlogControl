<template>
  <div class="screening">
    <p>筛选选项</p>
    <div class="screeningContent">
      <el-form v-model="options" label-width="80px">
        <el-form-item label="文章分类">
            <el-select
              v-model="options.tag"
              placeholder="请选择文章分类">
              <el-option
                v-for="(item, index) in classification"
                :key="index"
                :label="item.tagTitle"
                :value="item.tagTitle">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="文章标签">
            <el-select
              v-model="options.classify"
              placeholder="请选择文章标签">
              <el-option
                v-for="(item, index) in tag"
                :key="index"
                :label="item.tagTitle"
                :value="item.tagTitle">
              </el-option>
            </el-select>
        </el-form-item>
      </el-form>
        <el-form v-model="screeningModel">
        <el-form-item>
          <el-radio-group v-model="screeningModel.state">
            <el-radio :label="1">公开</el-radio>
            <el-radio :label="0">私密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="screeningModel.submit">
            <el-radio :label="1">已发布</el-radio>
            <el-radio :label="0">草稿箱</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { TagList } from '@/store/module/common'
import { ArticleDetail } from '@/store/module/article'

interface screeningModel {
  state: number,
  submit: number
}

interface options {
  tag: string,
  classify: string
}


@Component({
  name: 'screening'
})
export default class screening extends Vue {
  private screeningModel: screeningModel = {
    state: 1,
    submit: 1
  }

  private options: options = {
    tag: '',
    classify: ''
  }

  private tag = []

  private classification = []

  @Watch('screeningModel', { deep: true })
  private screen (text: object) {
    this.$emit('state', text)
  }

  @Watch('options', { deep: true })
  private option (text: object) {
    this.$emit('option', text)
  }

  @Prop()
  private detail: ArticleDetail

  @Watch('detail', { immediate: true })
  private updateDetail () {
    if (JSON.stringify(this.detail) !== '{}') {
      this.options = {
        tag: this.detail.tag,
        classify: this.detail.classify
      }
      this.screeningModel = {
        state: this.detail.state,
        submit: this.detail.draft
      }
    }
  }

  private async mounted () {
    await this.$store.dispatch('common/getAllTag', {
      pageSize: 9999,
      pageNo: 1,
      tagState: ''
    })
    const tagAll = this.$store.state.common.tagList
    this.tag = tagAll.filter((item: TagList) => item.tagType === 1)
    this.classification = tagAll.filter((item: TagList) => item.tagType === 0)
  }


}
</script>
<style lang='scss' scoped>
.screening {
  width: 57%;
  height: 200px;
  padding: 20px;
  border-radius: 5px;
  background: #fff;
  > p {
    color: $border;
    margin-bottom: 10px;
    font-size: 16px;
  }
  .screeningContent {
    display: flex;
    form {
      margin-right: 40px;
    }
  }
}
</style>
