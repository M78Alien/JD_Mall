import { createRouter, createWebHistory } from 'vue-router'
import loginPage from '@/views/Login/loginPage.vue'
import layoutPage from '@/views/Layout/layoutPage.vue'
import homePage from '@/views/Home/homePage.vue'
import categoryPage from '@/views/Category/categoryPage.vue'
import ProductPage from '@/views/ProductDetail/productPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: layoutPage,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: homePage
        },
        {
          path: '/category/:id',
          component: categoryPage
        },
        {
          path: '/product/:id',
          component: ProductPage
        }
      ]
    },
    {
      path: '/login',
      component: loginPage
    }
  ]
})

export default router
