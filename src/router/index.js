import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/components/LandingPage.vue'
import BusinessesList from '../components/BusinessesList.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/businesses',
    name: 'BusinessesList',
    component: BusinessesList
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../components/Login.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
