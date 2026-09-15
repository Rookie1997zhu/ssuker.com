import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vReveal } from './directives/reveal'
import { applyPageSeo } from './composables/usePageSeo'
import { newsDetail } from './data/news'
import { productDetail } from './data/products'
import { siteMeta } from './data/site'
import { initAnalytics, trackEvent, trackPageView } from './utils/analytics'
import './styles/base.css'

const app = createApp(App)
app.directive('reveal', vReveal)
app.use(router)

initAnalytics()

router.afterEach((to) => {
  const override: Parameters<typeof applyPageSeo>[1] = {}

  if (to.name === 'not-found') {
    override.title = `페이지를 찾을 수 없습니다 | ${siteMeta.brand}`
    override.description = '요청하신 페이지를 찾을 수 없습니다.'
  }

  if (to.name === 'product-detail' && typeof to.params.series === 'string') {
    const product = productDetail(to.params.series)
    if (product) {
      override.jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.summary,
        brand: {
          '@type': 'Brand',
          name: siteMeta.brand,
        },
      }
    }
  }

  if (to.name === 'news-detail' && typeof to.params.id === 'string') {
    const news = newsDetail(to.params.id)
    if (news) {
      override.title = `${news.title} | ${siteMeta.brand}`
      override.description = news.summary
    }
  }

  applyPageSeo(to.path, override)
  trackPageView(to.fullPath)

  if (to.name === 'product-premium-details' || to.name === 'product-standard-details') {
    trackEvent('view_detail_photos', { path: to.path })
  }
  if (to.name === 'counsel') {
    trackEvent('open_counsel', { path: to.path })
  }
})

app.mount('#app')
