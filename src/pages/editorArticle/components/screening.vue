<template>
  <div class="screening">
    <p>筛选选项 /</p>
    <div class="screeningContent">
      <el-form v-model="options" label-width="80px">
        <el-form-item label="文章分类">
            <el-select
              v-model="options.tagId"
              placeholder="请选择文章分类">
              <el-option
                v-for="(item, index) in classification"
                :key="index"
                :label="item.name"
                :value="item.id">
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
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
      </el-form>
        <el-form v-model="screeningModel">
        <el-form-item>
          <el-radio-group v-model="screeningModel.state">
            <el-radio label="1">公开</el-radio>
            <el-radio label="0">私密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="screeningModel.submit">
            <el-radio label="1">已发布</el-radio>
            <el-radio label="0">草稿箱</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator'

interface screeningModel {
  state: string,
  submit: string
}

interface options {
  tagId: string,
  classify: string
}

interface tag {
  name: string,
  id: number
}

@Component
export default class screening extends Vue {
  private screeningModel: screeningModel = {
    state: '1',
    submit: '1'
  }

  private options: options = {
    tagId: '',
    classify: ''
  }

  private tag: tag[] = [
    {name: 'web前端', id: 0},
    {name: 'python', id: 0}
  ]

  private classification: tag[] = [
    {name: '技术', id: 0},
    {name: '代码', id: 0}
  ]

  @Watch('screeningModel', { deep: true })
  private screen (text: object) {
    this.$emit('state', text)
  }

  @Watch('options', { deep: true })
  private option (text: object) {
    this.$emit('option', text)
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
