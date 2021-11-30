import axionInstance from '@/axios-instance'

export default {
  actions: {
    async fetchProducts({ commit }) {
      return axionInstance({
        method: 'get',
        url: 'products'
      }).then(response => {
        console.log(response.data.products);
        commit('SET_PRODUCTS', response.data.products)
        return Promise.resolve(response)
      }).catch(error => {
        console.log(error);
        return Promise.reject(error)
      })
    },
    async fetchConditions({ commit }) {
      return axionInstance({
        method: 'get',
        url: 'conditions'
      }).then(response => {
        console.log(response.data.conditions);
        commit('SET_CONDITIONS', response.data.conditions)
        return Promise.resolve(response)
      }).catch(error => {
        console.log(error);
        return Promise.reject(error)
      })
    },
    async fetchEquipments({ commit }) {
      return axionInstance({
        method: 'get',
        url: 'equipments'
      }).then(response => {
        console.log(response.data.equipments);
        commit('SET_EQUIPMENTS', response.data.equipments)
        return Promise.resolve(response)
      }).catch(error => {
        console.log(error);
        return Promise.reject(error)
      })
    }

  },
  mutations: {
    SET_PRODUCTS: (state, products) => {
      state.products = products
    },
    SET_CONDITIONS: (state, conditions) => {
      state.conditions = conditions
    },
    SET_EQUIPMENTS: (state, equipments) => {
      state.equipments = equipments
    }

  },
  state: {
    products: [],
    conditions: [],
    equipments: []
  },
  getters: {
    getProducts: (state) => state.products.reverse(),
    getConditions: (state) => state.conditions,
    getEquipments: (state) => state.equipments
  }
}