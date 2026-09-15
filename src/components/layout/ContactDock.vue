<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { siteMeta } from '@/data/site'
import { trackEvent } from '@/utils/analytics'

function onPhoneClick() {
  trackEvent('click_phone', { location: 'contact_dock' })
}

function onEmailClick() {
  trackEvent('click_email', { location: 'contact_dock' })
}
</script>

<template>
  <div class="contact-dock" aria-label="연락 바로가기">
    <a
      class="dock-btn dock-btn--phone"
      :href="`tel:${siteMeta.phone}`"
      @click="onPhoneClick"
    >
      전화
    </a>
    <a
      class="dock-btn dock-btn--mail"
      :href="`mailto:${siteMeta.email}`"
      @click="onEmailClick"
    >
      메일
    </a>
    <RouterLink class="dock-btn dock-btn--counsel" to="/counsel">상담</RouterLink>
  </div>
</template>

<style scoped>
.contact-dock {
  position: fixed;
  z-index: 40;
  display: grid;
  gap: 0.5rem;
}

.dock-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3.5rem;
  min-height: 2.75rem;
  padding: 0.55rem 0.9rem;
  font-family: var(--font-display);
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--color-white);
  background: var(--cta);
  border: 1px solid transparent;
  box-shadow: var(--shadow-soft);
}

.dock-btn--mail {
  background: var(--accent-strong);
}

.dock-btn--counsel {
  background: var(--bg-elevated);
  color: var(--text-primary);
  border-color: var(--line);
}

@media (min-width: 961px) {
  .contact-dock {
    right: 1.25rem;
    bottom: 1.5rem;
  }
}

@media (max-width: 960px) {
  .contact-dock {
    left: 0;
    right: 0;
    bottom: 0;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    background: var(--bg-elevated);
    border-top: 1px solid var(--line);
    box-shadow: 0 -8px 24px rgba(15, 23, 42, 0.08);
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }

  .dock-btn {
    min-height: 3.25rem;
    border-radius: 0;
    box-shadow: none;
  }
}
</style>
