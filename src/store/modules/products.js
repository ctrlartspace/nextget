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
    async fetchProperties({ commit }) {
      return axionInstance({
        method: 'get',
        url: 'properties'
      }).then(response => {
        console.log(response.data.properties);
        commit('SET_PROPERTIES', response.data.properties)
        return Promise.resolve(response)
      }).catch(error => {
        console.log(error);
        return Promise.reject(error)
      })
    },
    async fetchColors({ commit }) {
      return axionInstance({
        method: 'get',
        url: 'colors'
      }).then(response => {
        console.log(response.data.colors);
        commit('SET_COLORS', response.data.colors)
        return Promise.resolve(response)
      }).catch(error => {
        console.log(error);
        return Promise.reject(error)
      })
    },
    async fetchStorages({ commit }) {
      return axionInstance({
        method: 'get',
        url: 'storages'
      }).then(response => {
        console.log(response.data.storages);
        commit('SET_STORAGES', response.data.storages)
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
    },
    async fetchAveragePrice({ commit }, product_id) {
      return axionInstance({
        method: 'get',
        url: `products/${product_id}/average`
      }).then(response => {
        if (response.data.average) {
          commit('SET_AVERAGE_PRICE', response.data.average)
          console.log(response.data.average);
        } else {
          commit('SET_AVERAGE_PRICE', null)
        }
        Promise.resolve(response)
      }).catch(error => {
        commit('SET_AVERAGE_PRICE', null)
        console.log(error.response.data.msg);
        return Promise.reject(error)
      })
    }

  },
  mutations: {
    SET_PRODUCTS: (state, products) => {
      state.products = products
    },
    SET_PROPERTIES: (state, properties) => {
      state.properties = properties
    },
    SET_COLORS: (state, colors) => {
      state.colors = colors
    },
    SET_STORAGES: (state, storages) => {
      state.storages = storages
    },
    SET_CONDITIONS: (state, conditions) => {
      state.conditions = conditions
    },
    SET_EQUIPMENTS: (state, equipments) => {
      state.equipments = equipments
    },
    SET_AVERAGE_PRICE: (state, average_price) => {
      state.average_price = average_price
    }

  },
  state: {
    products: [],
    properties: [],
    colors: [],
    storages: [],
    conditions: [],
    equipments: [],
    average_price: null,
  },
  getters: {
    getProducts: (state) => state.products.reverse(),
    getProperties: (state) => state.properties,
    getColors: (state) => state.colors,
    getStorages: (state) => state.storages,
    getConditions: (state) => state.conditions,
    getEquipments: (state) => state.equipments,
    getAveragePrice: (state) => state.average_price
  }
}