<script setup lang="ts">
import AppButton from '@/components/common/AppButton.vue'
</script>

<template>
  <div class="not-found section">
    <div class="container panel" v-reveal>
      <p class="eyebrow">404</p>
      <h1 class="display">페이지를 찾을 수 없습니다</h1>
      <p>
        요청하신 주소가 변경되었거나 존재하지 않습니다. 아래 링크에서 원하는 페이지로 이동해
        주세요.
      </p>
      <div class="actions">
        <AppButton to="/">홈으로</AppButton>
        <AppButton to="/products" variant="ghost">제품 보기</AppButton>
        <AppButton to="/contact" variant="ghost">연락처</AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 60vh;
  display: grid;
  align-items: center;
}

.panel {
  display: grid;
  gap: var(--space-4);
  max-width: 36rem;
  padding: var(--space-7);
  border: 1px solid var(--line);
  background: var(--bg-elevated);
}

.panel p {
  color: var(--text-secondary);
  line-height: 1.7;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: var(--space-3);
}
</style>
