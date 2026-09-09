<script setup lang="ts">
import { companyGet } from '@/data/company'
import { assetUrl } from '@/utils/assets'
import AppButton from '@/components/common/AppButton.vue'

const company = companyGet()
const image = assetUrl('companyAbout')
</script>

<template>
  <section class="about section">
    <div class="container about__grid">
      <div class="about__copy" v-reveal="'left'">
        <p class="eyebrow">{{ company.eyebrow }}</p>
        <h2 class="display about__title">{{ company.headline }}</h2>
        <p class="about__lead">{{ company.lead }}</p>
        <AppButton to="/company" variant="line">회사 소개 보기</AppButton>
      </div>
      <figure class="about__figure" v-reveal="'right'">
        <img :src="image" alt="SSUKER company" loading="lazy" />
        <figcaption>COUNTER BALANCE · ELECTRIC</figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.about__grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: var(--space-7);
  align-items: end;
}

.about__copy {
  display: grid;
  gap: var(--space-5);
  padding-bottom: var(--space-6);
}

.about__title {
  font-size: var(--text-xl);
  white-space: pre-line;
  max-width: 14ch;
}

.about__lead {
  color: var(--text-secondary);
  white-space: pre-line;
  max-width: 34rem;
}

.about__figure {
  position: relative;
  margin: 0;
}

.about__figure img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  filter: saturate(0.9);
}

.about__figure figcaption {
  position: absolute;
  left: -0.75rem;
  bottom: 1.25rem;
  padding: 0.45rem 0.8rem;
  background: var(--color-navy);
  color: var(--color-white);
  font-family: var(--font-display);
  font-size: var(--text-xs);
  letter-spacing: 0.14em;
}

@media (max-width: 900px) {
  .about__grid {
    grid-template-columns: 1fr;
  }

  .about__figure img {
    aspect-ratio: 16 / 10;
  }

  .about__figure figcaption {
    left: 0;
  }
}
</style>
