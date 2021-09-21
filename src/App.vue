<script>
import { onMounted } from 'vue'
import axios from './middleware'
import { useSearch } from './composables/useSearch'

export default {
  setup() {
    const { searchTerm, searchResults, loading, error, fetchResults } =
      useSearch((query) => {
        const endpoint = query.length ? '/breeds/search' : '/breeds'
        return axios
          .get(endpoint, {
            params: {
              limit: 20,
              q: query,
            },
          })
          .then((r) => r.data)
      })

    onMounted(() => {
      fetchResults()
    })

    return {
      searchTerm,
      searchResults,
      fetchResults,
      loading,
      error,
    }
  },
}
</script>

<template>
  {{ searchTerm }}
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
  font-weight: bold;
  color: red;
}
</style>
