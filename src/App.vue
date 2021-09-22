<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['numberOfLiked']),
  },
}
</script>

<template>
  <h1 class="title">Smashing Workshop: Lesson 2</h1>
  Liked characters: {{ numberOfLiked }}
  <div>
    <router-link :to="{ name: 'home' }">Home</router-link>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  text-align: center;
}
</style>
