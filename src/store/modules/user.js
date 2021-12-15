import axionInstance from '@/axios-instance'

export default {
  actions: {
    async fetchUser({ commit }) {
      commit('SET_USER', null)
      return axionInstance({
        method: 'get',
        url: 'users/me',
      }).then(response => {
        commit('SET_USER', response.data.user)
        console.log(response.data.user)
        return Promise.resolve(response)
      }).catch(error => {
        commit('SET_USER', null)
        console.log(error)
        return Promise.reject(error)
      })
    }

  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
  },
  state: {
    user: null
  },
  getters: {
    getUser(state) {
      return state.user
    }
  }
}
