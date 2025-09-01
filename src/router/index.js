import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import BusinessesList from '../components/BusinessesList.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/businesses',
    name: 'BusinessesList',
    component: BusinessesList
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
