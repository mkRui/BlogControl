import { MutationTree, ActionTree } from 'vuex'
import { article } from '@/api/index'

export interface Article {
  articleClassification: string
  articleComments: number
  articleContent: string
  articleCreateUser: string
  articleMin: string
  articleTag: string
  articleTitle: string
  cover?: null
  createTime: string
  draft: number
  id: number
  praise: string
  readArticleNumber: number
  state: number
}

interface State {
  articleList: Article[],
  pageNo: number,
  total: number
}

const state: State = {
  articleList: [],
  pageNo: 1,
  total: 1
}

const actions: ActionTree <State, any> = {
  async getArticleList ({ commit }, params) {
    const res = await article.articleList(params)
    if (res && res.code === 1) {
      commit('GET_ARTICLE_LIST', res.result)
    } else {
      return res
    }
  }
}

const mutations: MutationTree<State> = {
  GET_ARTICLE_LIST (state, item) {
    state.articleList = item.list
    state.pageNo = item.pageNo
    state.total = item.totalCount
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

