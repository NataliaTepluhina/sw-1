<script>
import axios from './middleware'

export default {
  data() {
    return {
      searchTerm: '',
      searchResults: [],
      headerColor: 'red',
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
  <label for="header-color">Change the title color</label>
  <input type="color" id="header-color" v-model="headerColor" />
  <h1 class="title">Smashing Workshop: Lesson 1</h1>
  <section>
    <div>
      <input type="text" v-model="searchTerm" @keyup.enter="fetchResults" />
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

.title {
  color: v-bind(headerColor);
}
</style>
