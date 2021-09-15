<script>
import axios from './middleware'

export default {
  data() {
    return {
      searchTerm: '',
      searchResults: [],
      loading: false,
      error: false,
    }
  },
  computed: {
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
  },
  mounted() {
    this.fetchResults()
  },
}
</script>

<template>
  <h1 class="title">Smashing Workshop: Lesson 2</h1>
  <section>
    <div>
      <input type="text" v-model="searchTerm" @keyup.enter="fetchResults" />
      <button @click="fetchResults">Search</button>
      <p v-if="loading">Loading...</p>
      <p v-if="error" class="error">Something went wrong. Please try again</p>
    </div>
    <div>
      <p v-for="result in searchResults" :key="result.id">{{ result.name }}</p>
    </div>
  </section>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.list-item {
  padding: 10px;
  border-bottom: 1px solid lightgray;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
