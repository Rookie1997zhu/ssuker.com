<script setup lang="ts">
import type { SiteDownload } from '@/data/downloads'
import AppButton from '@/components/common/AppButton.vue'

defineProps<{
  items: SiteDownload[]
}>()
</script>

<template>
  <div v-if="items.length" class="download-cards">
    <article v-for="item in items" :key="item.id" class="download-card">
      <p class="eyebrow">{{ item.pages }}</p>
      <h2 class="display">{{ item.title }}</h2>
      <p class="download-card__summary">{{ item.summary }}</p>
      <AppButton :href="item.href" external>보기</AppButton>
    </article>
  </div>
</template>

<style scoped>
.download-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: var(--space-6);
}

.download-card {
  display: grid;
  align-content: start;
  gap: 0.75rem;
  padding: var(--space-5);
  border: 1px solid var(--line);
  background: var(--bg-elevated);
}

.download-card .display {
  font-size: var(--text-lg);
}

.download-card__summary {
  color: var(--text-secondary);
}
</style>
