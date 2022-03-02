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
    async fetchListingsCount({ commit }, query_params) {
      // commit('SET_LISTINGS_COUNT', 0)
      return axionInstance({
        method: 'get',
        url: `listings/count?model=${query_params.model}&storage=${query_params.storage}&color=${query_params.color}&condition=${query_params.condition}`
      }).then(response => {
        commit('SET_LISTINGS_COUNT', response.data.listings_count)
        console.log(response.data.listings_count)
        return Promise.resolve(response)
      }).catch(error => {
        console.log(error);
        commit('SET_LISTINGS_COUNT', 0)
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
    async fetchListing({ commit }, payloads) {
      commit('SET_LISTING', null)
      commit('SET_LISTING_IMAGES', [])
      return axionInstance({
        method: 'get',
        url: `listings/${payloads.id}`
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
    async createListing(_, payloads) {
      return axionInstance({
        method: 'post',
        url: 'listings',
        data: payloads
      }).then(response => {
        return Promise.resolve(response)
      }).catch(error => {
        console.log(error);
        return Promise.reject(error)
      })
    },
    async updateListing({ commit }, payloads) {
      return axionInstance({
        method: 'put',
        url: `listings/${payloads.id}`,
        data: payloads
      }).then(response => {
        console.log(response.data)
        commit('SET_LISTING', response.data.comment.listing)
        commit('ADD_COMMENT', response.data.comment)
        return Promise.resolve(response)
      }).catch(error => {
        console.log(error)
        return Promise.reject(error)
      })
    },
    async deleteListing(_, payloads) {
      return axionInstance({
        method: 'delete',
        url: `listings/${payloads.id}`
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
    async fetchListingImages({ commit }, payloads) {
      commit('SET_LISTING_IMAGES', [])
      return axionInstance({
        method: 'get',
        url: `listings/${payloads.id}/images`
      }).then(response => {
        commit('SET_LISTING_IMAGES', response.data.listing_images)
        return Promise.resolve(response)
      }).catch(error => {
        console.log(error);
        commit('SET_LISTING_IMAGES', [])
        return Promise.reject(error)
      })
    },
    async addComment({ commit }, payloads) {
      return axionInstance({
        method: 'post',
        url: `listings/${payloads.id}/comments`,
        data: payloads.comment,
      }).then(response => {
        commit('ADD_COMMENT', response.data.comment)
        return Promise.resolve(response)
      }).catch(error => {
        return Promise.reject(error)
      })
    },
    async deleteComment({ commit }, payloads) {
      return axionInstance({
        method: 'delete',
        url: `listings/comments/${payloads.id}`,
      }).then(response => {
        commit('DELETE_COMMENT', payloads.id)
        return Promise.resolve(response)
      }).catch(error => {
        return Promise.reject(error)
      })
    },
    async fetchComments({ commit }, payloads) {
      commit('SET_LISTING_COMMENTS', [])
      return axionInstance({
        method: 'get',
        url: `listings/${payloads.id}/comments`
      }).then(response => {
        commit('SET_LISTING_COMMENTS', response.data.listing_comments)
        console.log(response.data.listing_comments)
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
      state.listings = listings
    },
    SET_LISTINGS_COUNT: (state, listings_count) => {
      state.listings_count = listings_count
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
    ADD_COMMENT: (state, comment) => {
      state.listing_comments.push(comment)
    },
    DELETE_COMMENT: (state, id) => {
      const index = state.listing_comments.findIndex(comment => comment.id == id);
      state.listing_comments.splice(index, 1);
    },
    SET_PAGINATION: (state, pagination) => {
      state.pagination = pagination
    }
  },
  state: {
    listings: null,
    listings_count: 0,
    listing: null,
    listing_images: [],
    listing_comments: [],
    pagination: null
  },
  getters: {
    getListings: (state) => state.listings,
    getListingsCount: (state) => state.listings_count,
    getListingsByProductModel: (state) => (product_id) => state.listings.filter((elem) => elem.product.id === product_id),
    getListing: (state) => state.listing,
    getProductModels: (state) => state.listings.filter((elem, index) => state.listings.findIndex(obj => obj.product.id == elem.product.id) === index),
    getAveragePrice_OLD: (state, getters) => (product_id) => getters.getListingsByProductModel(product_id).reduce((p, c, _, { length }) => Math.round((p + c.price) / length), 0),
    getListingImages: (state) => state.listing_images,
    getListingComments: (state) => state.listing_comments,
    getPagination: (state) => state.pagination
  }
}