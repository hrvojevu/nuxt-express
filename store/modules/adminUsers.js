import axios from '~/plugins/axios'

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
    get ({ commit }) {
      return axios.get('/users')
        .then(res => {
          commit('reset', res.data.data)
        })
        .catch((e) => {
          // error({ statusCode: 404, message: 'User not found' })
        })
    },
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
    reset: function (state, users) {
      state.users = users
    },
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
