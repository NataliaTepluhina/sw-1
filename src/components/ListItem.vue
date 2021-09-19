<script>
export default {
  props: {
    result: {
      type: Object,
      required: true,
    },
  },
  emits: ['toggleLikeStatus'],
}
</script>

<template>
  <div class="list-item" :class="{ liked: result.liked }">
    <h3>
      <a :href="result.wikipedia_url">{{ result.name }}</a>
    </h3>
    <p>
      {{ result.description }}
    </p>
    <button @click="$emit('toggleLikeStatus')">
      {{ result.liked ? 'Unlike' : 'Like' }}
    </button>
  </div>
</template>

<style scoped>
.list-item {
  padding: 10px;
  border-bottom: 1px solid lightgray;
}

.liked {
  background-color: lightcyan;
}
</style>
