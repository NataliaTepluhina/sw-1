import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  routes,
  history: createWebHistory(),
})

router.beforeEach((to, from, next) => {
  const cookies = document.cookie.split(';')
  const isAuthenticated = cookies.some((c) => c.includes('username'))

  if (to.name !== 'login' && !isAuthenticated) {
    next({ name: 'login' })
  } else next()
})

const app = createApp(App)
app.use(router)

app.mount('#app')
