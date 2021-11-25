import axiosInstance from '@/axios-instance'


export default {
  actions: {
    async login({ dispatch }, auth) {
      return await axiosInstance({
        method: 'post',
        url: 'login',
        auth: auth
      }).then(response => {
        dispatch('saveToken', response.data.token)
        return Promise.resolve(response)
      }).catch(error => {
        console.log(error)
        dispatch('logout')
        return Promise.reject(error)
      })
    },
    async logout({ commit }) {
      commit('SET_TOKEN', {})
      console.log('logout');
    },
    async register(_, registerData) {
      return await axiosInstance({
        method: 'post',
        url: 'register',
        data: registerData
      }).then(response => {
        console.log(response)
        return Promise.resolve(response)
      }).catch(error => {
        console.log(error)
        return Promise.reject(error)
      })

    },
    async saveToken({ commit }, token) {
      commit('SET_TOKEN', token)
    },

    setLoading({ commit }, loading) {
      commit('SET_LOADING', loading)
    }

  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    }
  },
  state: {
    token: {},
    loading: false
  },
  getters: {
    TOKEN: (state) => state.token,
    IS_AUTHENTIFICATED: (state) => Object.keys(state.token).length > 0,
    IS_LOADING: (state) => state.loading
  }
}
