<script setup lang="ts">
import { RouterLink } from 'vue-router'
import HeroSection from '@/components/home/HeroSection.vue'
import AboutSection from '@/components/home/AboutSection.vue'
import ShowreelSection from '@/components/home/ShowreelSection.vue'
import SpecCompare from '@/components/home/SpecCompare.vue'
import MachineSection from '@/components/home/MachineSection.vue'
import WarrantySection from '@/components/home/WarrantySection.vue'
import NewsSection from '@/components/home/NewsSection.vue'
</script>

<template>
  <div class="home-page">
    <HeroSection />
    <AboutSection />
    <ShowreelSection />
    <SpecCompare />
    <section class="download-strip">
      <div class="container">
        <RouterLink class="download-strip__link" to="/downloads">브로셔·광고 보기</RouterLink>
      </div>
    </section>
    <MachineSection />
    <WarrantySection />
    <NewsSection />
  </div>
</template>

<style scoped>
.download-strip {
  border-bottom: 1px solid var(--line);
  background: var(--bg-elevated);
}

.download-strip__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-block: var(--space-5);
  font-family: var(--font-display);
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--accent-strong);
}

.download-strip__link::after {
  content: '→';
}
</style>
