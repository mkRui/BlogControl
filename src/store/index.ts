import Vue from 'vue'
import Vuex, { ActionTree, MutationTree } from 'vuex'
import 'babel-polyfill'
import modules from './module'
import { user } from '@/api'
import router from '@/router'
import { message } from '@/utils/message'

Vue.use(Vuex)

interface Role {
  id: number,
  roleName: string,
  types: number
}

interface User {
  createTime: number,
  id: number,
  nickName: string,
  userFace: string,
  userRole: Role,
  userState: number
}

interface State {
  user: User
}

const state: State = {
  user: JSON.parse('{}')
}

const actions: ActionTree<State, any> = {
  // 页面初始化
  async getInit ({ commit }, params) {
    const res = await user.init()
    commit('GET_INIT', res)
  },
  // 登录
  async login ({ commit, dispatch }, params) {
    const res = await user.login(params)
    if (res.code === 1) {
      commit('LOGIN', res.result)
      dispatch('tagControl/allClose')
    } else res
  },
  // 退出登录
  async logOut (params) {
    await user.logOut(params)
    router.push('/login')
  },
  // 修改头像
  async editUserFace ({ commit }, params) {
    const res = await user.editUserFace(params)
    if (res.code === 1) {
      commit('EDIT_USER_FACE', params)
    } else res
  }
}

const mutations: MutationTree<State> = {
  GET_INIT (state, item) {
    const url = window.location.href.split('#')[1]
    if (item && item.code === 1) {
      state.user = item.result
      router.push(url || '/statistical')
    } else {
      router.push('/login')
    }
  },
  LOGIN (state, item) {
    state.user = item
    router.push('/statistical')
  },
  EDIT_USER_FACE (state, item) {
    state.user.userFace = item.filePath
    message('修改成功')
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    ...modules
  }
})
