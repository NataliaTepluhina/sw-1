import { createApp } from 'vue'
import App from './App.vue'
import { createRouter } from 'vue-router'
import routes from './routes'
import { createWebHashHistory } from 'vue-router/dist/vue-router.cjs'

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

const app = createApp(App)
app.use(router)

app.mount('#app')
