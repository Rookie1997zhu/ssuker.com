<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { newsList } from '@/data/news'
import { assetUrl, assetSize } from '@/utils/assets'
import SectionHeading from '@/components/common/SectionHeading.vue'
import AppButton from '@/components/common/AppButton.vue'

const news = newsList()
const cover = assetUrl('newsCard1')
const coverSize = assetSize('newsCard1')
const trackRef = ref<HTMLElement | null>(null)
const activeSnap = ref(0)
const enableSnap = computed(() => news.length > 1)

function onTrackScroll() {
  const track = trackRef.value
  if (!track) return
  const card = track.querySelector('.news-card') as HTMLElement | null
  if (!card) return
  const width = card.getBoundingClientRect().width + 16
  if (width <= 0) return
  activeSnap.value = Math.round(track.scrollLeft / width)
}

function goSnap(index: number) {
  const track = trackRef.value
  if (!track) return
  const card = track.querySelectorAll('.news-card')[index] as HTMLElement | undefined
  card?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
}

onMounted(async () => {
  await nextTick()
  trackRef.value?.addEventListener('scroll', onTrackScroll, { passive: true })
})

onUnmounted(() => {
  trackRef.value?.removeEventListener('scroll', onTrackScroll)
})
</script>

<template>
  <section class="news section">
    <div class="container news__grid">
      <div>
        <SectionHeading
          eyebrow="NEWS"
          title="뉴스를 클릭해서
다양한 정보를 확인해보세요"
        />
        <AppButton to="/news" variant="ghost">전체 뉴스</AppButton>
      </div>

      <div
        ref="trackRef"
        class="news__track"
        :class="{ 'is-snap': enableSnap }"
      >
        <article
          v-for="item in news"
          :key="item.id"
          class="news-card"
          v-reveal
        >
          <RouterLink :to="`/news/${item.id}`" class="news-card__link">
            <div class="news-card__media">
              <img
                :src="cover"
                :alt="item.title"
                loading="lazy"
                decoding="async"
                :width="coverSize?.width"
                :height="coverSize?.height"
              />
            </div>
            <div class="news-card__body">
              <p class="date tabular">{{ item.date }}</p>
              <h3>
                <span>{{ item.title }}</span>
                <span class="news-card__arrow" aria-hidden="true">↗</span>
              </h3>
              <p>{{ item.summary }}</p>
            </div>
          </RouterLink>
        </article>
      </div>

      <div
        v-if="enableSnap"
        class="news__dots"
        role="tablist"
        aria-label="NEWS 슬라이드"
      >
        <button
          v-for="(item, index) in news"
          :key="`news-dot-${item.id}`"
          type="button"
          class="news__dot"
          :class="{ 'is-active': index === activeSnap }"
          :aria-label="`뉴스 ${index + 1}`"
          @click="goSnap(index)"
        />
      </div>

      <div class="cta-panel" v-reveal>
        <p class="eyebrow">CONTACT</p>
        <h3 class="display">제품 상담이 필요하신가요?</h3>
        <p>전화 문의 또는 온라인 상담으로 빠르게 연결해드립니다.</p>
        <div class="cta-panel__actions">
          <AppButton to="/counsel">상담 안내</AppButton>
          <AppButton to="/contact" variant="ghost">오시는 길</AppButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.news__grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: var(--space-6);
  align-items: start;
}

.news__track {
  display: contents;
}

.news-card {
  border: 1px solid var(--line);
  background: var(--bg-elevated);
  overflow: hidden;
}

.news-card__link {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  min-height: 220px;
}

.news-card__media {
  overflow: hidden;
}

.news-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-out);
}

.news-card__body {
  padding: var(--space-5);
  display: grid;
  gap: 0.65rem;
  align-content: center;
}

.date {
  color: var(--accent);
  font-family: var(--font-display);
  font-size: var(--text-sm);
}

.news-card__body h3 {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  font-size: var(--text-md);
}

.news-card__arrow {
  display: inline-block;
  color: var(--accent-strong);
  transition: transform var(--duration) var(--ease-out);
}

.news-card__body p:last-child {
  color: var(--text-secondary);
  font-size: var(--text-sm);
}

@media (hover: hover) and (pointer: fine) {
  .news-card__link:hover img {
    transform: scale(1.05);
  }

  .news-card__link:hover .news-card__arrow {
    transform: translateX(4px);
  }
}

.news__dots {
  display: none;
}

.cta-panel {
  grid-column: 1 / -1;
  margin-top: var(--space-4);
  padding: var(--space-7);
  border: 1px solid var(--line-strong);
  background:
    linear-gradient(120deg, rgba(2, 56, 122, 0.06), rgba(0, 131, 167, 0.05)),
    var(--bg-elevated);
  display: grid;
  gap: var(--space-3);
}

.cta-panel .display {
  font-size: var(--text-lg);
}

.cta-panel > p {
  color: var(--text-secondary);
}

.cta-panel__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: var(--space-3);
}

@media (max-width: 900px) {
  .news__grid,
  .news-card__link {
    grid-template-columns: 1fr;
  }

  .news__track.is-snap {
    display: flex;
    grid-column: 1 / -1;
    gap: 1rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }

  .news__track.is-snap::-webkit-scrollbar {
    display: none;
  }

  .news__track.is-snap .news-card {
    flex: 0 0 86%;
    scroll-snap-align: start;
  }

  .news__dots {
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    gap: 0.55rem;
  }

  .news__dot {
    width: 2.25rem;
    height: 2px;
    background: var(--line);
  }

  .news__dot.is-active {
    background: var(--accent-strong);
  }
}

@media (prefers-reduced-motion: reduce) {
  .news-card img,
  .news-card__arrow {
    transition: none;
  }

  .news-card__link:hover img,
  .news-card__link:hover .news-card__arrow {
    transform: none;
  }
}
</style>
