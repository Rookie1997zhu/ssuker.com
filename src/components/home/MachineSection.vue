<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { machineFeatures } from '@/data/site'
import { assetUrl, assetSize } from '@/utils/assets'
import { useParallax } from '@/composables/useParallax'
import SectionHeading from '@/components/common/SectionHeading.vue'

const features = machineFeatures.map((item) => ({
  ...item,
  image: assetUrl(item.imageKey),
  size: assetSize(item.imageKey),
}))

const listRef = ref<HTMLElement | null>(null)
const media0 = ref<HTMLElement | null>(null)
const media1 = ref<HTMLElement | null>(null)
const media2 = ref<HTMLElement | null>(null)
const activeSnap = ref(0)
const canSnap = computed(() => features.length > 1)

const mediaRefs = [media0, media1, media2]

function setMediaRef(el: unknown, index: number) {
  const target = mediaRefs[index]
  if (!target) return
  target.value = el instanceof HTMLElement ? el : null
}

useParallax(media0, { amplitude: 40 })
useParallax(media1, { amplitude: 40 })
useParallax(media2, { amplitude: 40 })

function onListScroll() {
  const list = listRef.value
  if (!list) return
  const item = list.querySelector('.machine__item') as HTMLElement | null
  if (!item) return
  const width = item.getBoundingClientRect().width + 16
  if (width <= 0) return
  activeSnap.value = Math.round(list.scrollLeft / width)
}

function goSnap(index: number) {
  const list = listRef.value
  if (!list) return
  const item = list.querySelectorAll('.machine__item')[index] as HTMLElement | undefined
  item?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
}

onMounted(async () => {
  await nextTick()
  listRef.value?.addEventListener('scroll', onListScroll, { passive: true })
})

onUnmounted(() => {
  listRef.value?.removeEventListener('scroll', onListScroll)
})
</script>

<template>
  <section class="machine section">
    <div class="container">
      <SectionHeading
        eyebrow="MACHINE"
        title="혁신적인 테크놀로지와
강력한 서비스"
        description="SSUKER만의 기능을 충분히 활용할 수 있도록 도와드립니다."
      />

      <div ref="listRef" class="machine__list" :class="{ 'is-snap': canSnap }">
        <article
          v-for="(item, index) in features"
          :key="item.id"
          class="machine__item"
          :class="{ 'is-reverse': index % 2 === 1 }"
          v-reveal="{ delay: index * 120 }"
        >
          <div class="machine__copy">
            <p class="eyebrow">{{ String(index + 1).padStart(2, '0') }}</p>
            <h3 class="display">{{ item.title }}</h3>
            <p>{{ item.body }}</p>
          </div>
          <figure
            class="machine__media"
            :ref="(el) => setMediaRef(el, index)"
          >
            <img
              :src="item.image"
              :alt="item.title"
              loading="lazy"
              decoding="async"
              :width="item.size?.width"
              :height="item.size?.height"
            />
          </figure>
        </article>
      </div>

      <div
        v-if="canSnap"
        class="machine__dots"
        role="tablist"
        aria-label="MACHINE 슬라이드"
      >
        <button
          v-for="(item, index) in features"
          :key="`dot-${item.id}`"
          type="button"
          class="machine__dot"
          :class="{ 'is-active': index === activeSnap }"
          :aria-label="`슬라이드 ${index + 1}`"
          @click="goSnap(index)"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.machine__list {
  display: grid;
  gap: var(--space-8);
}

.machine__item {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: var(--space-6);
  align-items: center;
}

.machine__item.is-reverse {
  grid-template-columns: 1.1fr 0.9fr;
}

.machine__item.is-reverse .machine__copy {
  order: 2;
}

.machine__copy {
  display: grid;
  gap: var(--space-3);
  position: sticky;
  top: calc(var(--header-h) + 1.5rem);
  align-self: start;
}

.machine__copy h3 {
  font-size: var(--text-lg);
}

.machine__copy p:last-child {
  white-space: pre-line;
  color: var(--text-secondary);
  max-width: 28rem;
}

.machine__media {
  margin: 0;
  border: 1px solid var(--line);
  background: var(--bg-elevated);
  overflow: hidden;
  --parallax-y: 0px;
}

.machine__media img {
  width: 100%;
  aspect-ratio: 16 / 11;
  object-fit: cover;
  transform: translateY(var(--parallax-y));
  will-change: transform;
}

.machine__dots {
  display: none;
}

@media (max-width: 900px) {
  .machine__list.is-snap {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    padding-bottom: 0.25rem;
  }

  .machine__list.is-snap::-webkit-scrollbar {
    display: none;
  }

  .machine__list.is-snap .machine__item,
  .machine__list.is-snap .machine__item.is-reverse {
    flex: 0 0 86%;
    scroll-snap-align: start;
    grid-template-columns: 1fr;
  }

  .machine__item,
  .machine__item.is-reverse {
    grid-template-columns: 1fr;
  }

  .machine__item.is-reverse .machine__copy {
    order: 0;
  }

  .machine__copy {
    position: static;
  }

  .machine__media img {
    transform: none;
  }

  .machine__dots {
    display: flex;
    justify-content: center;
    gap: 0.55rem;
    margin-top: var(--space-4);
  }

  .machine__dot {
    width: 2.25rem;
    height: 2px;
    background: var(--line);
  }

  .machine__dot.is-active {
    background: var(--accent-strong);
  }
}

@media (prefers-reduced-motion: reduce) {
  .machine__media img {
    transform: none;
  }
}
</style>
