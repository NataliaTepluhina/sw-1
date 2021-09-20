export default [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/Home.vue'),
  },
  {
    path: '/items/:id',
    name: 'items',
    component: () => import('./views/ItemDetails.vue'),
    props: true,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/Login.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('./views/NotFound.vue'),
  },
]
