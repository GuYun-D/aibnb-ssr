import { createRouter, createWebHistory, createMemoryHistory, createWebHashHistory } from 'vue-router'
import home from '../views/home/index.vue'
import mine from '../views/mine/index.vue'
import login from '../views/login/index.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      title: '',
      keepAlive: false
    }
  }, {
    path: '/mine',
    name: 'mine',
    component: mine,
    meta: {
      title: '',
      keepAlive: false
    }
  }, {
    path: '/login',
    name: 'login',
    component: login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router