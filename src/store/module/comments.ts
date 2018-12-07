import { ActionTree, MutationTree } from 'vuex'
import { comments } from '@/api'
import { message } from '@/utils/message'



export interface CommentsList {
  commentsArticleId: number
  commentsArticle: number
  commentsContent: string
  commentsParentid: number
  commentsPraise: number
  commentsTime: string
  commentsUser: string
  commentsUserMin: string
  id: number
}

interface State {
  commentsList: CommentsList[],
  totalPage: number,
  pageNo: number
}

const state: State = {
  commentsList: [],
  totalPage: 1,
  pageNo: 1
}

const actions: ActionTree<State, any> = {
  // 评论列表获取
  async getCommentsList ({ commit }, param) {
    const res = await comments.getCommentsList(param)
    if (res && res.code === 1) {
      commit('GET_COMMENTS_LIST', res.result)
    } else {
      return res
    }
  },
  // 删除
  async delComments ({ commit }, param) {
    const res = await comments.delComments(param)
    if (res && res.code === 1) {
      commit('DEL_COMMENTS', res.result)
    } else {
      return res
    }
  },
  // 增加评论
  async addComments ({ commit }, param) {
    const res = await comments.addComments(param)
    if (res && res.code === 1) {
      commit('ADD_COMMENTS', res.result)
    } else {
      return res
    }
  }
}

const mutations: MutationTree<State> = {
  GET_COMMENTS_LIST (state, param) {
    state.commentsList = param.list
    state.totalPage = param.totalCount
    state.pageNo = param.pageNo
  },
  DEL_COMMENTS () {
    message('删除成功')
  },
  ADD_COMMENTS () {
    message('评论成功')
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
