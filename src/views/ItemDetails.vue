<script>
import axios from '../middleware'

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      item: {},
      imageUrl: null,
    }
  },
  async created() {
    const response = await axios.get('/images/search', {
      params: {
        breed_id: this.id,
      },
    })

    this.item = response.data[0].breeds[0]
    this.imageUrl = response.data[0].url
    this.loading = false
  },
}
</script>

<template>
  <p v-if="loading">Loading...</p>
  <template v-else>
    <h1>{{ item.name }}</h1>
    <img :src="imageUrl" :alt="item.name" class="image" />
    <p>Origin: {{ item.origin }}</p>
    <p>Temperament: {{ item.temperament }}</p>
  </template>
</template>

<style scoped>
.image {
  display: block;
  max-width: 350px;
  margin: 0 auto;
}
</style>
