<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { heroIndexes, heroSlides } from '@/data/site'
import { assetUrl, assetSize } from '@/utils/assets'

const active = ref(0)
let timer: number | undefined

const current = computed(() => heroSlides[active.value])
const imageSrc = computed(() => assetUrl(current.value.imageKey))
const imageDim = computed(() => assetSize(current.value.imageKey))

function next() {
  active.value = (active.value + 1) % heroSlides.length
}

function go(index: number) {
  active.value = index
}

onMounted(() => {
  timer = window.setInterval(next, 5600)
})

onUnmounted(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<template>
  <section class="hero">
    <h1 class="sr-only">SSUKER 전기지게차</h1>

    <div class="hero__stage">
      <div class="hero__media" aria-hidden="true">
        <Transition name="fade" mode="out-in">
          <img
            :key="current.id"
            :src="imageSrc"
            alt=""
            class="hero__img"
            decoding="async"
            fetchpriority="high"
            :width="imageDim?.width"
            :height="imageDim?.height"
          />
        </Transition>
        <div class="hero__veil" />
      </div>

      <div class="hero__dots" role="tablist" aria-label="히어로 슬라이드">
        <button
          v-for="(slide, index) in heroSlides"
          :key="slide.id"
          type="button"
          class="dot"
          :class="{ 'is-active': index === active }"
          :aria-label="`슬라이드 ${index + 1}`"
          @click="go(index)"
        />
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
  min-height: min(72vh, 760px);
  overflow: hidden;
  background: var(--color-paper);
}

.hero__stage {
  position: relative;
  flex: 1 1 auto;
  min-height: 18rem;
}

.hero__media,
.hero__veil {
  position: absolute;
  inset: 0;
}

.hero__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  /* Mild recovery for high-key whites; keep posters readable, not grey. */
  filter: brightness(0.96) contrast(1.08) saturate(1.04);
}

.hero__veil {
  pointer-events: none;
  background: linear-gradient(
    180deg,
    transparent 72%,
    rgba(245, 247, 250, 0.35) 100%
  );
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
  position: absolute;
  left: 50%;
  bottom: 1rem;
  z-index: 2;
  display: flex;
  gap: 0.55rem;
  transform: translateX(-50%);
}

.dot {
  width: 2rem;
  height: 2px;
  background: rgba(18, 22, 28, 0.28);
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--duration-slow) var(--ease-out);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .hero {
    min-height: 62vh;
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
</style>
