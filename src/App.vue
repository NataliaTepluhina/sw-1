<script setup lang="ts">
import { computed, ref } from '@vue/reactivity'
import axios from './middleware'
import { onMounted } from '@vue/runtime-core'

const searchTerm = ref('')
const searchResults = ref([])
const headerColor = ref('#ff0000')

const endpoint = computed(() =>
  searchTerm.value.length ? '/breeds/search' : '/breeds'
)

async function fetchResults() {
  const response = await axios.get(endpoint.value, {
    params: {
      limit: 20,
      q: searchTerm.value,
    },
  })
  searchResults.value = response?.data || []
}

onMounted(() => {
  fetchResults()
})
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
