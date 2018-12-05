import { ActionTree, MutationTree } from 'vuex'
import { tag } from '@/api'
import { message } from '@/utils/message'



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
  pageNo: number,
  total: number
}

const state: State = {
  tagList: [],
  pageNo: 1,
  total: 1
}

const actions: ActionTree<State, any> = {
  // 获取所有标签
  async getAllTag ({ commit }, param) {
    const res = await tag.getAllTag(param)
    if (res && res.code === 1) {
      commit('GET_ALL_TAG', res.result)
    } else {
      return res
    }
  },
  // 添加标签/分类
  async addTag ({ commit }, param) {
    const res = await tag.addAllTag(param)
    if (res && res.code === 1) {
      commit('ADD_TAG')
    } else {
      return res
    }
  },
  // 删除分类
  async delTag ({ commit }, param) {
    const res = await tag.delAllTag(param)
    if (res && res.code === 1) {
      commit('DEL_TAG')
    } else {
      return res
    }
  },
  // 修改标签说明
  async editTag ({ commit }, param) {
    const res = await tag.editAllTag(param)
    if (res && res.code === 1) {
      commit('EDIT_TAG')
    } else {
      return res
    }
  }
}

const mutations: MutationTree<State> = {
  GET_ALL_TAG (state, param) {
    state.tagList = param.list
    state.pageNo = param.pageNo
    state.total = param.totalCount
  },
  ADD_TAG () {
    message('添加成功')
  },
  DEL_TAG () {
    message('删除成功')
  },
  EDIT_TAG () {
    message('修改成功')
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
