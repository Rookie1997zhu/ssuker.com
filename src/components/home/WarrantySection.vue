<script setup lang="ts">
import { siteMeta, warrantyItems } from '@/data/site'
import { contactGet } from '@/data/contact'
import { assetUrl } from '@/utils/assets'
import AppButton from '@/components/common/AppButton.vue'

const contact = contactGet()
const bg = assetUrl('warrantyBg')
</script>

<template>
  <section class="warranty section">
    <div class="warranty__bg" aria-hidden="true">
      <img :src="bg" alt="" loading="lazy" />
      <div class="warranty__veil" />
    </div>

    <div class="container warranty__content">
      <div class="warranty__intro" v-reveal>
        <p class="eyebrow">CUSTOMER CARE</p>
        <h2 class="display">발 빠른 대응으로<br />안정적인 A/S를 제공합니다</h2>
        <p>
          SSUKER는 제품 도입부터 부품 무상 AS까지, 현장 문의에 신속히 대응하여 장비가 안정적으로
          운용되도록 지원합니다.
        </p>
        <div class="meta">
          <div>
            <p class="meta__label">{{ contact.phoneLabel }}</p>
            <a class="meta__value tabular" :href="`tel:${siteMeta.phone}`">{{ siteMeta.phone }}</a>
          </div>
          <div>
            <p class="meta__label">{{ contact.hoursLabel }}</p>
            <p class="meta__value">{{ contact.hours }}</p>
          </div>
        </div>
      </div>

      <div class="warranty__panel" v-reveal>
        <p class="panel-title">부품별 무상 AS 기간</p>
        <div
          v-for="item in warrantyItems"
          :key="item.part"
          class="as-row"
        >
          <p class="as-row__part">{{ item.part }}</p>
          <p class="as-row__years display tabular">{{ item.years }}</p>
          <p class="as-row__hours tabular">또는 {{ item.hours }}</p>
        </div>
        <AppButton to="/counsel" class="panel-cta">상담 안내</AppButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.warranty {
  position: relative;
  overflow: hidden;
}

.warranty__bg,
.warranty__veil {
  position: absolute;
  inset: 0;
}

.warranty__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.22;
}

.warranty__veil {
  background:
    linear-gradient(90deg, rgba(245, 247, 250, 0.96) 18%, rgba(245, 247, 250, 0.82)),
    linear-gradient(180deg, rgba(2, 56, 122, 0.08), transparent);
}

.warranty__content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: var(--space-7);
  align-items: stretch;
}

.warranty__intro {
  display: grid;
  gap: var(--space-4);
  align-content: center;
}

.warranty__intro .display {
  font-size: var(--text-xl);
}

.warranty__intro > p {
  color: var(--text-secondary);
  max-width: 34rem;
}

.meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  margin-top: var(--space-3);
}

.meta__label {
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  color: var(--text-muted);
  margin-bottom: 0.35rem;
}

.meta__value {
  white-space: pre-line;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-md);
}

.warranty__panel {
  border: 1px solid var(--line-strong);
  background: rgba(255, 255, 255, 0.92);
  box-shadow: var(--shadow-soft);
  padding: var(--space-6);
  display: grid;
  gap: var(--space-5);
}

.panel-title {
  font-family: var(--font-display);
  letter-spacing: 0.08em;
  color: var(--accent);
  font-size: var(--text-sm);
}

.as-row {
  display: grid;
  gap: 0.35rem;
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--line);
}

.as-row:last-of-type {
  border-bottom: none;
  padding-bottom: 0;
}

.as-row__part {
  color: var(--text-muted);
  font-size: var(--text-sm);
}

.as-row__years {
  font-size: clamp(2rem, 1.4rem + 2vw, 3.25rem);
  line-height: 1;
}

.as-row__hours {
  color: var(--text-secondary);
}

.panel-cta {
  justify-self: start;
}

@media (max-width: 900px) {
  .warranty__content,
  .meta {
    grid-template-columns: 1fr;
  }
}
</style>
