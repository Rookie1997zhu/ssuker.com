<script setup lang="ts">
import { imageFileUrl } from '@/utils/assets'

const props = defineProps<{
  files: readonly string[]
  fit?: 'cover' | 'contain'
  columns?: 'scene' | 'detail'
  altPrefix?: string
}>()
</script>

<template>
  <div class="photo-grid" :class="`is-${props.columns ?? 'scene'}`">
    <figure v-for="(file, index) in props.files" :key="file" class="photo-grid__item">
      <img
        :src="imageFileUrl(file)"
        :alt="`${props.altPrefix ?? 'SSUKER'} ${index + 1}`"
        loading="lazy"
        :class="`fit-${props.fit ?? 'cover'}`"
      />
    </figure>
  </div>
</template>

<style scoped>
.photo-grid {
  display: grid;
  gap: 0.75rem;
}

.photo-grid.is-scene {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.photo-grid.is-detail {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.photo-grid__item {
  margin: 0;
  border: 1px solid var(--line);
  background: var(--bg-elevated);
  overflow: hidden;
}

.photo-grid__item img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  background: var(--bg-panel);
}

.photo-grid__item img.fit-cover {
  object-fit: cover;
}

.photo-grid__item img.fit-contain {
  object-fit: contain;
}

@media (max-width: 960px) {
  .photo-grid.is-scene,
  .photo-grid.is-detail {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .photo-grid.is-scene,
  .photo-grid.is-detail {
    grid-template-columns: 1fr;
  }
}
</style>
