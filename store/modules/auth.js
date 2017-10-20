require('whatwg-fetch')

const auth = {
  namespaced: true,
  state: {
    authUser: null
  },
  getters: {
    user (state, getters) {
      return state.authUser
    },
    isAdmin (state, getters) {
      if (state.authUser) return state.authUser.isAdmin
    }
  },
  actions: {
    login ({ commit, redirect }, { email, password }) {
      return fetch('/api/auth/login', {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      }).then(res => {
        if (res.status === 401) {
          throw new Error('Bad credentials')
        } else {
          return res.json()
        }
      }).then(authUser => {
        commit('setUser', authUser)
        redirect('/')
      })
    },
    logout ({ commit, redirect }) {
      return fetch('/api/auth/logout', {
        credentials: 'same-origin',
        method: 'POST'
      }).then(() => {
        commit('setUser', null)
        redirect('/')
      })
    }
  },
  mutations: {
    setUser: function (state, user) {
      state.authUser = user
    }
  }
}

export default auth
