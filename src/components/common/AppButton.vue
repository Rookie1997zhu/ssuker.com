<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  to?: string
  href?: string
  variant?: 'primary' | 'ghost' | 'line'
}>()
</script>

<template>
  <RouterLink
    v-if="to"
    :to="to"
    class="btn"
    :class="`btn--${variant ?? 'primary'}`"
  >
    <slot />
  </RouterLink>
  <a
    v-else
    :href="href"
    class="btn"
    :class="`btn--${variant ?? 'primary'}`"
  >
    <slot />
  </a>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 2.875rem;
  padding: 0.7rem 1.35rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.04em;
  transition:
    background var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.btn:hover {
  transform: translateY(-1px);
}

.btn--primary {
  background: var(--cta);
  color: var(--color-white);
}

.btn--primary:hover {
  background: var(--cta-hover);
}

.btn--ghost {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--line);
}

.btn--ghost:hover {
  border-color: var(--accent);
  color: var(--accent-strong);
}

.btn--line {
  background: transparent;
  color: var(--accent-strong);
  border-bottom: 1px solid var(--accent);
  border-radius: 0;
  padding-inline: 0;
  min-height: auto;
}
</style>
