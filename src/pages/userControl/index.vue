<template>
  <div class="userControl">
    <p class="iconfont blog-vertical">标签列表</p>
    <div class="tagsHeader">
      <el-button type="primary" @click="addUser">新增人员</el-button>
    </div>
    <div class="tagTables" v-loading='loading'>
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
          prop="UserRoleId"
          label="角色">
          <template slot-scope="scope">
            {{ scope.row.UserRoleId === 1 ? '管理员' : scope.row.UserRoleId === 2 ? '文章发布员' : '文章评论权'  }}
          </template>
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间">
        </el-table-column>
        <el-table-column
          prop="lastLogin"
          label="最近一次登录">
        </el-table-column>
        <el-table-column
          width="250"
          label="编辑">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button size="small" type="warning" v-if="scope.row.userState !== 1" @click="updateState(scope.row.id, 1)">启用</el-button>
            <el-button size="small" type="danger" v-else @click="updateState(scope.row.id, 0)">禁用</el-button>
            <el-button size="small" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pege">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :page-size="10"
        :current-page="pageNo"
        layout="prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </div>
    <el-dialog
      :title="JSON.stringify(detail) !=='{}' ? '编辑人员' : '新增人员'"
      v-loading='userAdd'
      :visible.sync="addUserView"
      width="400px">
        <user-form @save='save' :detail='detail' ref='userForm'></user-form>
    </el-dialog>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import UserForm, { CreateUser } from '@/components/user/addUser.vue'
import { User } from '@/store/module/user'

@Component({
  name: 'userControl',
  components: {
    UserForm
  }
})
export default class UserContent extends Vue {
  public $refs: {
    userForm: UserForm
  }

  private loading = false

  private userAdd = false

  private users = []

  private get totalPage () {
    return this.$store.state.tag.total
  }

  private get pageNo () {
    return this.$store.state.tag.pageNo
  }

  private addUserView: boolean = false

  private detail: User = JSON.parse('{}')

  private async updateState (item: number, type: number) {
    await this.$store.dispatch('user/updateUserState', {
      id: item,
      state: type
    })
    this.switchPage(this.pageNo)
  }

  private addUser () {
    this.detail = JSON.parse('{}')
    this.addUserView = true
  }

  private edit (item: User) {
    this.detail = item
    this.addUserView = true
  }

  private async save (item: CreateUser) {
    this.userAdd = true
    let res
    if (JSON.stringify(this.detail) !=='{}') {
      res = await this.$store.dispatch('user/editUser', {
        ...item
      })
    } else {
      res = await this.$store.dispatch('user/createUser', {
        ...item
      })
    }
    this.userAdd = false
    if (!res) {
      this.$refs.userForm.cancel()
      this.addUserView = false
      this.switchPage(this.pageNo)
    }
  }

  // 页面初始化
  private async switchPage (page: number) {
    this.loading = true
    await this.$store.dispatch('user/getUserPage', {
      pageNo: page,
      pageSize: 10
    })
    this.users = this.$store.state.user.userList
    this.loading = false
  }
  
  // 切换分页
  private handleCurrentChange (item: number) {
    this.switchPage(item)
  }

  // 初始化页面
  private mounted () {
    this.switchPage(1)
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
    margin-bottom: 10px;
    color: $border;
    &::before {
      margin-right: 5px;
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
  .pege {
    display: flex;
    justify-content: flex-end;
    padding: 20px 0px;
  }
}
</style>
