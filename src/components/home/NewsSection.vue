<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { newsList } from '@/data/news'
import { assetUrl, assetSize } from '@/utils/assets'
import SectionHeading from '@/components/common/SectionHeading.vue'
import AppButton from '@/components/common/AppButton.vue'

const news = newsList()
const cover = assetUrl('newsCard1')
const coverSize = assetSize('newsCard1')
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

      <article v-for="item in news" :key="item.id" class="news-card" v-reveal>
        <RouterLink :to="`/news/${item.id}`" class="news-card__link">
          <img
            :src="cover"
            :alt="item.title"
            loading="lazy"
            decoding="async"
            :width="coverSize?.width"
            :height="coverSize?.height"
          />
          <div class="news-card__body">
            <p class="date tabular">{{ item.date }}</p>
            <h3>{{ item.title }}</h3>
            <p>{{ item.summary }}</p>
          </div>
        </RouterLink>
      </article>

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

.news-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  font-size: var(--text-md);
}

.news-card__body p:last-child {
  color: var(--text-secondary);
  font-size: var(--text-sm);
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
}
</style>
