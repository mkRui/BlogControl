import { MutationTree, ActionTree } from 'vuex'
import { article } from '@/api/index'
import { message } from '@/utils/message'

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


export interface ArticleDetail {
  id: number
  title: string,
  titleMin: string,
  content: string,
  praise: number,
  readerNum: number,
  createTime: string,
  tag: string,
  classify: string,
  cover: string,
  state: number,
  draft: number
}

interface State {
  articleList: Article[],
  articleDetail: ArticleDetail
  pageNo: number,
  total: number
}

const state: State = {
  articleList: [],
  articleDetail: JSON.parse('{}'),
  pageNo: 1,
  total: 1
}

const actions: ActionTree <State, any> = {
  // 获取文章列表
  async getArticleList ({ commit }, params) {
    const res = await article.articleList(params)
    if (res && res.code === 1) {
      commit('GET_ARTICLE_LIST', res.result)
    } else {
      return res
    }
  },
  // 添加文章
  async addArticle ({ commit }, params) {
    const res = await article.addArticle(params)
    if (res && res.code === 1) {
      commit('ADD_ARTICLE', res.result)
    } else {
      return res
    }
  },
  // 删除文章
  async delArticle ({ commit }, params) {
    const res = await article.delArticle(params)
    if (res && res.code === 1) {
      commit('DEL_ARTICLE', res.result)
    } else {
      return res
    }
  },
  // 查看文章详情
  async viewArticle ({ commit }, params) {
    const res = await article.articleDetail(params)
    if (res && res.code === 1) {
      commit('VIEW_ARTICLE', res.result)
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
  },
  ADD_ARTICLE (state, item) {
    message('发布成功')
  },
  DEL_ARTICLE (state, item) {
    message('删除成功')
  },
  VIEW_ARTICLE (state, item) {
    state.articleDetail = item
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

