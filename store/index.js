import Vuex from 'vuex'
import modules from './modules'

const store = () => {
  return new Vuex.Store({
    actions: {
      nuxtServerInit ({ commit }, { req }) {
        if (req.session && req.session.authUser) {
          commit('auth/setUser', req.session.authUser)
        } else commit('auth/setUser', null)
      }
    },
    modules
  })
}

export default store
