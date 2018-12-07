import { ActionTree, MutationTree } from 'vuex'
import { Article } from './article'
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
  tagList: TagList[],
  articleList: Article[]
}

const state: State = {
  tagList: [],
  articleList: []
}

const actions: ActionTree<State, any> = {
  async getAllTag ({ commit }, param) {
    const res = await common.getAllTag(param)
    if (res && res.code === 1) {
      commit('GET_ALL_TAG', res.result)
    } else {
      return res
    }
  },
  async getAllArticle ({ commit }, param) {
    const res = await common.getAllArticle(param)
    if (res && res.code === 1) {
      commit('GET_ALL_ARTICLE', res.result)
    }
  }
}

const mutations: MutationTree<State> = {
  GET_ALL_TAG (state, param) {
    state.tagList = param.list
  },
  GET_ALL_ARTICLE (state, param) {
    state.articleList = param
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
