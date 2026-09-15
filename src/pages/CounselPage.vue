<script setup lang="ts">
import { contactGet } from '@/data/contact'
import { siteMeta } from '@/data/site'
import { trackEvent } from '@/utils/analytics'
import PageBanner from '@/components/common/PageBanner.vue'
import AppButton from '@/components/common/AppButton.vue'

const contact = contactGet()
</script>

<template>
  <div class="counsel-page">
    <PageBanner eyebrow="COUNSEL" title="상담 안내" image-key="newsCard3" />
    <section class="section">
      <div class="container counsel-layout">
        <div class="intro" v-reveal>
          <p class="eyebrow">DIRECT CONTACT</p>
          <h2 class="display">전화·이메일로 문의해 주세요</h2>
          <p class="lead">
            제품 상담, A/S, 파트너십 관련 문의는 아래 연락처로 바로 연락해 주시면 확인 후
            안내드립니다.
          </p>
        </div>

        <aside class="channels" v-reveal>
          <article class="channel">
            <p class="eyebrow">{{ contact.phoneLabel }}</p>
          <a
            class="display phone tabular"
            :href="`tel:${siteMeta.phone}`"
            @click="trackEvent('click_phone', { location: 'counsel_page' })"
          >
            {{ siteMeta.phone }}
          </a>
        </article>

        <article class="channel">
          <p class="eyebrow">EMAIL</p>
          <a
            class="mail"
            :href="`mailto:${siteMeta.email}`"
            @click="trackEvent('click_email', { location: 'counsel_page' })"
          >
            {{ siteMeta.email }}
          </a>
          </article>

          <article class="channel">
            <p class="eyebrow">{{ contact.hoursLabel }}</p>
            <p class="hours">{{ contact.hours }}</p>
          </article>

          <div class="actions">
            <AppButton :href="`tel:${siteMeta.phone}`">전화하기</AppButton>
            <AppButton :href="`mailto:${siteMeta.email}`" variant="ghost">메일 보내기</AppButton>
            <AppButton to="/contact" variant="ghost">연락처 보기</AppButton>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<style scoped>
.counsel-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-7);
  align-items: start;
}

.intro,
.channels {
  border: 1px solid var(--line);
  background: var(--bg-elevated);
  padding: var(--space-6);
}

.intro {
  display: grid;
  gap: var(--space-4);
  background:
    linear-gradient(160deg, rgba(2, 56, 122, 0.06), transparent 55%),
    var(--bg-elevated);
}

.lead {
  color: var(--text-secondary);
  line-height: 1.7;
}

.channels {
  display: grid;
  gap: var(--space-5);
}

.channel {
  display: grid;
  gap: 0.45rem;
}

.phone {
  font-size: var(--text-xl);
  color: var(--accent-strong);
}

.mail {
  color: var(--accent-strong);
  font-size: var(--text-md);
  word-break: break-all;
}

.hours {
  white-space: pre-line;
  color: var(--text-secondary);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

@media (max-width: 900px) {
  .counsel-layout {
    grid-template-columns: 1fr;
  }
}
</style>
