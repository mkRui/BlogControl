import { ActionTree, MutationTree } from 'vuex'
import { user } from '@/api/index'
import { message } from '@/utils/message'

export interface User {
  UserRoleId: number
  createTime: string
  email: string
  id: number
  lastLogin: string
  nickName: string
  passWord: string
  userFace: string | null
  userName: string
  userState: number
  user_role_id: number
}

interface State {
  total: number,
  page: number,
  userList: User[]
}

const state: State = {
  total: 1,
  page: 1,
  userList: []
}

const actions: ActionTree<State, any> = {
  // 获取列表
  async getUserPage ({ commit }, param) {
    const res = await user.getUserPage(param)
    if (res.code === 1) {
      commit('GET_USER_PAGE', res.result)
    } else {
      return res
    }
  },
  // 更新人员状态
  async updateUserState ({ commit }, param) {
    const res = await user.updateState(param)
    if (res.code === 1) {
      commit('UPDATE_USER_STATE')
    } else {
      return res
    }
  },
  // 创建人员
  async createUser ({ commit }, param) {
    const res = await user.addUser(param)
    if (res.code === 1) {
      commit('CREATE_USER')
    } else {
      return res
    }
  },
  // 编辑人员
  async editUser ({commit}, param) {
    const res = await user.exitUserInfo(param)
    if (res.code === 1) {
      commit('EDIT_USER')
    } else {
      return res
    }
  }
}

const mutations: MutationTree<State> = {
  GET_USER_PAGE (state, item) {
    state.userList = item.list
    state.total = item.totalCount
    state.page = item.pageNo
  },
  UPDATE_USER_STATE () {
    message('编辑成功')
  },
  CREATE_USER () {
    message('保存成功')
  },
  EDIT_USER () {
    message('编辑成功')
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}