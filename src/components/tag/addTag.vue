<template>
  <el-form :model="tagForm" ref="tagFrom" :rules="tagRules">
    <el-form-item prop="tagTitle">
      <el-input v-model="tagForm.tagTitle" placeholder="请输入名称"></el-input>
    </el-form-item>
    <el-form-item prop="tagInstructions">
      <el-input v-model="tagForm.tagInstructions" type='textarea' placeholder="请输入说明"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button size="small" type="primary" @click="save">保存</el-button>
      <el-button size="small" @click="cancel">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

export interface TagList {
  id?: number | string
  tagTitle: string,
  tagInstructions: string
}

@Component({
  name: 'addTag'
})
export default class AddTag extends Vue {
  public $refs: {
    [item: string]: any
  }

  @Prop({ default: () => JSON.parse('{}') })
  private detail: TagList

   private tagForm: TagList = {
     id: '',
    tagTitle: '',
    tagInstructions: ''
  }

  private tagRules: any = {
    tagTitle: [
      { required: true, message: '请输入文章标题', trigger: 'blur' }
    ],
    tagInstructions: [
      { required: true, message: '请输入文章副标题', trigger: 'blur' }
    ]
  }

  public cancel () {
    this.$nextTick(() => {
      this.$refs.tagFrom.resetFields()
      this.tagForm = {
        id: JSON.stringify(this.detail) !== '{}' ? this.detail.id : '',
        tagTitle: '',
        tagInstructions: ''
      }
    })
  }

  @Watch('detail', { immediate: true })
  private updateDetail () {
    if (JSON.stringify(this.detail) !== '{}') {
      this.tagForm = {
        id: this.detail.id,
        tagTitle: this.detail.tagTitle,
        tagInstructions: this.detail.tagInstructions
      }
    }
  }

  private save () {
    this.$refs.tagFrom.validate((valid: boolean) => {
      if (valid) {
        this.$emit('save', this.tagForm)
      }
    })
  }

}
</script>
<style lang="scss" scoped>

</style>
