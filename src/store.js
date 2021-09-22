import { createStore } from 'vuex'
import * as types from './mutationTypes'

export default createStore({
  state() {
    return {
      items: [],
    }
  },
  mutations: {
    [types.FETCH_RESULTS](state) {
      state.items = [
        {
          id: '1',
          name: 'Test',
          description: 'Test description',
          liked: false,
        },
      ]
    },
  },
})
