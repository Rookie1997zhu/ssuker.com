<script setup lang="ts">
import { downloadList } from '@/data/downloads'
import PageBanner from '@/components/common/PageBanner.vue'
import DownloadCards from '@/components/common/DownloadCards.vue'

const downloads = downloadList()
</script>

<template>
  <div class="downloads-page">
    <PageBanner eyebrow="DOWNLOAD" title="자료" image-key="hero2" />
    <section class="section">
      <div class="container">
        <DownloadCards :items="downloads" />
      </div>
    </section>
  </div>
</template>
