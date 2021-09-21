import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      items: [],
    }
  },
  mutations: {
    fetchResults(state) {
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
