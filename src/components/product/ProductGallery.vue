<script setup lang="ts">
import { ref } from 'vue'
import type { ProductSeries } from '@/data/products'
import { assetUrl } from '@/utils/assets'

const props = defineProps<{
  series: ProductSeries
}>()

const active = ref(0)

function select(index: number) {
  active.value = index
}
</script>

<template>
  <div class="gallery">
    <figure class="gallery__main">
      <img
        :src="assetUrl(props.series.gallery[active].imageKey)"
        :alt="`${props.series.name} ${props.series.gallery[active].label}`"
      />
      <figcaption>{{ props.series.gallery[active].label }}</figcaption>
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
        <img :src="assetUrl(item.imageKey)" :alt="item.label" loading="lazy" />
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
  background: #0d1117;
}

.gallery__main figcaption {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0.55rem 0.85rem;
  background: rgba(18, 22, 28, 0.85);
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
</style>
