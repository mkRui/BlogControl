import Vue from 'vue'
import Vuex, { ActionTree, MutationTree } from 'vuex'
import 'babel-polyfill'
import modules from './module'
import { user } from '@/api'
import router from '@/router'

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
  async getInit ({ commit }, params) {
    const res = await user.init()
    commit('GET_INIT', res)
  },
  async login ({ commit, dispatch }, params) {
    const res = await user.login(params)
    dispatch('tagControl/allClose')
    if (res.code === 1) commit('LOGIN', res.result)
    else res
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
