import { MutationTree, ActionTree } from 'vuex'
import { statistical } from '@/api'

interface infoHeadList {
  state: number,
  totalCount: number | string
}

interface ReadArticle {
  name: string,
  y: number
}

interface State {
  infoHeadList: infoHeadList[]
  readArticle: ReadArticle[],
  articleRead: any
}

const state = {
  infoHeadList: [],
  readArticle: [],
  articleRead: []
}

const actions: ActionTree<State, any> = {
  // 文章阅读量
  async getReadArticle ({ commit }, param) {
    const res = await statistical.getReadArticle(param)
    if (res.code === 1) {
      commit('GET_READ_ARTICLE', res.result)
    } else {
      return res
    }
  },
  // 个人文章发部署统计
  async getUserSubmit ({ commit }, param) {
    const res = await statistical.getSubmitArticle(param)
    if (res.code === 1) {
      commit('GET_USER_SUBMIT', res.result)
    } else {
      return res
    }
  },
  // 文章阅读数统计
  async getArticleRead ({ commit }, param) {
    const res = await statistical.getArticleRead(param)
    if (res.code === 1) {
      commit('GET_ARTICLE_READ', res.result)
    } else {
      return res
    }
  }
}

const mutations: MutationTree<State> = {
  GET_READ_ARTICLE (state, item) {
    state.infoHeadList = item
  },
  GET_USER_SUBMIT (state, item) {
    state.readArticle = []
    item.forEach((elem: { Count: number, articleCreateUser: string }) => {
      state.readArticle.push({
        name: elem.articleCreateUser,
        y: elem.Count
      })
    });
  },
  GET_ARTICLE_READ (state, item) {
    state.articleRead = []
    item.forEach((elem: { readArticleNumber: number, articleTitle: string }) => {
      state.articleRead.push([
        elem.articleTitle, elem.readArticleNumber
      ])
    });
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}