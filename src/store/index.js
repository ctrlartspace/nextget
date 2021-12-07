import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth'
import user from './modules/user'
import request from './modules/request'
import products from './modules/products'
import listings from './modules/listings'
import theme from './modules/theme'

const store = createStore({
  modules: {
    auth,
    user,
    request,
    products,
    listings,
    theme
  },
  plugins: [createPersistedState({
    paths: ['auth', 'theme'],
  })],
})
export default store;