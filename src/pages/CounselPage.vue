<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { siteMeta } from '@/data/site'
import { assetUrl } from '@/utils/assets'
import { requestPost, type ApiError } from '@/utils/request'
import PageBanner from '@/components/common/PageBanner.vue'

type CounselForm = {
  name: string
  phone: string
  email: string
  topic: string
  message: string
  agree: boolean
}

const banner = assetUrl('newsCard3')
const endpoint = import.meta.env.VITE_COUNSEL_ENDPOINT
const submitting = ref(false)
const status = ref<'idle' | 'success' | 'error'>('idle')
const statusMessage = ref('')

const form = reactive<CounselForm>({
  name: '',
  phone: '',
  email: '',
  topic: '제품 상담',
  message: '',
  agree: false,
})

const errors = reactive<Record<string, string>>({})

const topics = ['제품 상담', 'A/S 문의', '파트너십', '기타']

const canSubmit = computed(() => !submitting.value)

function validate() {
  Object.keys(errors).forEach((key) => {
    delete errors[key]
  })

  if (!form.name.trim()) errors.name = '이름을 입력해 주세요.'
  if (!form.phone.trim()) errors.phone = '연락처를 입력해 주세요.'
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = '이메일 형식이 올바르지 않습니다.'
  }
  if (!form.message.trim()) errors.message = '문의 내용을 입력해 주세요.'
  if (!form.agree) errors.agree = '개인정보 수집에 동의해 주세요.'

  return Object.keys(errors).length === 0
}

function openMailto() {
  const subject = encodeURIComponent(`[SSUKER 상담] ${form.topic} - ${form.name}`)
  const body = encodeURIComponent(
    [
      `이름: ${form.name}`,
      `연락처: ${form.phone}`,
      `이메일: ${form.email || '-'}`,
      `문의 유형: ${form.topic}`,
      '',
      form.message,
    ].join('\n'),
  )
  window.location.href = `mailto:${siteMeta.email}?subject=${subject}&body=${body}`
}

async function onSubmit() {
  status.value = 'idle'
  statusMessage.value = ''
  if (!validate()) return

  submitting.value = true
  try {
    if (!endpoint) {
      openMailto()
      status.value = 'success'
      statusMessage.value =
        '메일 앱이 열렸습니다. 전송이 어려우면 전화 010-2369-6698 로 문의해 주세요.'
      return
    }

    await requestPost(endpoint, {
      name: form.name,
      phone: form.phone,
      email: form.email,
      topic: form.topic,
      message: form.message,
    })

    status.value = 'success'
    statusMessage.value = '상담 요청이 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.'
    form.name = ''
    form.phone = ''
    form.email = ''
    form.message = ''
    form.agree = false
  } catch (error) {
    const apiError = error as ApiError
    status.value = 'error'
    statusMessage.value = apiError.message || '요청에 실패했습니다. 전화로 문의해 주세요.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="counsel-page">
    <PageBanner eyebrow="COUNSEL" title="온라인 상담" :image="banner" />
    <section class="section">
      <div class="container counsel-layout">
        <aside class="aside" v-reveal>
          <p class="eyebrow">DIRECT CALL</p>
          <a class="display phone tabular" :href="`tel:${siteMeta.phone}`">{{ siteMeta.phone }}</a>
          <p class="aside__text">
            온라인 상담 양식을 남겨 주시면 확인 후 연락드립니다. 급하신 경우 대표번호로 바로
            연락해 주세요.
          </p>
          <p class="aside__mail">
            메일:
            <a :href="`mailto:${siteMeta.email}`">{{ siteMeta.email }}</a>
          </p>
        </aside>

        <form class="form" novalidate @submit.prevent="onSubmit" v-reveal>
          <div class="field">
            <label for="name">이름 *</label>
            <input id="name" v-model="form.name" type="text" autocomplete="name" />
            <p v-if="errors.name" class="error">{{ errors.name }}</p>
          </div>

          <div class="field">
            <label for="phone">연락처 *</label>
            <input id="phone" v-model="form.phone" type="tel" autocomplete="tel" />
            <p v-if="errors.phone" class="error">{{ errors.phone }}</p>
          </div>

          <div class="field">
            <label for="email">이메일</label>
            <input id="email" v-model="form.email" type="email" autocomplete="email" />
            <p v-if="errors.email" class="error">{{ errors.email }}</p>
          </div>

          <div class="field">
            <label for="topic">문의 유형 *</label>
            <select id="topic" v-model="form.topic">
              <option v-for="topic in topics" :key="topic" :value="topic">{{ topic }}</option>
            </select>
          </div>

          <div class="field">
            <label for="message">문의 내용 *</label>
            <textarea id="message" v-model="form.message" rows="7" />
            <p v-if="errors.message" class="error">{{ errors.message }}</p>
          </div>

          <label class="agree">
            <input v-model="form.agree" type="checkbox" />
            <span>개인정보 수집 및 이용에 동의합니다.</span>
          </label>
          <p v-if="errors.agree" class="error">{{ errors.agree }}</p>

          <button class="submit" type="submit" :disabled="!canSubmit">
            {{ submitting ? '전송 중...' : '상담 요청 보내기' }}
          </button>

          <p v-if="statusMessage" class="status" :class="`is-${status}`">{{ statusMessage }}</p>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.counsel-layout {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: var(--space-7);
  align-items: start;
}

.aside,
.form {
  border: 1px solid var(--line);
  background: var(--bg-elevated);
  padding: var(--space-6);
}

.aside {
  display: grid;
  gap: var(--space-4);
  background:
    linear-gradient(160deg, rgba(2, 56, 122, 0.3), transparent 55%),
    var(--bg-elevated);
}

.phone {
  font-size: var(--text-xl);
  color: var(--accent-strong);
}

.aside__text,
.aside__mail {
  color: var(--text-secondary);
}

.aside__mail a {
  color: var(--accent-strong);
}

.form {
  display: grid;
  gap: var(--space-4);
}

.field {
  display: grid;
  gap: 0.45rem;
}

label {
  font-size: var(--text-sm);
  color: var(--text-muted);
}

input,
select,
textarea {
  width: 100%;
  padding: 0.85rem 0.95rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  background: rgba(0, 0, 0, 0.25);
  outline: none;
}

input:focus,
select:focus,
textarea:focus {
  border-color: var(--accent);
}

.agree {
  display: flex;
  gap: 0.65rem;
  align-items: flex-start;
  color: var(--text-secondary);
}

.agree input {
  width: auto;
  margin-top: 0.2rem;
}

.submit {
  justify-self: start;
  min-height: 2.875rem;
  padding: 0.75rem 1.4rem;
  background: var(--cta);
  color: var(--color-white);
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: 0.04em;
}

.submit:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.error {
  color: #e08a6c;
  font-size: var(--text-sm);
}

.status {
  font-size: var(--text-sm);
}

.status.is-success {
  color: var(--accent-strong);
}

.status.is-error {
  color: #e08a6c;
}

@media (max-width: 900px) {
  .counsel-layout {
    grid-template-columns: 1fr;
  }
}
</style>
