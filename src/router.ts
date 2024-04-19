import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import PlanetView from './views/PlanetView.vue'

const routes = [
  { path: '/', component: HomeView, query: { page: 1 } },
  { path: '/planet/:id', component: PlanetView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router }
