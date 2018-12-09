<template>
  <div class="user-form">
    <el-form :model="addUserForm" ref="addUserForm" :rules="addUserRules">
      <el-form-item prop="userName">
        <el-input placeholder="请输入人员姓名" v-model="addUserForm.userName"></el-input>
      </el-form-item>
      <el-form-item prop="nickName">
        <el-input placeholder="请输入人员昵称" v-model="addUserForm.nickName"></el-input>
      </el-form-item>
      <el-form-item v-if="JSON.stringify(detail) === '{}'" prop="passWord">
        <el-input placeholder="请输入人员密码" v-model="addUserForm.passWord"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input placeholder="请输入人员邮箱" v-model="addUserForm.email"></el-input>
      </el-form-item>
      <el-form-item v-if="JSON.stringify(detail) !== '{}'" prop="UserRoleId">
        <el-select v-model="addUserForm.UserRoleId" placeholder="请选择人员角色">
          <el-option
            v-for="(item, index) in roleUser"
            :key="index"
            :label="item.roleName"
            :value="item.types"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <div class="footer">
          <el-button size="small" type="primary" @click="save">保存</el-button>
          <el-button size="small" @click="cancel">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { passWordValidator, accountValidator } from '@/utils/validation'
import { User } from '@/store/module/user'


export interface CreateUser {
  id?: string | number
  userName: string,
  nickName: string,
  passWord: string,
  email: string,
  UserRoleId: string | number
}

@Component({
  name: 'addUser'
})
export default class AddUser extends Vue {
  public $refs: {
    addUserForm: HTMLFormElement
  }

  @Prop({ default: () => JSON.parse('{}') })
  private detail: User

  private addUserForm: CreateUser = {
    id: '',
    userName: '',
    nickName: '',
    passWord: '',
    email: '',
    UserRoleId: ''
  }

  private addUserRules = {
    nickName: [
      { required: true, message: '请输入人员昵称', trigger: 'blur' },
      { validator: accountValidator, trigger: 'blur' }
    ],
    passWord: [
      { required: true, message: '请输入人员密码', trigger: 'blur' },
      { validator: passWordValidator, trigger: 'blur' }
    ],
    email: [
      { required: true, message: '请正确输入邮箱', trigger: 'blur', type: 'email' }
    ],
    UserRoleId: [
      { required: true, message: '请选择人员角色', trigger: 'blur' }
    ]
  }

  private roleUser = [
    { roleName: '博客管理员', types: 1 },
    { roleName: '博客发布人', types: 2 },
    { roleName: '博客评论人', types: 3 }
  ]

  @Watch('detail', { immediate: true })
  private updateDetail () {
    if (JSON.stringify(this.detail) !== '{}') {
      this.addUserForm = {
        id: this.detail.id,
        userName: this.detail.userName,
        nickName: this.detail.nickName,
        passWord: this.detail.passWord,
        email: this.detail.email,
        UserRoleId: this.detail.UserRoleId
      }
    }
  }

  public cancel () {
    this.$nextTick(() => {
      this.$refs.addUserForm.resetFields()
      this.addUserForm = {
        id: JSON.stringify(this.detail) !== '{}' ? this.detail.id : '',
        userName: '',
        nickName: '',
        passWord: '',
        email: '',
        UserRoleId: ''
      }
    })
  }

  private save () {
    this.$refs.addUserForm.validate((valid: boolean) => {
      if (valid) {
        this.$emit('save', this.addUserForm)
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.user-form {
  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
