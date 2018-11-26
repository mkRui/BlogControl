<template>
  <div class="article-basic">
    <el-form :model="basic" label-width="78px" size="small">
      <el-form-item label="状态">
        <el-radio-group v-model="basic.state" size="small">
          <el-radio :label="''" border>全部</el-radio>
          <el-radio :label="1" border>公开</el-radio>
          <el-radio :label="0" border>私密</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-radio-group v-model="basic.submit" size="small">
          <el-radio :label="''" border>全部</el-radio>
          <el-radio :label="1" border>已发布</el-radio>
          <el-radio :label="0" border>草稿箱</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分类/标签">
        <el-select v-model="basic.tag" filterable placeholder="请选择标签">
          <el-option v-for="(item, index) in tagList" :key="index" :label="item.tagTitle" :value="item.tagTitle">{{ item.tagTitle }}</el-option>
        </el-select>
        <el-select v-model="basic.tag" filterable placeholder="请选择分类">
          <el-option v-for="(item, index) in classifyList" :key="index" :label="item.tagTitle" :value="item.tagTitle">{{ item.tagTitle }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键字">
        <div class="inputWidth">
          <el-input placeholder="请输入关键字" v-model="basic.keyWord"></el-input>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' size='small' @click="search">查询</el-button>
        <el-button size='small' @click="cancel">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { TagList } from '@/store/module/common'

@Component({
  name: 'ArticleBasic'
})
export default class ArticleBasic extends Vue {
  private basic = {
    state: '',
    submit: '',
    tag: '',
    classify: '',
    keyWord: ''
  }
  
  private tagList = []
 
  private classifyList = []

  private search () {
    this.$emit('search', this.basic)
  }

  private cancel () {
    this.basic = {
      state: '',
      submit: '',
      tag: '',
      classify: '',
      keyWord: ''
    }
    this.$emit('cancel')
  }

  private async mounted () {
    await this.$store.dispatch('common/getAllTag', {
      pageSize: 9999,
      pageNo: 1,
      tagState: ''
    })
    const tagAll = this.$store.state.common.tagList
    this.tagList = tagAll.filter((item: TagList) => item.tagType === 1)
    this.classifyList = tagAll.map((item: TagList) => item.tagType === 0)
  }
}
</script>
<style lang='scss'>
.article-basic {
  width: 100%;
  padding: 13px 20px 10px 20px;
  background: #fff;
  margin: 10px 0px;
  border-radius: 3px;
  .el-radio__input {
    display: none;
  }
  .inputWidth {
    width: 394px;
  }
}
</style>
