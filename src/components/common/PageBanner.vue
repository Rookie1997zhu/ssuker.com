<script setup lang="ts">
import { computed } from 'vue'
import type { ImageKey } from '@/data/site'
import { assetUrl, assetSize } from '@/utils/assets'

const props = defineProps<{
  eyebrow: string
  title: string
  imageKey?: ImageKey
  /** @deprecated Prefer imageKey so width/height can be resolved. */
  image?: string
}>()

const imageSrc = computed(() => {
  if (props.imageKey) return assetUrl(props.imageKey)
  return props.image
})

const imageDim = computed(() => (props.imageKey ? assetSize(props.imageKey) : undefined))
</script>

<template>
  <section class="page-banner">
    <div v-if="imageSrc" class="page-banner__media" aria-hidden="true">
      <img
        :src="imageSrc"
        alt=""
        loading="eager"
        decoding="async"
        fetchpriority="high"
        :width="imageDim?.width"
        :height="imageDim?.height"
      />
    </div>
    <div class="page-banner__veil" aria-hidden="true" />
    <div class="container page-banner__content">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1 class="display">{{ title }}</h1>
    </div>
  </section>
</template>

<style scoped>
.page-banner {
  position: relative;
  min-height: clamp(220px, 32vw, 360px);
  display: grid;
  align-items: end;
  overflow: hidden;
  border-bottom: 1px solid var(--line);
}

.page-banner__media,
.page-banner__veil {
  position: absolute;
  inset: 0;
}

.page-banner__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.85) contrast(1.05);
}

.page-banner__veil {
  background:
    linear-gradient(180deg, rgba(245, 247, 250, 0.45), rgba(245, 247, 250, 0.92)),
    linear-gradient(90deg, rgba(2, 56, 122, 0.14), transparent 55%);
}

.page-banner__content {
  position: relative;
  z-index: 1;
  padding-block: var(--space-8) var(--space-6);
  display: grid;
  gap: var(--space-3);
}

.page-banner__content .display {
  font-size: var(--text-xl);
  color: var(--color-navy);
}
</style>
