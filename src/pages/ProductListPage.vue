<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { productList } from '@/data/products'
import { assetUrl, assetSize } from '@/utils/assets'
import PageBanner from '@/components/common/PageBanner.vue'

const products = productList()
</script>

<template>
  <div class="products-page">
    <PageBanner eyebrow="PRODUCT" title="제품 라인업" image-key="hero2" />
    <section class="section">
      <div class="container product-grid">
        <RouterLink
          v-for="item in products"
          :key="item.id"
          :to="`/products/${item.id}`"
          class="product-card"
          v-reveal
        >
          <img
            :src="assetUrl(item.thumbKey)"
            :alt="item.name"
            loading="lazy"
            decoding="async"
            :width="assetSize(item.thumbKey)?.width"
            :height="assetSize(item.thumbKey)?.height"
          />
          <div class="product-card__body">
            <p class="eyebrow">{{ item.nameEn }}</p>
            <h2 class="display">{{ item.name }}</h2>
            <p>{{ item.summary }}</p>
          </div>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
}

.product-card {
  display: grid;
  border: 1px solid var(--line);
  background: var(--bg-elevated);
  overflow: hidden;
  transition: border-color var(--duration-fast) var(--ease-out);
}

.product-card:hover {
  border-color: var(--accent);
}

.product-card img {
  width: 100%;
  aspect-ratio: 16 / 11;
  object-fit: cover;
}

.product-card__body {
  padding: var(--space-5);
  display: grid;
  gap: 0.65rem;
}

.product-card__body .display {
  font-size: var(--text-lg);
}

.product-card__body p:last-child {
  color: var(--text-secondary);
}

@media (max-width: 900px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>
