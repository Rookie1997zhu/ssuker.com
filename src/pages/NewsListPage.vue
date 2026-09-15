<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { newsList } from '@/data/news'
import { assetUrl, assetSize } from '@/utils/assets'
import PageBanner from '@/components/common/PageBanner.vue'

const news = newsList()
const cover = assetUrl('newsCard1')
const coverSize = assetSize('newsCard1')
</script>

<template>
  <div class="news-list-page">
    <PageBanner eyebrow="NEWS" title="뉴스" image-key="newsCard4" />
    <section class="section">
      <div class="container list">
        <article v-for="item in news" :key="item.id" class="item" v-reveal>
          <RouterLink :to="`/news/${item.id}`">
            <img
              :src="cover"
              :alt="item.title"
              loading="lazy"
              decoding="async"
              :width="coverSize?.width"
              :height="coverSize?.height"
            />
            <div>
              <p class="date tabular">{{ item.date }}</p>
              <h2>{{ item.title }}</h2>
              <p>{{ item.summary }}</p>
            </div>
          </RouterLink>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.list {
  display: grid;
  gap: var(--space-5);
}

.item {
  border: 1px solid var(--line);
  background: var(--bg-elevated);
  overflow: hidden;
}

.item a {
  display: grid;
  grid-template-columns: 220px 1fr;
  min-height: 180px;
}

.item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item div {
  padding: var(--space-5);
  display: grid;
  gap: 0.55rem;
  align-content: center;
}

.date {
  color: var(--accent);
  font-family: var(--font-display);
  font-size: var(--text-sm);
}

.item h2 {
  font-size: var(--text-md);
}

.item p:last-child {
  color: var(--text-secondary);
}

@media (max-width: 600px) {
  .item a {
    grid-template-columns: 1fr;
  }

  .item img {
    aspect-ratio: 16 / 9;
  }
}
</style>
