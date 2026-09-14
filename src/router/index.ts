import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: '/company',
      name: 'company',
      component: () => import('@/pages/CompanyPage.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/pages/ProductListPage.vue'),
    },
    {
      path: '/products/premium/details',
      name: 'product-premium-details',
      component: () => import('@/pages/PremiumDetailPhotosPage.vue'),
    },
    {
      path: '/products/:series',
      name: 'product-detail',
      component: () => import('@/pages/ProductDetailPage.vue'),
      props: true,
    },
    {
      path: '/counsel',
      name: 'counsel',
      component: () => import('@/pages/CounselPage.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/pages/ContactPage.vue'),
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('@/pages/NewsListPage.vue'),
    },
    {
      path: '/news/:id',
      name: 'news-detail',
      component: () => import('@/pages/NewsDetailPage.vue'),
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
