<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  productCompareValue,
  productList,
  productTonOrder,
  type TonKey,
} from '@/data/products'
import SectionHeading from '@/components/common/SectionHeading.vue'
import AppButton from '@/components/common/AppButton.vue'

const tons = productTonOrder()
const seriesList = productList()
const activeTon = ref<TonKey>('2.5')
const compareLabels = seriesList[0]?.compareKeys ?? []

const rows = computed(() =>
  compareLabels.map((label) => ({
    label,
    standard: productCompareValue('standard', activeTon.value, label),
    premium: productCompareValue('premium', activeTon.value, label),
  })),
)
</script>

<template>
  <section class="spec section">
    <div class="container">
      <SectionHeading
        eyebrow="SPEC COMPARE"
        title="보급형과 고급형을
한 화면에서 대조합니다"
        description="톤수를 선택하면 핵심 사양이 즉시 갱신됩니다. 상세 스펙은 제품 페이지에서 확인하세요."
      />

      <div class="ton-switch" role="tablist" aria-label="톤수 선택" v-reveal>
        <button
          v-for="ton in tons"
          :key="ton"
          type="button"
          class="ton-switch__btn tabular"
          :class="{ 'is-active': activeTon === ton }"
          @click="activeTon = ton"
        >
          {{ ton }}T
        </button>
      </div>

      <div class="compare" v-reveal>
        <div class="compare__head">
          <div class="compare__label">항목</div>
          <div>
            <p class="series-name">보급형</p>
            <p class="series-ton tabular">{{ activeTon }}톤</p>
          </div>
          <div>
            <p class="series-name">고급형</p>
            <p class="series-ton tabular">{{ activeTon }}톤</p>
          </div>
        </div>

        <div
          v-for="row in rows"
          :key="row.label"
          class="compare__row"
        >
          <div class="compare__label">{{ row.label }}</div>
          <div class="compare__value tabular">{{ row.standard }}</div>
          <div class="compare__value tabular is-accent">{{ row.premium }}</div>
        </div>
      </div>

      <div class="spec__actions">
        <AppButton to="/products/standard" variant="ghost">보급형 상세</AppButton>
        <AppButton to="/products/premium">고급형 상세</AppButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.spec {
  background:
    linear-gradient(180deg, rgba(2, 56, 122, 0.05), transparent 40%),
    var(--bg-elevated);
  border-block: 1px solid var(--line);
}

.ton-switch {
  display: inline-flex;
  gap: 0.35rem;
  padding: 0.3rem;
  margin-bottom: var(--space-6);
  border: 1px solid var(--line);
  background: var(--bg-panel);
}

.ton-switch__btn {
  min-width: 4.5rem;
  padding: 0.7rem 0.9rem;
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--text-muted);
}

.ton-switch__btn.is-active {
  background: var(--color-navy);
  color: var(--color-white);
}

.compare {
  border: 1px solid var(--line);
  background: var(--bg-elevated);
}

.compare__head,
.compare__row {
  display: grid;
  grid-template-columns: 1.1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem 1.15rem;
  border-bottom: 1px solid var(--line);
}

.compare__head {
  background: rgba(0, 131, 167, 0.08);
}

.compare__row:last-child {
  border-bottom: none;
}

.compare__label {
  color: var(--text-muted);
  font-size: var(--text-sm);
}

.series-name {
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: 0.04em;
}

.series-ton {
  color: var(--accent);
  font-size: var(--text-sm);
}

.compare__value {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.compare__value.is-accent {
  color: var(--accent-strong);
}

.spec__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: var(--space-6);
}

@media (max-width: 900px) {
  .compare__head,
  .compare__row {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }

  .compare__head > div:first-child {
    display: none;
  }
}
</style>
