import axios from '~/plugins/axios'

const auth = {
  namespaced: true,
  state: {
    authUser: null
  },
  getters: {
    user (state, getters) {
      return state.authUser
    },
    isSuperuser (state, getters) {
      return state.authUser.role === 'superuser'
    }
  },
  actions: {
    login ({ commit }, { username, password }) {
      return axios.post('/auth', { username, password })
        .then(res => {
          commit('setUser', res.data)
        }).catch(err => {
          return Promise.reject(err.response.data.error)
        })
    },
    logout ({ commit }) {
      return axios.delete('/auth')
        .then(() => {
          commit('setUser', null)
        })
    },
    update ({ commit }, user) {
      return axios.put('/auth', { user })
        .then(res => {
          commit('setUser', user)
        })
        .catch((e) => {})
    }
  },
  mutations: {
    setUser: function (state, user) {
      state.authUser = user
    }
  }
}

export default auth
