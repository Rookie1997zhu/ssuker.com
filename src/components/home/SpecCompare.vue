<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import {
  productCompareValue,
  productList,
  productTonOrder,
  type TonKey,
} from '@/data/products'
import SectionHeading from '@/components/common/SectionHeading.vue'
import AppButton from '@/components/common/AppButton.vue'
import { useReducedMotion } from '@/composables/useReducedMotion'

const tons = productTonOrder()
const seriesList = productList()
const activeTon = ref<TonKey>('2.5')
const compareLabels = seriesList[0]?.compareKeys ?? []
const prefersReducedMotion = useReducedMotion()

const seriesLabels = {
  standard: '보급형',
  premium: '고급형',
} as const

const rows = computed(() =>
  compareLabels.map((label) => ({
    label,
    standard: productCompareValue('standard', activeTon.value, label),
    premium: productCompareValue('premium', activeTon.value, label),
  })),
)

type ParsedValue = { num: number; suffix: string } | null

function parseMetric(raw: string): ParsedValue {
  const match = raw.trim().match(/^([\d,]+(?:\.\d+)?)(.*)$/)
  if (!match) return null
  const num = Number(match[1].replace(/,/g, ''))
  if (!Number.isFinite(num)) return null
  const suffix = match[2] ?? ''
  if (!/(kg|Ah|kW|mm)/i.test(suffix)) return null
  return { num, suffix }
}

function formatMetric(num: number, suffix: string) {
  return `${Math.round(num).toLocaleString('en-US')}${suffix}`
}

const displayStandard = ref<string[]>([])
const displayPremium = ref<string[]>([])
let animFrame = 0

function syncDisplays(immediate = false) {
  const nextStd = rows.value.map((row) => row.standard)
  const nextPrem = rows.value.map((row) => row.premium)

  if (immediate || prefersReducedMotion.value || !displayStandard.value.length) {
    displayStandard.value = nextStd
    displayPremium.value = nextPrem
    return
  }

  const prevStd = [...displayStandard.value]
  const prevPrem = [...displayPremium.value]
  if (animFrame) window.cancelAnimationFrame(animFrame)

  const begin = performance.now()
  const duration = 280

  function tick(now: number) {
    const t = Math.min(1, (now - begin) / duration)
    const ease = 1 - (1 - t) ** 3

    displayStandard.value = nextStd.map((next, i) => {
      const from = parseMetric(prevStd[i] ?? '')
      const to = parseMetric(next)
      if (!from || !to) return next
      return formatMetric(from.num + (to.num - from.num) * ease, to.suffix)
    })

    displayPremium.value = nextPrem.map((next, i) => {
      const from = parseMetric(prevPrem[i] ?? '')
      const to = parseMetric(next)
      if (!from || !to) return next
      return formatMetric(from.num + (to.num - from.num) * ease, to.suffix)
    })

    if (t < 1) {
      animFrame = window.requestAnimationFrame(tick)
    } else {
      animFrame = 0
      displayStandard.value = nextStd
      displayPremium.value = nextPrem
    }
  }

  animFrame = window.requestAnimationFrame(tick)
}

watch(
  rows,
  () => {
    syncDisplays()
  },
  { immediate: true },
)

onUnmounted(() => {
  if (animFrame) window.cancelAnimationFrame(animFrame)
})
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
        <Transition name="spec-swap" mode="out-in">
          <div :key="activeTon" class="compare__body">
            <div class="compare__head">
              <div class="compare__label">항목</div>
              <div>
                <p class="series-name">{{ seriesLabels.standard }}</p>
                <p class="series-ton tabular">{{ activeTon }}톤</p>
              </div>
              <div>
                <p class="series-name">{{ seriesLabels.premium }}</p>
                <p class="series-ton tabular">{{ activeTon }}톤</p>
              </div>
            </div>

            <div
              v-for="(row, index) in rows"
              :key="row.label"
              class="compare__row"
            >
              <div class="compare__label">{{ row.label }}</div>
              <div class="compare__value tabular">
                <span class="compare__mobile-tag">{{ seriesLabels.standard }}</span>
                {{ displayStandard[index] }}
              </div>
              <div class="compare__value tabular is-accent">
                <span class="compare__mobile-tag">{{ seriesLabels.premium }}</span>
                {{ displayPremium[index] }}
              </div>
            </div>
          </div>
        </Transition>
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
  overflow: hidden;
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

.compare__mobile-tag {
  display: none;
}

.spec__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: var(--space-6);
}

.spec-swap-enter-active,
.spec-swap-leave-active {
  transition:
    opacity 240ms var(--ease-out),
    transform 240ms var(--ease-out);
}

.spec-swap-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.spec-swap-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (prefers-reduced-motion: reduce) {
  .spec-swap-enter-active,
  .spec-swap-leave-active {
    transition: none;
  }

  .spec-swap-enter-from,
  .spec-swap-leave-to {
    opacity: 1;
    transform: none;
  }
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

  .compare__mobile-tag {
    display: inline;
    margin-right: 0.45rem;
    color: var(--text-muted);
    font-size: var(--text-xs);
    letter-spacing: 0.08em;
  }
}
</style>
