<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { newsDetail } from '@/data/news'
import { assetUrl } from '@/utils/assets'
import PageBanner from '@/components/common/PageBanner.vue'
import AppButton from '@/components/common/AppButton.vue'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const item = computed(() => newsDetail(props.id))

watchEffect(() => {
  if (!item.value) {
    router.replace('/news')
  }
})

const banner = assetUrl('newsCard2')
</script>

<template>
  <div v-if="item" class="news-detail-page">
    <PageBanner eyebrow="NEWS" :title="item.title" :image="banner" />
    <section class="section">
      <article class="container article" v-reveal>
        <p class="date tabular">{{ item.date }}</p>
        <h1 class="display">{{ item.title }}</h1>
        <p class="body">{{ item.body }}</p>
        <AppButton to="/news" variant="ghost">목록으로</AppButton>
      </article>
    </section>
  </div>
</template>

<style scoped>
.article {
  max-width: 760px;
  display: grid;
  gap: var(--space-4);
}

.date {
  color: var(--accent);
  font-family: var(--font-display);
}

.article .display {
  font-size: var(--text-xl);
}

.body {
  white-space: pre-line;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: var(--space-4);
}
</style>
