import axionInstance from '@/axios-instance'

export default {
  actions: {
    async fetchListings({ commit }, query_params) {
      commit('SET_LISTINGS', null)
      commit('SET_PAGINATION', null)
      return axionInstance({
        method: 'get',
        url: `listings?page=${query_params.page}&model=${query_params.model}&storage=${query_params.storage}&color=${query_params.color}&condition=${query_params.condition}`
      }).then(response => {
        commit('SET_LISTINGS', response.data.listings)
        commit('SET_PAGINATION', response.data.pagination)
        return Promise.resolve(response)
      }).catch(error => {
        console.log(error);
        commit('SET_LISTINGS', null)
        commit('SET_PAGINATION', null)
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
      commit('SET_LISTING_IMAGES', [])
      return axionInstance({
        method: 'get',
        url: `listings/${id}`
      }).then(response => {
        commit('SET_LISTING', response.data.listing)
        commit('SET_LISTING_IMAGES', response.data.listing.images)
        return Promise.resolve(response)
      }).catch(error => {
        console.log(error);
        commit('SET_LISTING', null)
        commit('SET_LISTING_IMAGES', [])
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
        console.log(error)
        return Promise.reject(error)
      })
    },
    async uploadImages(_, payloads) {
      return axionInstance({
        method: 'post',
        url: `listings/${payloads.id}/images`,
        data: payloads.formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(response => {
        return Promise.resolve(response)
      }).catch(error => {
        return Promise.reject(error)
      })
    },
    async fetchListingImages({ commit }, id) {
      commit('SET_LISTING_IMAGES', [])
      return axionInstance({
        method: 'get',
        url: `listings/${id}/images`
      }).then(response => {
        commit('SET_LISTING_IMAGES', response.data.listing_images)
        return Promise.resolve(response)
      }).catch(error => {
        console.log(error);
        commit('SET_LISTING_IMAGES', [])
        return Promise.reject(error)
      })
    },
    async addComment(_, payloads) {
      return axionInstance({
        method: 'post',
        url: `listings/${payloads.id}/comments`,
        data: payloads.comment,
      }).then(response => {
        return Promise.resolve(response)
      }).catch(error => {
        return Promise.reject(error)
      })
    },
    async deleteComment(_, id) {
      return axionInstance({
        method: 'post',
        url: `listings/comments/${id}`,
      }).then(response => {
        return Promise.resolve(response)
      }).catch(error => {
        return Promise.reject(error)
      })
    },
    async fetchComments({ commit }, id) {
      // commit('SET_LISTING_COMMENTS', [])
      return axionInstance({
        method: 'get',
        url: `listings/${id}/comments`
      }).then(response => {
        commit('SET_LISTING_COMMENTS', response.data.listing_comments)
        return Promise.resolve(response)
      }).catch(error => {
        console.log(error);
        commit('SET_LISTING_COMMENTS', [])
        return Promise.reject(error)
      })
    },
    resetListings({ commit }) {
      console.log('set null');
      commit('SET_LISTINGS', null)
    }
  },
  mutations: {
    SET_LISTINGS: (state, listings) => {
      console.log(listings);
      state.listings = listings
    },
    SET_LISTING: (state, listing) => {
      state.listing = listing
    },
    SET_LISTING_IMAGES: (state, listing_images) => {
      state.listing_images = listing_images
    },
    SET_LISTING_COMMENTS: (state, listing_comments) => {
      state.listing_comments = listing_comments
    },
    SET_PAGINATION: (state, pagination) => {
      state.pagination = pagination
    }
  },
  state: {
    listings: null,
    listing: null,
    listing_images: [],
    listing_comments: [],
    pagination: null
  },
  getters: {
    getListings: (state) => state.listings,
    getListingsByProductModel: (state) => (product_id) => state.listings.filter((elem) => elem.product.id === product_id),
    getListing: (state) => state.listing,
    getProductModels: (state) => state.listings.filter((elem, index) => state.listings.findIndex(obj => obj.product.id == elem.product.id) === index),
    getAveragePrice_OLD: (state, getters) => (product_id) => getters.getListingsByProductModel(product_id).reduce((p, c, _, { length }) => Math.round((p + c.price) / length), 0),
    getListingImages: (state) => state.listing_images,
    getListingComments: (state) => state.listing_comments,
    getPagination: (state) => state.pagination
  }
}