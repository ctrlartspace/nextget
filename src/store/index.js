import { createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth'
import user from './modules/user'
import request from './modules/request'
import products from './modules/products'
import listings from './modules/listings'

const store = createStore({
  modules: {
    auth,
    user,
    request,
    products,
    listings
  },
  plugins: [createPersistedState({
    paths: ['auth'],
  })],
})
export default store;