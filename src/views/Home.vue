<script>
import axios from '../middleware'
import ListItem from '../components/ListItem.vue'
import { mapState } from 'vuex'

export default {
  components: {
    ListItem,
  },
  data() {
    return {
      searchTerm: '',
      loading: false,
      error: false,
    }
  },
  computed: {
    ...mapState({
      searchResults: (state) => state.items,
    }),
    endpoint() {
      return this.searchTerm.length ? '/breeds/search' : '/breeds'
    },
  },
  methods: {
    async fetchResults() {
      this.loading = true
      this.error = false
      try {
        const response = await axios.get(this.endpoint, {
          params: {
            limit: 20,
            q: this.searchTerm,
          },
        })
        this.searchResults =
          response?.data.map((result) => ({
            ...result,
            liked: false,
          })) || []
      } catch {
        this.error = true
        this.searchResults = []
      } finally {
        this.loading = false
      }
    },
    toggleLikeStatus(result) {
      result.liked = !result.liked
    },
  },
  created() {
    this.$store.commit('fetchResults')
  },
}
</script>

<template>
  <section>
    <div>
      <input type="text" v-model="searchTerm" @keyup.enter="fetchResults" />
      <button @click="fetchResults">Search</button>
      <p v-if="loading">Loading...</p>
      <p v-if="error" class="error">Something went wrong. Please try again</p>
    </div>
    <div>
      <div v-for="result in searchResults" :key="result.id">
        <list-item
          :result="result"
          @toggleLikeStatus="toggleLikeStatus(result)"
        ></list-item>
      </div>
    </div>
  </section>
</template>
