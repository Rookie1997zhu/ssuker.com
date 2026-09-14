<script setup lang="ts">
import { ref } from 'vue'
import { premiumDetailPhotos } from '@/data/premiumMedia'
import { imageFileUrl, assetUrl } from '@/utils/assets'
import PageBanner from '@/components/common/PageBanner.vue'
import AppButton from '@/components/common/AppButton.vue'
import PhotoGrid from '@/components/product/PhotoGrid.vue'

const banner = assetUrl('thumbPremium')
const active = ref(0)
const photos = premiumDetailPhotos

function select(index: number) {
  active.value = index
}
</script>

<template>
  <div class="premium-details-page">
    <PageBanner eyebrow="PRODUCT" title="고급형 세부 사진" :image="banner" />

    <section class="section">
      <div class="container">
        <div class="viewer" v-reveal>
          <figure class="viewer__main">
            <img
              :src="imageFileUrl(photos[active])"
              :alt="`고급형 세부 ${active + 1}`"
            />
            <figcaption>{{ String(active + 1).padStart(2, '0') }} / {{ photos.length }}</figcaption>
          </figure>
          <div class="viewer__thumbs" role="list">
            <button
              v-for="(file, index) in photos"
              :key="file"
              type="button"
              class="thumb"
              :class="{ 'is-active': index === active }"
              @click="select(index)"
            >
              <img :src="imageFileUrl(file)" :alt="`세부 ${index + 1}`" loading="lazy" />
            </button>
          </div>
        </div>

        <div class="grid-block" v-reveal>
          <h2 class="display section-title">전체 보기</h2>
          <PhotoGrid
            :files="photos"
            columns="detail"
            fit="contain"
            alt-prefix="고급형 세부"
          />
        </div>

        <div class="actions">
          <AppButton to="/products/premium" variant="ghost">고급형으로 돌아가기</AppButton>
          <AppButton to="/counsel">상담 요청</AppButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.viewer {
  display: grid;
  gap: var(--space-4);
  margin-bottom: var(--space-7);
}

.viewer__main {
  margin: 0;
  position: relative;
  border: 1px solid var(--line);
  background: var(--bg-elevated);
  overflow: hidden;
}

.viewer__main img {
  width: 100%;
  aspect-ratio: 16 / 11;
  object-fit: contain;
  background: var(--bg-panel);
}

.viewer__main figcaption {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0.55rem 0.85rem;
  background: rgba(255, 255, 255, 0.92);
  color: var(--text-secondary);
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
}

.viewer__thumbs {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0.55rem;
}

.thumb {
  border: 1px solid var(--line);
  background: var(--bg-elevated);
  padding: 0;
  overflow: hidden;
}

.thumb img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: contain;
  background: var(--bg-panel);
}

.thumb.is-active {
  border-color: var(--accent-strong);
}

.grid-block {
  margin-bottom: var(--space-7);
}

.section-title {
  margin-bottom: var(--space-5);
  font-size: var(--text-lg);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

@media (max-width: 860px) {
  .viewer__thumbs {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
