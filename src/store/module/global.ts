import {MutationTree, ActionTree} from 'vuex'
import { global } from '@/api'
import { message } from '@/utils/message'


export interface Global {
  id: number
  title: string,
  cooperation: string,
  movie: string,
  music: string,
  hobby: string,
  feelingsTitle: string,
  feelingsMinTitle: string,
  feelingsContent: string,
  introduce: string,
  codeCooperation: string,
  authorTitle: string,
  authorFace: string,
  authorImg: string
}
interface State {
  global: Global
}

const state: State = {
  global: JSON.parse('{}')
} 


const actions: ActionTree<State, any> = {
  // 获取全局设置
  async detailGlobal ({ commit }, params) {
    const res = await global.detailGlobal(params)
    if (res && res.code === 1) {
      commit('DETAIL_GLOBAL', res.result)
    } else {
      return res
    }
  },
  // 修改全局设置
  async editGlobal ({ commit }, params) {
    const res = await global.editGlobal(params)
    if (res && res.code === 1) {
      commit('EDIT_GLOBAL', res.result)
    } else {
      return res
    }
  }
}

const mutations: MutationTree<State> = {
  DETAIL_GLOBAL (state, item) {
    state.global = item
  },
  EDIT_GLOBAL (state, item) {
    message('修改成功')
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
