import { createRouter, createWebHistory } from 'vue-router'
import List from '../views/List.vue'
import MyGroup from '@/views/MyGroup.vue'
import About from '../views/About.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list',
      component: List,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/my-group',
      name: 'my-group',
      component: MyGroup,
    }
  ],
})

export default router