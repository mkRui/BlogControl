import Vue from 'vue'
import Vuex, { ActionTree, MutationTree } from 'vuex'
import 'babel-polyfill'

Vue.use(Vuex)

interface State {
  index: number
}

const state: State = {
  index: 1
}

const getters = {

}

const actions: ActionTree<State, any> = {

}

const mutations: MutationTree<State> = {

}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
