<script>
import axios from './middleware'
import ApiHandler from './components/ApiHandler.vue'

export default {
  components: {
    ApiHandler,
  },
  data() {
    return {
      searchTerm: '',
    }
  },
  getResults(searchTerm) {
    return axios.get(searchTerm.length ? '/breeds/search' : '/breeds', {
      params: {
        q: searchTerm,
        limit: 20,
      },
    })
  },
  methods: {
    transformResponse(response) {
      return (
        response?.data?.map((result) => ({
          ...result,
          liked: false,
        })) || []
      )
    },
  },
}
</script>

<template>
  <h1 class="title">Smashing Workshop: Lesson 2</h1>
  <section>
    <api-handler :searchTerm="searchTerm" :getResults="$options.getResults">
      <template #default="{ loading, error, searchResults, runSearch }">
        <div>
          <input type="text" v-model="searchTerm" @keyup.enter="fetchResults" />
          <button @click="runSearch">Search</button>
          <p v-if="loading">Loading...</p>
          <p v-if="error" class="error">
            Something went wrong. Please try again
          </p>
        </div>
        <div>
          <p
            v-for="result in transformResponse(searchResults)"
            :key="result.id"
          >
            {{ result.name }}
          </p>
        </div>
      </template>
    </api-handler>
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

.error {
  font-weight: bold;
  color: red;
}
</style>
