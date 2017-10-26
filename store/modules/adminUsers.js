import axios from '~/plugins/axios'

const users = {
  namespaced: true,
  state: {
    users: []
  },
  getters: {
  },
  actions: {
    create ({ commit }, user) {
      return axios.post('/users', { user })
        .then(res => {
          commit('create', res.data.data)
        })
    },
    update ({ commit }, user) {
      return axios.put('/users', { user })
        .then(res => {
          commit('update', res.data.data)
        })
        .catch((e) => {
          // error({ statusCode: 404, message: 'User not found' })
        })
    },
    delete ({ commit }, user) {
    }
  },
  mutations: {
    create: function (state, user) {
      state.users.push(user)
    },
    update: function (state, user) {
      const index = state.users.findIndex(u => u.id === user.id)
      state.users.splice(index, 1, user)
    }
  }
}

export default users
