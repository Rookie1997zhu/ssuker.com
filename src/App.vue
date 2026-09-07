<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
</script>

<template>
  <div class="app-shell">
    <SiteHeader />
    <main class="app-main">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(1200px 600px at 80% -10%, rgba(0, 131, 167, 0.18), transparent 60%),
    radial-gradient(900px 500px at 0% 20%, rgba(2, 56, 122, 0.35), transparent 55%),
    var(--bg-page);
}

.app-main {
  flex: 1;
}
</style>
