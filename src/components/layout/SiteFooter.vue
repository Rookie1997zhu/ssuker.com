<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { contactGet } from '@/data/contact'
import { navItems, siteMeta } from '@/data/site'

const contact = contactGet()
const hqAddress = contact.offices.find((office) => office.id === 'hq')?.address ?? siteMeta.address
</script>

<template>
  <footer class="site-footer">
    <div class="container site-footer__grid">
      <div class="brand-block">
        <p class="eyebrow">{{ siteMeta.brand }}</p>
        <p class="display brand-block__title">{{ siteMeta.brandKo }} {{ siteMeta.tagline }}</p>
        <p class="brand-block__legal">{{ siteMeta.companyLegal }}</p>
      </div>

      <div>
        <p class="footer-label">INFORMATION</p>
        <ul class="info-list">
          <li>
            <span>상호</span>
            <strong>{{ siteMeta.companyLegal }}</strong>
          </li>
          <li v-if="siteMeta.representativeName">
            <span>대표자</span>
            <strong>{{ siteMeta.representativeName }}</strong>
          </li>
          <li>
            <span>사업자등록번호</span>
            <strong>{{ siteMeta.businessNumber }}</strong>
          </li>
          <li>
            <span>주소</span>
            <strong>{{ hqAddress }}</strong>
          </li>
          <li>
            <span>대표번호</span>
            <strong>
              <a :href="`tel:${siteMeta.phone}`">{{ siteMeta.phone }}</a>
            </strong>
          </li>
          <li>
            <span>팩스</span>
            <strong>{{ siteMeta.fax }}</strong>
          </li>
          <li>
            <span>메일</span>
            <strong>
              <a :href="`mailto:${siteMeta.email}`">{{ siteMeta.email }}</a>
            </strong>
          </li>
          <li>
            <span>개인정보</span>
            <strong>
              <RouterLink to="/privacy">개인정보 처리방침</RouterLink>
            </strong>
          </li>
        </ul>
      </div>

      <div>
        <p class="footer-label">SITEMAP</p>
        <ul class="sitemap">
          <li v-for="item in navItems" :key="`f-${item.label}`">
            <RouterLink :to="item.to">{{ item.label }}</RouterLink>
          </li>
          <li>
            <RouterLink to="/privacy">PRIVACY</RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="container site-footer__copy">
      <p>{{ siteMeta.copyright }}</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: var(--space-8);
  padding-top: var(--space-8);
  border-top: 1px solid var(--line);
  background: linear-gradient(180deg, transparent, rgba(2, 56, 122, 0.04));
}

.site-footer__grid {
  display: grid;
  grid-template-columns: 1.2fr 1.4fr 0.8fr;
  gap: var(--space-7);
  padding-bottom: var(--space-7);
}

.brand-block {
  display: grid;
  gap: var(--space-3);
  align-content: start;
}

.brand-block__title {
  font-size: var(--text-lg);
}

.brand-block__legal {
  color: var(--text-muted);
}

.footer-label {
  margin-bottom: var(--space-4);
  font-family: var(--font-display);
  font-size: var(--text-xs);
  letter-spacing: 0.16em;
  color: var(--accent);
}

.info-list {
  display: grid;
  gap: 0.85rem;
}

.info-list li {
  display: grid;
  grid-template-columns: 7.5rem 1fr;
  gap: 0.75rem;
  font-size: var(--text-sm);
}

.info-list span {
  color: var(--text-muted);
}

.info-list strong {
  font-weight: 500;
}

.info-list a {
  color: var(--accent-strong);
}

.sitemap {
  display: grid;
  gap: 0.75rem;
}

.sitemap a {
  color: var(--text-secondary);
}

.sitemap a:hover {
  color: var(--accent-strong);
}

.site-footer__copy {
  padding-block: var(--space-5);
  border-top: 1px solid var(--line);
  color: var(--text-muted);
  font-size: var(--text-xs);
}

@media (max-width: 900px) {
  .site-footer__grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  .info-list li {
    grid-template-columns: 1fr;
    gap: 0.2rem;
  }
}
</style>
