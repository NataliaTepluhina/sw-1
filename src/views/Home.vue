<script>
import ListItem from '../components/ListItem.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    ListItem,
  },
  data() {
    return {
      searchTerm: '',
    }
  },
  computed: {
    ...mapState(['items', 'loading', 'error']),
  },
  methods: {
    ...mapActions(['fetchResults', 'toggleLikeStatus']),
  },
  created() {
    if (this.items.length === 0) {
      this.fetchResults(this.searchTerm)
    }
  },
}
</script>

<template>
  <section>
    <div>
      <input type="text" v-model="searchTerm" @keyup.enter="fetchResults" />
      <button @click="fetchResults(searchTerm)">Search</button>
      <p v-if="loading">Loading...</p>
      <p v-if="error" class="error">Something went wrong. Please try again</p>
    </div>
    <div>
      <div v-for="result in items" :key="result.id">
        <list-item
          :result="result"
          @toggleLikeStatus="toggleLikeStatus(result.id)"
        ></list-item>
      </div>
    </div>
  </section>
</template>
