<script>
import axios from './middleware'

export default {
  data() {
    return {
      searchTerm: '',
      searchResults: [],
    }
  },
  computed: {
    endpoint() {
      return this.searchTerm.length ? '/breeds/search' : '/breeds'
    },
  },
  methods: {
    async fetchResults() {
      const response = await axios.get(this.endpoint, {
        params: {
          limit: 20,
          q: this.searchTerm,
        },
      })
      this.searchResults = response?.data || []
    },
  },
  mounted() {
    this.fetchResults()
  },
}
</script>

<template>
  <h1>Smashing Workshop: Lesson 1</h1>
  <section>
    <div>
      <input type="text" v-model="searchTerm" />
      <button @click="fetchResults">Search</button>
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
</style>
