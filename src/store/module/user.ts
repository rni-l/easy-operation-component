export interface State {
  user: User
  isLogin: Boolean
}

interface User {
  Balance: String | Number
}

const state: State = {
  user: {
    Balance: 1
  },
  isLogin: false
}

// getters
const getters = {
  getBalance: (state: State) => state.user.Balance,
  getUserInfo: (state: State) => state.user
}

// mutations
const mutations = {
  updateLogin(state: State, value: Boolean) {
    state.isLogin = value
  },

  updateUserInfo(state: State, value: User) {
    state.user = value
    state.isLogin = true
  },

  mergeUserInfo(state: State, value: User) {
    state.user = Object.assign({}, state.user, value)
  }
}

export default {
  state,
  getters,
  mutations
}
