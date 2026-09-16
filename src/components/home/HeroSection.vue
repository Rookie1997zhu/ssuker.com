<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { heroIndexes, heroMain, heroPromoMeta, heroPromoSlides } from '@/data/site'
import { assetUrl, assetSize } from '@/utils/assets'

const promoActive = ref(0)
const promoDir = ref<'next' | 'prev'>('next')
let timer: number | undefined
const PROMO_INTERVAL_MS = 5600

const mainSrc = computed(() => assetUrl(heroMain.imageKey))
const mainDim = computed(() => assetSize(heroMain.imageKey))

const currentPromo = computed(() => heroPromoSlides[promoActive.value])
const promoSrc = computed(() => assetUrl(currentPromo.value.imageKey))
const promoDim = computed(() => assetSize(currentPromo.value.imageKey))
const promoSlideName = computed(() => (promoDir.value === 'next' ? 'slide-next' : 'slide-prev'))

const promoCountLabel = computed(
  () =>
    `${String(promoActive.value + 1).padStart(2, '0')} / ${String(heroPromoSlides.length).padStart(2, '0')}`,
)

function startPromoTimer() {
  if (timer) window.clearInterval(timer)
  timer = window.setInterval(nextPromo, PROMO_INTERVAL_MS)
}

function nextPromo() {
  promoDir.value = 'next'
  promoActive.value = (promoActive.value + 1) % heroPromoSlides.length
}

function goPromo(index: number) {
  if (index === promoActive.value) return
  const total = heroPromoSlides.length
  const forward = (index - promoActive.value + total) % total
  promoDir.value = forward <= total / 2 ? 'next' : 'prev'
  promoActive.value = index
  startPromoTimer()
}

onMounted(() => {
  startPromoTimer()
})

onUnmounted(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<template>
  <section class="hero">
    <h1 class="sr-only">SSUKER 전기지게차</h1>

    <div class="hero__main" aria-hidden="true">
      <img
        :src="mainSrc"
        alt=""
        class="hero__img hero__img--main"
        decoding="async"
        fetchpriority="high"
        :width="mainDim?.width"
        :height="mainDim?.height"
      />
    </div>

    <div class="hero__band">
      <div class="hero__band-inner">
        <div class="hero__band-head">
          <p class="eyebrow">{{ heroPromoMeta.eyebrow }}</p>
          <p class="hero__count tabular">{{ promoCountLabel }}</p>
        </div>

        <div class="hero__promo">
          <div class="hero__promo-media" aria-hidden="true">
            <Transition :name="promoSlideName">
              <img
                :key="currentPromo.id"
                :src="promoSrc"
                alt=""
                class="hero__img hero__img--promo"
                decoding="async"
                :loading="promoActive === 0 ? 'eager' : 'lazy'"
                :width="promoDim?.width"
                :height="promoDim?.height"
              />
            </Transition>
          </div>
        </div>

        <div class="hero__dots" role="tablist" aria-label="프로모션 슬라이드">
          <button
            v-for="(slide, index) in heroPromoSlides"
            :key="slide.id"
            type="button"
            class="dot"
            :class="{ 'is-active': index === promoActive }"
            :aria-label="`슬라이드 ${index + 1}`"
            @click="goPromo(index)"
          />
        </div>
      </div>
    </div>

    <div class="hero__indexes">
      <div
        v-for="item in heroIndexes"
        :key="item.key"
        class="index-item"
      >
        <p class="index-item__key">{{ item.title }}</p>
        <p class="index-item__body">{{ item.body }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--color-paper);
}

.hero__main {
  position: relative;
  width: 100%;
  aspect-ratio: 2162 / 727;
  background: var(--color-paper);
}

.hero__band {
  padding-block: var(--space-7) var(--space-6);
  border-top: 1px solid var(--line);
  background: var(--color-paper);
}

.hero__band-inner {
  width: var(--container);
  margin-inline: auto;
}

.hero__band-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
}

.hero__count {
  margin: 0;
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  color: var(--text-muted);
}

.hero__promo {
  --promo-max-h: min(62vh, 640px);
  position: relative;
  width: min(100%, calc(var(--promo-max-h) * 3 / 2));
  max-width: 100%;
  margin-inline: auto;
  aspect-ratio: 3 / 2;
  max-height: var(--promo-max-h);
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--color-navy-deep);
  box-shadow: var(--shadow-soft);
}

.hero__promo-media {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.hero__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.hero__img--main {
  position: absolute;
  inset: 0;
}

.hero__img--promo {
  position: absolute;
  inset: 0;
  /* Mild recovery for high-key whites; keep posters readable, not grey. */
  filter: brightness(0.98) contrast(1.04) saturate(1.02);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.hero__dots {
  display: flex;
  justify-content: center;
  gap: 0.55rem;
  margin-top: var(--space-4);
}

.dot {
  width: 2.25rem;
  height: 2px;
  background: var(--line);
}

.dot.is-active {
  background: var(--accent-strong);
}

.hero__indexes {
  flex: 0 0 auto;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--line);
  background: var(--color-white);
}

.index-item {
  padding: 1.15rem 1.35rem;
  border-right: 1px solid var(--line);
}

.index-item:last-child {
  border-right: none;
}

.index-item__key {
  font-family: var(--font-display);
  font-size: var(--text-xs);
  letter-spacing: 0.16em;
  color: var(--accent);
  margin-bottom: 0.45rem;
}

.index-item__body {
  white-space: pre-line;
  color: var(--text-secondary);
  font-size: var(--text-sm);
  line-height: 1.45;
}

.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform var(--duration-slow) var(--ease-out);
}

.slide-next-enter-from {
  transform: translateX(100%);
}

.slide-next-leave-to {
  transform: translateX(-100%);
}

.slide-prev-enter-from {
  transform: translateX(-100%);
}

.slide-prev-leave-to {
  transform: translateX(100%);
}

@media (prefers-reduced-motion: reduce) {
  .slide-next-enter-active,
  .slide-next-leave-active,
  .slide-prev-enter-active,
  .slide-prev-leave-active {
    transition-duration: 1ms;
  }

  .slide-next-enter-from,
  .slide-next-leave-to,
  .slide-prev-enter-from,
  .slide-prev-leave-to {
    transform: none;
  }
}

@media (max-width: 900px) {
  .hero__band {
    padding-block: var(--space-6) var(--space-5);
  }

  .hero__promo {
    --promo-max-h: min(52vh, 480px);
  }

  .hero__indexes {
    grid-template-columns: 1fr;
  }

  .index-item {
    border-right: none;
    border-bottom: 1px solid var(--line);
  }

  .index-item:last-child {
    border-bottom: none;
  }
}

@media (max-width: 600px) {
  .hero__promo {
    border-radius: var(--radius-md);
  }
}
</style>
