<script setup lang="ts">
import { machineFeatures } from '@/data/site'
import { assetUrl } from '@/utils/assets'
import SectionHeading from '@/components/common/SectionHeading.vue'

const features = machineFeatures.map((item) => ({
  ...item,
  image: assetUrl(item.imageKey),
}))
</script>

<template>
  <section class="machine section">
    <div class="container">
      <SectionHeading
        eyebrow="MACHINE"
        title="혁신적인 테크놀로지와
강력한 서비스"
        description="SSUKER만의 기능을 무한대로 활용할 수 있도록 도와 드립니다."
      />

      <div class="machine__list">
        <article
          v-for="(item, index) in features"
          :key="item.id"
          class="machine__item"
          :class="{ 'is-reverse': index % 2 === 1 }"
          v-reveal
        >
          <div class="machine__copy">
            <p class="eyebrow">{{ String(index + 1).padStart(2, '0') }}</p>
            <h3 class="display">{{ item.title }}</h3>
            <p>{{ item.body }}</p>
          </div>
          <figure class="machine__media">
            <img :src="item.image" :alt="item.title" loading="lazy" />
          </figure>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.machine__list {
  display: grid;
  gap: var(--space-8);
}

.machine__item {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: var(--space-6);
  align-items: center;
}

.machine__item.is-reverse {
  grid-template-columns: 1.1fr 0.9fr;
}

.machine__item.is-reverse .machine__copy {
  order: 2;
}

.machine__copy {
  display: grid;
  gap: var(--space-3);
  position: sticky;
  top: calc(var(--header-h) + 1.5rem);
  align-self: start;
}

.machine__copy h3 {
  font-size: var(--text-lg);
}

.machine__copy p:last-child {
  white-space: pre-line;
  color: var(--text-secondary);
  max-width: 28rem;
}

.machine__media {
  margin: 0;
  border: 1px solid var(--line);
  background: var(--bg-elevated);
  overflow: hidden;
}

.machine__media img {
  width: 100%;
  aspect-ratio: 16 / 11;
  object-fit: cover;
}

@media (max-width: 860px) {
  .machine__item,
  .machine__item.is-reverse {
    grid-template-columns: 1fr;
  }

  .machine__item.is-reverse .machine__copy {
    order: 0;
  }

  .machine__copy {
    position: static;
  }
}
</style>
