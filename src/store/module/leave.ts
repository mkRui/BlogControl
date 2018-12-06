import {MutationTree, ActionTree} from 'vuex'
import { leave } from '@/api'
import { message } from '@/utils/message'


export interface LeaveMsg {
  id: number
  leaveContent: string
  leaveTime: string
  leaveTitle: string
  leaveUser: string
}
interface State {
  leaveList: LeaveMsg[]
  leaveMessage: LeaveMsg
  total: number,
  pageNo: number
}

const state: State = {
  leaveList: [],
  leaveMessage: JSON.parse('{}'),
  total: 1,
  pageNo: 1
} 


const actions: ActionTree<State, any> = {
  // 获取留言列表
  async getLeaveMessageList ({ commit }, params) {
    const res = await leave.getLeaveMessageList(params)
    if (res && res.code === 1) {
      commit('GET_LEAVE_MESSAGE_LIST', res.result)
    } else {
      return res
    }
  },
  // 获取留言详情
  async getLeaveMessage ({ commit }, params) {
    const res = await leave.getLeaveMessage(params)
    if (res && res.code === 1) {
      commit('GET_LEAVE_MESSAGE', res.result)
    } else {
      return res
    }
  },
  // 删除不符合言论的留言
  async delLeaveMessage ({ commit }, params) {
    const res = await leave.delLeaveMessage(params)
    if (res && res.code === 1) {
      commit('DEL_LEAVE_MESSAGE')
    } else {
      return res
    }
  }
}

const mutations: MutationTree<State> = {
  GET_LEAVE_MESSAGE_LIST (state, item) {
    state.leaveList = item.list
    state.total = item.totalCount
    state.pageNo = item.pageNo
  },
  GET_LEAVE_MESSAGE (state, item) {
    state.leaveMessage = item
  },
  delLeaveMessage (state, item) {
    message('删除成功')
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
