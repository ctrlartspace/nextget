export default {
  actions: {
    updateTheme({ commit, getters, dispatch }) {
      commit('SET_DARK_THEME', !getters.IS_DARK_THEME)
      dispatch('initTheme')
    },
    initTheme({ getters }) {
      document.documentElement.className = getters.IS_DARK_THEME ? 'dark' : 'light'
    }
  },
  mutations: {
    SET_DARK_THEME: (state, isDarkTheme) => {
      state.isDarkTheme = isDarkTheme
    },
  },
  state: {
    isDarkTheme: false
  },
  getters: {
    IS_DARK_THEME: (state) => state.isDarkTheme,
    GET_LOGO: () => "https://aman3d.pythonanywhere.com/logo.svg"
  }
}
