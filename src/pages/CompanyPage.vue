<script setup lang="ts">
import { companyGet } from '@/data/company'
import { assetUrl } from '@/utils/assets'
import PageBanner from '@/components/common/PageBanner.vue'

const company = companyGet()
const banner = assetUrl('aboutBg')
const figure = assetUrl('companyAbout')
</script>

<template>
  <div class="company-page">
    <PageBanner eyebrow="ABOUT US" title="회사 소개" :image="banner" />
    <section class="section">
      <div class="container company-layout">
        <div class="company-layout__intro" v-reveal>
          <p class="eyebrow">{{ company.eyebrow }}</p>
          <h2 class="display">{{ company.lead }}</h2>
        </div>
        <figure class="company-layout__figure" v-reveal>
          <img :src="figure" alt="SSUKER" loading="lazy" />
        </figure>
        <div class="company-layout__body" v-reveal>
          <p v-for="(paragraph, index) in company.paragraphs" :key="index">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.company-layout {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: var(--space-7);
}

.company-layout__intro {
  grid-column: 1 / -1;
  display: grid;
  gap: var(--space-4);
  max-width: 48rem;
}

.company-layout__intro .display {
  font-size: var(--text-xl);
  white-space: pre-line;
}

.company-layout__figure {
  margin: 0;
}

.company-layout__figure img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border: 1px solid var(--line);
}

.company-layout__body {
  display: grid;
  gap: var(--space-4);
  color: var(--text-secondary);
}

@media (max-width: 900px) {
  .company-layout {
    grid-template-columns: 1fr;
  }

  .company-layout__figure img {
    aspect-ratio: 16 / 10;
  }
}
</style>
