<template>
  <div class="login">
    <h3>welcome to the blog Management Platform of anRui</h3>
    <div class="form">
      <h2>登录</h2>
      <el-form :model='userInfo' ref="userInfoForm" :rules="userRules">
        <el-form-item prop="nickName">
          <el-input v-model="userInfo.nickName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input v-model="userInfo.passWord" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="login" type="primary">登录</el-button>
    </div>
    <canvas-login></canvas-login>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import CanvasLogin from '@/components/login/loginCanvas.vue'
@Component({
  name: 'login',
  components: {
    CanvasLogin
  }
})
export default class Login extends Vue {
  public $refs: {
    userInfoForm: HTMLFormElement
  }

  private userInfo = {
    nickName: '',
    passWord: ''
  }

  private userRules = {
    nickName: [
      { required: true, message: '请输入用户名', trigger: 'change' }
    ],
    passWord: [
      { required: true, message: '请输入密码', trigger: 'change' }
    ]
  }

  private login () {
    this.$refs.userInfoForm.validate((valid: boolean) => {
      if (valid) {
        this.$store.dispatch('login', this.userInfo)
      }
    })
  }

  private mounted () {
    const _this = this
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        _this.login()
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  text-align: center;
  background: #fff;
  h3 {
    font-size: 20px;
    margin-top: 30px;
    position: absolute;
    right: 10px;
    bottom: 10px;
    z-index: 2;
    // color: #fff;
    // mix-blend-mode: difference;
  }
  .form {
    z-index: 2;
    width: 400px;
    height: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -200px;
    h2 {
      margin-bottom: 10px;
    }
    button {
      width: 100%;
    }
  }
}
</style>
