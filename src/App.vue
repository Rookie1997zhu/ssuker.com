<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import ContactDock from '@/components/layout/ContactDock.vue'
</script>

<template>
  <div class="app-shell">
    <SiteHeader />
    <main class="app-main">
      <RouterView />
    </main>
    <SiteFooter />
    <ContactDock />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(1100px 520px at 85% -8%, rgba(0, 131, 167, 0.08), transparent 58%),
    radial-gradient(900px 480px at 0% 12%, rgba(2, 56, 122, 0.06), transparent 55%),
    var(--bg-page);
}

.app-main {
  flex: 1;
}

@media (max-width: 960px) {
  .app-shell {
    padding-bottom: calc(3.5rem + env(safe-area-inset-bottom, 0px));
  }
}
</style>
