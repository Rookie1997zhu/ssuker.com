<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}>()
</script>

<template>
  <header class="section-heading" :class="`is-${align ?? 'left'}`" v-reveal>
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h2 class="display title">{{ title }}</h2>
    <p v-if="description" class="description">{{ description }}</p>
  </header>
</template>

<style scoped>
.section-heading {
  display: grid;
  gap: var(--space-3);
  margin-bottom: var(--space-7);
  max-width: 42rem;
}

.section-heading.is-center {
  margin-inline: auto;
  text-align: center;
}

.title {
  font-size: var(--text-xl);
  white-space: pre-line;
}

.description {
  color: var(--text-secondary);
  white-space: pre-line;
}
</style>
