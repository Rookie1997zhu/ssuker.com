<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ProductSeries } from '@/data/products'
import { assetUrl, assetSize } from '@/utils/assets'

const props = defineProps<{
  series: ProductSeries
}>()

const active = ref(0)

const activeItem = computed(() => props.series.gallery[active.value])
const activeSrc = computed(() => assetUrl(activeItem.value.imageKey))
const activeSize = computed(() => assetSize(activeItem.value.imageKey))

function select(index: number) {
  active.value = index
}
</script>

<template>
  <div class="gallery">
    <figure class="gallery__main">
      <img
        :src="activeSrc"
        :alt="`${props.series.name} ${activeItem.label}`"
        decoding="async"
        fetchpriority="high"
        :width="activeSize?.width"
        :height="activeSize?.height"
      />
      <figcaption>{{ activeItem.label }}</figcaption>
    </figure>
    <div class="gallery__thumbs" role="list">
      <button
        v-for="(item, index) in props.series.gallery"
        :key="item.id"
        type="button"
        class="thumb"
        :class="{ 'is-active': index === active }"
        @click="select(index)"
      >
        <img
          :src="assetUrl(item.imageKey)"
          :alt="item.label"
          loading="lazy"
          decoding="async"
          :width="assetSize(item.imageKey)?.width"
          :height="assetSize(item.imageKey)?.height"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.gallery {
  display: grid;
  gap: var(--space-4);
}

.gallery__main {
  margin: 0;
  position: relative;
  border: 1px solid var(--line);
  background: var(--bg-elevated);
  overflow: hidden;
}

.gallery__main img {
  width: 100%;
  aspect-ratio: 16 / 11;
  object-fit: contain;
  background: var(--bg-panel);
}

.gallery__main figcaption {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0.55rem 0.85rem;
  background: rgba(255, 255, 255, 0.92);
  color: var(--text-secondary);
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
}

.gallery__thumbs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.65rem;
}

.thumb {
  border: 1px solid var(--line);
  padding: 0;
  overflow: hidden;
  background: var(--bg-elevated);
}

.thumb.is-active {
  border-color: var(--accent);
}

.thumb img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}

@media (max-width: 900px) {
  .gallery__thumbs {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 600px) {
  .gallery__thumbs {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
