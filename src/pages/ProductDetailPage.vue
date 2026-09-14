<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { productDetail } from '@/data/products'
import { premiumScenePhotos } from '@/data/premiumMedia'
import { assetUrl } from '@/utils/assets'
import PageBanner from '@/components/common/PageBanner.vue'
import ProductGallery from '@/components/product/ProductGallery.vue'
import SpecTable from '@/components/product/SpecTable.vue'
import PhotoGrid from '@/components/product/PhotoGrid.vue'
import AppButton from '@/components/common/AppButton.vue'

const props = defineProps<{
  series: string
}>()

const router = useRouter()
const product = computed(() => productDetail(props.series))
const isPremium = computed(() => product.value?.id === 'premium')

watchEffect(() => {
  if (!product.value) {
    router.replace('/products')
  }
})

const banner = computed(() =>
  product.value?.id === 'premium' ? assetUrl('thumbPremium') : assetUrl('thumbStandard'),
)
</script>

<template>
  <div v-if="product" class="detail-page">
    <PageBanner eyebrow="PRODUCT" :title="product.name" :image="banner" />
    <section class="section">
      <div class="container detail-layout">
        <ProductGallery :series="product" v-reveal />
        <div class="detail-copy" v-reveal>
          <p class="eyebrow">{{ product.nameEn }}</p>
          <h2 class="display">{{ product.name }}</h2>
          <p class="summary">{{ product.summary }}</p>
          <div class="highlights">
            <article v-for="item in product.highlights" :key="item.ton" class="highlight">
              <h3 class="display tabular">{{ item.title }}</h3>
              <p>{{ item.runtime }}</p>
              <p>{{ item.equipment }}</p>
            </article>
          </div>
          <div class="actions">
            <AppButton to="/counsel">상담 요청</AppButton>
            <AppButton v-if="isPremium" to="/products/premium/details" variant="ghost">
              세부 사진 보기
            </AppButton>
          </div>
        </div>
      </div>
    </section>
    <section class="section spec-section">
      <div class="container">
        <h2 class="display section-title" v-reveal>SPEC</h2>
        <SpecTable :series="product" v-reveal />
      </div>
    </section>
    <section v-if="isPremium" class="section scene-section">
      <div class="container">
        <h2 class="display section-title" v-reveal>현장 사진</h2>
        <p class="scene-lead" v-reveal>고급형 라인의 실사용 환경을 확인하세요.</p>
        <PhotoGrid
          :files="premiumScenePhotos"
          columns="scene"
          fit="cover"
          alt-prefix="고급형 현장"
          v-reveal
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.detail-layout {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: var(--space-7);
  align-items: start;
}

.detail-copy {
  display: grid;
  gap: var(--space-4);
  align-content: start;
}

.detail-copy .display {
  font-size: var(--text-xl);
}

.summary {
  color: var(--text-secondary);
}

.highlights {
  display: grid;
  gap: 0.85rem;
  margin-block: var(--space-3);
}

.highlight {
  padding: 0.95rem 0;
  border-top: 1px solid var(--line);
  display: grid;
  gap: 0.3rem;
}

.highlight:last-child {
  border-bottom: 1px solid var(--line);
}

.highlight .display {
  font-size: var(--text-md);
}

.highlight p {
  color: var(--text-secondary);
  font-size: var(--text-sm);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.spec-section {
  padding-top: 0;
}

.scene-section {
  padding-top: 0;
}

.section-title {
  margin-bottom: var(--space-5);
  font-size: var(--text-lg);
}

.scene-lead {
  margin-top: calc(var(--space-5) * -0.5);
  margin-bottom: var(--space-5);
  color: var(--text-secondary);
  max-width: 36rem;
}

@media (max-width: 960px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }
}
</style>
