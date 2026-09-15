<script setup lang="ts">
import { siteMeta } from '@/data/site'
import PageBanner from '@/components/common/PageBanner.vue'
</script>

<template>
  <div class="privacy-page">
    <PageBanner eyebrow="PRIVACY" title="개인정보 처리방침" image-key="customerBg" />
    <section class="section">
      <div class="container privacy" v-reveal>
        <p class="lead">
          {{ siteMeta.companyLegal }}({{ siteMeta.brand }})는 전화·이메일 등 오프라인·직접 문의
          과정에서 제공받으신 연락처 정보를 상담 회신 목적으로만 처리합니다. 본 웹사이트에는
          개인정보를 수집하는 온라인 제출 양식이 없습니다.
        </p>

        <article>
          <h2 class="display">1. 처리하는 개인정보 항목</h2>
          <p>
            문의자가 전화 또는 이메일로 자발적으로 제공한 성명, 연락처, 이메일 주소 및 문의
            내용에 포함된 정보.
          </p>
        </article>

        <article>
          <h2 class="display">2. 처리 목적</h2>
          <p>제품·A/S·파트너십 등 상담 요청에 대한 확인 및 회신.</p>
        </article>

        <article>
          <h2 class="display">3. 보유 및 이용 기간</h2>
          <p>
            상담 목적 달성 후 지체 없이 파기합니다. 관련 법령에 따라 보관이 필요한 경우 해당
            기간 동안 보관할 수 있습니다. 구체적 보관 기간은 문의 창구로 확인해 주시기 바랍니다.
          </p>
        </article>

        <article>
          <h2 class="display">4. 파기 절차</h2>
          <p>
            전자적 파일 형태의 정보는 복구가 불가능한 방법으로 삭제하며, 종이 문서는 분쇄 또는
            소각합니다.
          </p>
        </article>

        <article>
          <h2 class="display">5. 문의 창구</h2>
          <ul>
            <li v-if="siteMeta.representativeName">
              대표자: {{ siteMeta.representativeName }}
            </li>
            <li>상호: {{ siteMeta.companyLegal }}</li>
            <li>주소: {{ siteMeta.address }}</li>
            <li>
              전화:
              <a :href="`tel:${siteMeta.phone}`">{{ siteMeta.phone }}</a>
            </li>
            <li>
              이메일:
              <a :href="`mailto:${siteMeta.email}`">{{ siteMeta.email }}</a>
            </li>
          </ul>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.privacy {
  display: grid;
  gap: var(--space-6);
  max-width: 46rem;
}

.lead {
  color: var(--text-secondary);
  line-height: 1.75;
}

article {
  display: grid;
  gap: var(--space-3);
}

article h2 {
  font-size: var(--text-md);
}

article p,
article li {
  color: var(--text-secondary);
  line-height: 1.7;
}

article ul {
  display: grid;
  gap: 0.45rem;
  padding-left: 1.1rem;
}

article a {
  color: var(--accent-strong);
}
</style>
