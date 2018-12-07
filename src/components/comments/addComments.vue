<template>
  <div class="add-commments">
    <el-form :model='comments' :rules="commentsRules" ref="comments">
      <el-form-item prop="content">
        <el-input placeholder="请输入" v-model="comments.content"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="footer">
          <el-button type="primary" size="small" @click="save">确定</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'addComments'
})
export default class AddComments extends Vue {
  public $refs: {
    comments: HTMLFormElement
  }

  private comments = {
    content: ''
  }

  private commentsRules = {
    content: [
      { required: true, message: '必填', trigger: 'blur' }
    ]
  }

  private save () {
    this.$refs.comments.validate((valid: boolean) => {
      if (valid) {
        this.$emit('save', this.comments)
      }
    })
  }
}
</script>
<style lang='scss'>
.footer {
  display: flex;
  justify-content: flex-end;
}
</style>
