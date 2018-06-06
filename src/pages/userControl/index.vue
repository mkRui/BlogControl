<template>
  <div class="userControl">
    <p class="el-icon-star-off">标签列表</p>
    <div class="tagsHeader">
      <el-button type="primary" @click="addUserView = true">新增人员</el-button>
    </div>
    <div class="tagTables">
       <el-table
        :data="users"
        style="width: 100%"
        stripe
        border>
        <el-table-column
          prop="userName"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="昵称">
        </el-table-column>
        <el-table-column
          prop="types"
          label="角色">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间">
          <template slot-scope="scope">
            <span> {{ scope.row.createTime | format('yyyy-MM-dd hh:mm') }} </span>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          label="编辑">
          <template slot-scope="scope">
            <div class="editor">
              <el-button size="small" type="primary" @click="Ueditor(scope.row)">编辑</el-button>
              <el-button size="small" type="warning" v-if="scope.row.state !== 1" @click="deleteTable(scope.row)">启用</el-button>
              <el-button size="small" type="danger" v-else @click="deleteTable(scope.row)">禁用</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pege">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </div>
    <el-dialog
      :visible.sync="ueditorDialog"
      width="400px">
      <header slot="title">
        <span>编辑人员</span>
      </header>
      <div class="addUserBody">
        <el-form :model="UserForm" ref="addUserForm" :rules="addUserRules">
          <el-form-item prop="userName">
            <el-input placeholder="请输入人员昵称" v-model="UserForm.userName"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input placeholder="请输入人员邮箱" v-model="UserForm.email"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-select v-model="UserForm.role" placeholder="请选择人员角色">
              <el-option
                v-for="(item, index) in roleUser"
                :key="index"
                :label="item.roleName"
                :value="item.types"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeUser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="addUserView"
      width="400px">
      <header slot="title">
        <span>新增人员</span>
      </header>
      <div class="addUserBody">
        <el-form :model="addUserForm" ref="addUserForm" :rules="addUserRules">
          <el-form-item prop="userName">
            <el-input placeholder="请输入人员姓名" v-model="addUserForm.userName"></el-input>
          </el-form-item>
          <el-form-item prop="nickName">
            <el-input placeholder="请输入人员昵称" v-model="addUserForm.nickName"></el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input placeholder="请输入人员密码" v-model="addUserForm.passWord"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input placeholder="请输入人员邮箱" v-model="addUserForm.email"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUser">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang='ts'>

import { Component, Vue } from 'vue-property-decorator'

interface users {
  id?: number,
  userName?: string,
  createTime?: number,
  types?: string,
  nickName?: string,
  passWord?: string,
  email?: string,
  state?: number
}

interface roleUser {
  roleName: string
  id: number
  types: string
}

interface addUserForm {
  userName: string
  nickName: string
  passWord?: string
  email: string
  role?: string
}

interface addUserRules {
  userName: addRules[]
  nickName: addRules[]
  passWord: addRules[]
  email: addRules[]
  role: addRules[]
}

interface addRules {
  required: boolean
  message: string
  trigger: string
  type? :string
}

@Component
export default class tegContent extends Vue {
  private users: users[] = [
    {id: 1, userName: 'qzuser', createTime: 1526909000843, types: '博客管理员', nickName: 'join', email: '1@qq.com', state: 1},
    {id: 2, userName: 'qzuser', createTime: 1526909000843, types: '博客发布人', nickName: 'jake', email: '2@qq.com', state: 1}
  ]

  private roleUser: roleUser[] = [
    { id: 0, roleName: '博客管理员', types: '0' },
    { id: 1, roleName: '博客发布人', types: '1' }
  ]

  private addUserForm: addUserForm = {
    userName: '',
    nickName: '',
    passWord: '',
    email: ''
  }

  private UserForm: addUserForm = {
    userName: '',
    nickName: '',
    email: '',
    role: ''
  }

  private addUserRules: addUserRules = {
    userName: [
      { required: true, message: '请输入人员姓名', trigger: 'blur' }
    ],
    nickName: [
      { required: true, message: '请输入人员昵称', trigger: 'blur' }
    ],
    passWord: [
      { required: true, message: '请输入人员密码', trigger: 'blur' }
    ],
    email: [
      { required: true, message: '请正确输入邮箱', trigger: 'blur', type: 'email' }
    ],
    role: [
      { required: true, message: '请选择人员角色', trigger: 'blur' }
    ]
  }

  private ueditorDialog: boolean = false

  private tagsExplain: string = ''

  private UeditorDate: users = {}

  private pageSize: number = 10

  private totalPage:number = 20

  private addUserView: boolean = false

  private types: boolean = true



  private addUser (): void {
    (this.$refs.addUserForm as HTMLFormElement).validate((valid: boolean) => {
      if (valid) {
        const types = this.addUserForm.role === '0' ? '博客管理员' : '博客发布人'
        this.users.push({
          id: 2,
          userName: 'qzuser',
          createTime: new Date().getTime(),
          types: types,
          nickName: this.addUserForm.userName,
          passWord: this.addUserForm.passWord,
          email: this.addUserForm.email
        })
        this.addUserView = false
      } else {
        return false
      }
    })
  }

  private Ueditor (data: users): void {
    this.ueditorDialog = true
    this.UeditorDate = data
    this.UserForm.userName = data.userName as string
    this.UserForm.email = data.email as string
    this.UserForm.role = data.types === '博客管理员' ? '0' : '1'
  }

  private handleCurrentChange (val: number): void {
    console.log(val)
  }

  private changeUser (): void {
    this.UeditorDate.userName = this.UserForm.userName
    this.UeditorDate.email = this.UserForm.email
    this.UeditorDate.types = this.UserForm.role === '0' ? '博客管理员' : '博客发布人'
    this.ueditorDialog = false
  }

  private deleteTable (data: users):void {
    this.$forceUpdate()
    data.state = data.state === 0 ? 1 : 0
    console.log(data)
  }
}

</script>
<style lang='scss' scoped>
.userControl {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  min-width: 1100px;
  overflow: auto;
  > P {
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    padding-bottom: 20px;
    margin-bottom: 20px;
    color: $border;
    &::before {
      margin-right: 5px;
    }
    &::after {
      margin-top: 5px;
      content: " ";
      display: block;
      width: 110px;
      height: 2px;
      background-color: $border;
    }
  }
  .tagsHeader {
    width: 100%;
    padding: 15px;
    background: #fff;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  .tagTables {
    width: 100%;
    padding: 20px;
    border-radius: 5px;
    background: #fff;
  }
  .editor {
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .pege {
    display: flex;
    justify-content: flex-end;
    padding: 20px 0px;
  }
}
</style>
