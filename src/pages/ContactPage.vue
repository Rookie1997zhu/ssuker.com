<script setup lang="ts">
import { contactGet } from '@/data/contact'
import { siteMeta } from '@/data/site'
import { assetUrl } from '@/utils/assets'
import PageBanner from '@/components/common/PageBanner.vue'
import AppButton from '@/components/common/AppButton.vue'

const contact = contactGet()
const banner = assetUrl('customerBg')
</script>

<template>
  <div class="contact-page">
    <PageBanner eyebrow="CONTACT US" title="연락처" :image="banner" />
    <section class="section">
      <div class="container contact-grid">
        <article
          v-for="office in contact.offices"
          :key="office.id"
          class="office"
          v-reveal
        >
          <p class="eyebrow">{{ office.title }}</p>
          <h2 class="display">{{ office.title }}</h2>
          <p>{{ office.address }}</p>
        </article>

        <article class="channels" v-reveal>
          <p class="eyebrow">INQUIRY</p>
          <h2 class="display">문의 채널</h2>
          <ul>
            <li v-for="channel in contact.inquiryChannels" :key="channel.label">
              <span>{{ channel.label }}</span>
              <a :href="`mailto:${channel.email}`">{{ channel.email }}</a>
              <small>{{ channel.note }}</small>
            </li>
          </ul>
        </article>

        <aside class="quick" v-reveal>
          <p class="eyebrow">{{ contact.phoneLabel }}</p>
          <a class="display phone tabular" :href="`tel:${siteMeta.phone}`">{{ siteMeta.phone }}</a>
          <p class="hours-label">{{ contact.hoursLabel }}</p>
          <p class="hours">{{ contact.hours }}</p>
          <AppButton to="/counsel">온라인 상담</AppButton>
        </aside>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
}

.office,
.channels,
.quick {
  border: 1px solid var(--line);
  background: var(--bg-elevated);
  padding: var(--space-6);
  display: grid;
  gap: var(--space-3);
}

.office .display,
.channels .display {
  font-size: var(--text-lg);
}

.office p:last-child,
.channels li {
  color: var(--text-secondary);
}

.channels ul {
  display: grid;
  gap: 1rem;
}

.channels li {
  display: grid;
  gap: 0.25rem;
}

.channels span {
  color: var(--text-muted);
  font-size: var(--text-sm);
}

.channels a {
  color: var(--accent-strong);
}

.channels small {
  color: var(--text-muted);
}

.quick {
  grid-column: 1 / -1;
  background:
    linear-gradient(120deg, rgba(2, 56, 122, 0.05), rgba(0, 131, 167, 0.04)),
    var(--bg-elevated);
}

.phone {
  font-size: var(--text-xl);
  color: var(--accent-strong);
}

.hours-label {
  margin-top: var(--space-3);
  color: var(--text-muted);
  font-size: var(--text-sm);
}

.hours {
  white-space: pre-line;
  margin-bottom: var(--space-3);
}

@media (max-width: 800px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
