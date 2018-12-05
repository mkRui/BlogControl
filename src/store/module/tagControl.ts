import { MutationTree, ActionTree } from 'vuex'
import { Route } from 'vue-router'
import router from '@/router'

interface TagList {
  name: string,
  path: string
}

interface State {
  tagList: TagList[]
}

const state: State = {
  tagList: []
}

const actions: ActionTree <State, any> = {
  AddTag ({commit}, params) {
    commit('ADD_TAG', params)
  },
  closeTag ({commit}, params) {
    commit('CLOSE_TAG', params)
  },
  allClose ({commit}, params) {
    commit('ALL_CLOSE')
  },
  ortherClose ({commit}, params) {
    commit('OTHER_CLOSE', params)
  }
}

const mutations: MutationTree<State> = {
  ADD_TAG (state, Route: Route) {
    if (state.tagList.some(item => item.path === Route.fullPath)) {
      return 
    }
    state.tagList.forEach((item: TagList, index: number) => {
      if (item.name === Route.name) {
        state.tagList.splice(index, 1)
      }
    })
    state.tagList.push({
      name: (Route.name as string),
      path: Route.fullPath
    })
  },
  CLOSE_TAG (state, params) {
    let routerList = []
    for (const item of state.tagList) {
      if (item.path !== params) {
        routerList.push(item)
      }
    }
    state.tagList = routerList
  },
  ALL_CLOSE (state, params) {
    state.tagList = []
    router.push('/statistical')
  },
  OTHER_CLOSE (state, params) {
    let routerList = []
    for (const item of state.tagList) {
      if (item.path === params) {
        routerList.push(item)
      }
    }
    state.tagList = routerList
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

