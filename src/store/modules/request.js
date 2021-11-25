export default {
  actions: {
    cancelPendingRequest(context) {
      context.state.cancelTokens.forEach((request) => {
        if (request.cancel) {
          request.cancel()
        }
      })
      context.commit('CLEAR_CANCEL_TOKENS')
    }
  },
  mutations: {
    ADD_CANCEL_TOKEN(state, cancelToken) {
      state.cancelTokens.push(cancelToken)
    },
    CLEAR_CANCEL_TOKENS(state) {
      state.cancelTokens = []
    }
  },
  state: {
    cancelTokens: []
  },
  getters: {
    GET_CANCEL_TOKENS: (state) => state.cancelTokens
  }
}
