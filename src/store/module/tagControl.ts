import { MutationTree, ActionTree } from 'vuex'

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
    if (state.tagList.some(item => item.path === params.fullPath)) {
      return 
    }
    state.tagList.push({
      name: params.name,
      path: params.fullPath
    })
  }
}

const mutations: MutationTree<State> = {

}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

