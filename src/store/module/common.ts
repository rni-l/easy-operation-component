export interface State {
  isRequestError: Boolean
  environment: String
}

const state: State = {
  isRequestError: false,
  environment: ''
}

// getters
const getters = {}

// mutations
const mutations = {
  updateRequestStatus(state: State, value: Boolean) {
    state.isRequestError = value
  },

  updateEnvironment(state: State, value: String) {
    state.environment = value
  }
}

export default {
  state,
  getters,
  mutations
}
