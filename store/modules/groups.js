import axios from '~/plugins/axios'

const groups = {
  namespaced: true,
  state: {
    groups: []
  },
  getters: {
    all (state) {
      return state.groups
    }
  },
  actions: {
    create ({ commit }, group) {
      return axios.post('/groups', { group })
        .then(res => {
          commit('create', res.data.data)
        })
    },
    update ({ commit }, group) {
      return axios.put('/groups', { group })
        .then(res => {
          commit('update', group)
        })
        .catch()
    },
    delete ({ commit }, group) {
    }
  },
  mutations: {
    reset: function (state, groups) {
      state.groups = groups
    },
    create: function (state, group) {
      state.groups.push(group)
    },
    update: function (state, group) {
      const index = state.groups.findIndex(u => u.id === group.id)
      state.groups.splice(index, 1, group)
    }
  }
}

export default groups
