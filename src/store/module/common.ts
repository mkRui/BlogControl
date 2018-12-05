import { ActionTree, MutationTree } from 'vuex'
import { common } from '@/api'



export interface TagList {
  createTime: string
  id: number
  tagCreateUser: string
  tagInstructions: string
  tagTitle: string
  tagType: number
}

interface State {
  tagList: TagList[]
}

const state: State = {
  tagList: []
}

const actions: ActionTree<State, any> = {
  async getAllTag ({ commit }, param) {
    const res = await common.getAllTag(param)
    if (res && res.code === 1) {
      commit('GET_ALL_TAG', res.result)
    } else {
      return res
    }
  }
}

const mutations: MutationTree<State> = {
  GET_ALL_TAG (state, param) {
    state.tagList = param.list
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
