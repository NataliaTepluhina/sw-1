<script>
import { computed, ref } from '@vue/reactivity'
import axios from './middleware'
import { onMounted } from '@vue/runtime-core'

export default {
  setup() {
    const searchTerm = ref('')
    const searchResults = ref([])
    const loading = ref(false)
    const error = ref(false)

    const endpoint = computed(() =>
      searchTerm.value.length ? '/breeds/search' : '/breeds'
    )

    async function fetchResults() {
      loading.value = true
      error.value = false
      try {
        const response = await axios.get(endpoint.value, {
          params: {
            limit: 20,
            q: searchTerm.value,
          },
        })
        searchResults.value =
          response?.data.map((result) => ({
            ...result,
            liked: false,
          })) || []
      } catch {
        error.value = true
        searchResults.value = []
      } finally {
        loading.value = false
      }
    }

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

.title {
  color: v-bind(headerColor);
}

.error {
  font-weight: bold;
  color: red;
}
</style>
