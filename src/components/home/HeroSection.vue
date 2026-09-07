<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { heroIndexes, heroSlides } from '@/data/site'
import { assetUrl } from '@/utils/assets'

const active = ref(0)
let timer: number | undefined

const current = computed(() => heroSlides[active.value])
const imageSrc = computed(() => assetUrl(current.value.imageKey))

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
    <div class="hero__media" aria-hidden="true">
      <Transition name="fade" mode="out-in">
        <img :key="current.id" :src="imageSrc" alt="" class="hero__img" />
      </Transition>
      <div class="hero__veil" />
    </div>

    <div class="container hero__content">
      <p class="eyebrow">SSUKER ELECTRIC</p>
      <h1 class="display hero__title">ELECTRIC<br />FORKLIFT</h1>
      <p class="hero__subtitle">{{ current.title }}</p>
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
  position: relative;
  min-height: min(100vh, 920px);
  display: grid;
  align-content: end;
  overflow: hidden;
}

.hero__media,
.hero__veil {
  position: absolute;
  inset: 0;
}

.hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: scale(1.04);
}

.hero__veil {
  background:
    linear-gradient(180deg, rgba(18, 22, 28, 0.2) 0%, rgba(18, 22, 28, 0.72) 55%, rgba(18, 22, 28, 0.96) 100%),
    linear-gradient(90deg, rgba(2, 56, 122, 0.45), transparent 50%);
}

.hero__content {
  position: relative;
  z-index: 1;
  padding-bottom: 8.5rem;
  display: grid;
  gap: var(--space-4);
}

.hero__title {
  font-size: var(--text-hero);
  max-width: 12ch;
}

.hero__subtitle {
  max-width: 28rem;
  color: var(--text-secondary);
  white-space: pre-line;
  font-size: var(--text-md);
}

.hero__dots {
  display: flex;
  gap: 0.55rem;
  margin-top: var(--space-3);
}

.dot {
  width: 2rem;
  height: 2px;
  background: rgba(255, 255, 255, 0.28);
}

.dot.is-active {
  background: var(--accent-strong);
}

.hero__indexes {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--line);
  background: rgba(18, 22, 28, 0.72);
  backdrop-filter: blur(8px);
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

@media (max-width: 800px) {
  .hero {
    min-height: 88vh;
  }

  .hero__content {
    padding-bottom: 14rem;
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
