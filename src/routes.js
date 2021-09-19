import Home from './views/Home.vue'
import ItemDetails from './views/ItemDetails.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/items',
    name: 'item',
    component: ItemDetails,
  },
]
