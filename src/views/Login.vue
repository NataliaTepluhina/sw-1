<template>
  <div>
    <input type="text" v-model="username" />
    <button :disabled="!username.length" @click="login">Login</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
    }
  },
  methods: {
    login() {
      document.cookie = `username=${this.username}`
    },
  },
}
</script>
