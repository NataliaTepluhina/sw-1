import { createStore } from 'vuex'
import * as types from './mutationTypes'
import axios from '../middleware'

export default createStore({
  state() {
    return {
      items: [],
      loading: false,
      error: false,
    }
  },
  mutations: {
    [types.REQUEST_RESULTS](state) {
      state.loading = true
      state.error = null
    },
    [types.RECEIVE_RESULTS_SUCCESS](state, payload) {
      state.loading = false
      state.items = payload
      state.error = false
    },
    [types.RECEIVE_RESULTS_ERROR](state) {
      state.isLoading = false
      state.items = []
      state.error = true
    },
    [types.TOGGLE_LIKE_STATUS](state, id) {
      const item = state.items.find((item) => item.id === id)
      item.liked = !item.liked
    },
  },
  actions: {
    async fetchResults({ commit }, searchTerm) {
      const endpoint = searchTerm.length ? '/breeds/search' : '/breeds'
      commit(types.REQUEST_RESULTS)

      try {
        const response = await axios.get(endpoint, {
          params: {
            limit: 20,
            q: searchTerm,
          },
        })

        const results =
          response?.data.map((result) => ({
            ...result,
            liked: false,
          })) || []

        commit(types.RECEIVE_RESULTS_SUCCESS, results)
      } catch {
        commit(types.RECEIVE_RESULTS_ERROR)
      }
    },
    toggleLikeStatus({ commit }, id) {
      commit(types.TOGGLE_LIKE_STATUS, id)
    },
  },
  getters: {
    numberOfLiked(state) {
      return state.items.filter((item) => item.liked).length
    },
  },
})
