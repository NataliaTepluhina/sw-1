import Home from './views/Home.vue'
import ItemDetails from './views/ItemDetails.vue'

export default [
  { path: '/', component: Home },
  {
    path: '/items',
    component: ItemDetails,
  },
]
