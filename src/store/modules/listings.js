import axionInstance from '@/axios-instance'

export default {
  actions: {
    async fetchListings({ commit }) {
      commit('SET_LISTINGS', null)
      return axionInstance({
        method: 'get',
        url: 'listings'
      }).then(response => {
        commit('SET_LISTINGS', response.data.listings)
        return Promise.resolve(response)
      }).catch(error => {
        console.log(error);
        commit('SET_LISTINGS', null)
        return Promise.reject(error)
      })
    },
    async fetchMyListings({ commit }) {
      commit('SET_LISTINGS', null)
      return axionInstance({
        method: 'get',
        url: 'listings/me'
      }).then(response => {
        commit('SET_LISTINGS', response.data.listings)
        return Promise.resolve(response)
      }).catch(error => {
        console.log(error);
        commit('SET_LISTINGS', null)
        return Promise.reject(error)
      })
    },
    async fetchListing({ commit }, id) {
      commit('SET_LISTING', null)
      return axionInstance({
        method: 'get',
        url: `listings/${id}`
      }).then(response => {
        commit('SET_LISTING', response.data.listing)
        return Promise.resolve(response)
      }).catch(error => {
        console.log(error);
        commit('SET_LISTING', null)
        return Promise.reject(error)
      })
    },
    async createListing(_, listingData) {
      return axionInstance({
        method: 'post',
        url: 'listings',
        data: listingData
      }).then(response => {
        return Promise.resolve(response)
      }).catch(error => {
        console.log(error);
        return Promise.reject(error)
      })
    },
    async deleteListing(_, id) {
      return axionInstance({
        method: 'delete',
        url: `listings/${id}`
      }).then(response => {
        return Promise.resolve(response)
      }).catch(error => {
        console.log(error);
        return Promise.reject(error)
      })
    }
  },
  mutations: {
    SET_LISTINGS: (state, listings) => {
      state.listings = listings
    },
    SET_LISTING: (state, listing) => {
      state.listing = listing
    }
  },
  state: {
    listings: null,
    listing: null
  },
  getters: {
    getListings: (state) => state.listings,
    getListingsByProductModel: (state) => (product_id) => state.listings.filter((elem) => elem.product.id === product_id),
    getListing: (state) => state.listing,
    getProductModels: (state) => state.listings.filter((elem, index) => state.listings.findIndex(obj => obj.product.id == elem.product.id) === index),
    getAveragePrice: (state, getters) => (product_id) => getters.getListingsByProductModel(product_id).reduce((p, c, _, { length }) => Math.round((p + c.price) / length), 0)
  }
}