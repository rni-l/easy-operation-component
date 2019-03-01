// vuex
import Vue from 'vue'
import Vuex, { GetterTree, MutationTree } from 'vuex'
import user, { State as userState } from './module/user'
import common, { State as commonState } from './module/common'

Vue.use(Vuex)

export interface State {
  user: userState
  common: commonState
}

const debug = process.env.NODE_ENV !== 'production'

const getters: GetterTree<State, any> = {}
const mutations: MutationTree<any> = {}

export default new Vuex.Store({
  getters,
  mutations,

  modules: {
    user,
    common
  },

  strict: debug
})
