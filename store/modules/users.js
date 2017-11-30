import axios from '~/plugins/axios'

const users = {
  namespaced: true,
  state: {
    users: []
  },
  getters: {
    all (state) {
      return state.users.slice().sort((a, b) => {
        if (a.expiryDate < b.expiryDate) return -1
        if (a.expiryDate > b.expiryDate) return 1
        return 0
      })
    },
    admins (state) {
      return state.users.filter(u => u.role === 'admin')
    }
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
          commit('update', user)
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
