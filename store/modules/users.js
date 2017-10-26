const users = {
  namespaced: true,
  state: {
    users: []
  },
  getters: {
    all (state, getters) {
      return state.users
    }
  },
  actions: {
  },
  mutations: {
    reset: function (state, users) {
      state.users = users
    }
  }
}

export default users
