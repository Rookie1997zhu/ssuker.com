import { siteMeta } from '@/data/site'

export type PageSeo = {
  title: string
  description: string
  ogImage?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

const defaultDescription =
  'SSUKER 슈커 전기지게차 — 1.5ton~3ton 보급형·고급형. OPTICO CO., LTD.'

export const defaultSeo: PageSeo = {
  title: siteMeta.title,
  description: defaultDescription,
  ogImage: `${siteMeta.siteUrl}/og-default.png`,
}

export const routeSeo: Record<string, PageSeo> = {
  '/': {
    title: siteMeta.title,
    description: defaultDescription,
  },
  '/company': {
    title: `회사 소개 | ${siteMeta.brand}`,
    description: 'SSUKER(슈커)는 OPTICO CO., LTD.의 전기지게차 브랜드입니다.',
  },
  '/products': {
    title: `제품 안내 | ${siteMeta.brand}`,
    description: '1.5TON–3TON 보급형·고급형 전기지게차 라인업을 확인하세요.',
  },
  '/products/standard': {
    title: `1.5TON-3TON 보급형 | ${siteMeta.brand}`,
    description: 'SSUKER 보급형 전기지게차 사양, 세부 사진, 현장 사진을 확인하세요.',
  },
  '/products/premium': {
    title: `1.5TON-3TON 고급형 | ${siteMeta.brand}`,
    description: 'SSUKER 고급형 전기지게차 사양, 세부 사진, 현장 사진을 확인하세요.',
  },
  '/products/standard/details': {
    title: `보급형 세부 사진 | ${siteMeta.brand}`,
    description: 'SSUKER 보급형 전기지게차 세부 사진을 확인하세요.',
  },
  '/products/premium/details': {
    title: `고급형 세부 사진 | ${siteMeta.brand}`,
    description: 'SSUKER 고급형 전기지게차 세부 사진을 확인하세요.',
  },
  '/counsel': {
    title: `상담 안내 | ${siteMeta.brand}`,
    description: '전화·이메일로 SSUKER 전기지게차 상담을 문의해 주세요.',
  },
  '/contact': {
    title: `연락처 | ${siteMeta.brand}`,
    description: 'SSUKER 본사·물류센터 주소와 문의 채널을 안내합니다.',
  },
  '/news': {
    title: `뉴스 | ${siteMeta.brand}`,
    description: 'SSUKER 소식과 공지를 확인하세요.',
  },
  '/privacy': {
    title: `개인정보 처리방침 | ${siteMeta.brand}`,
    description: 'SSUKER 개인정보 처리방침을 안내합니다.',
  },
}

export function resolveSeo(path: string): PageSeo {
  const normalized = path.replace(/\/$/, '') || '/'
  return {
    ...defaultSeo,
    ...(routeSeo[normalized] ?? {
      title: siteMeta.title,
      description: defaultDescription,
    }),
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteMeta.brand,
    legalName: siteMeta.companyLegal,
    url: siteMeta.siteUrl,
    email: siteMeta.email,
    telephone: siteMeta.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteMeta.address,
      addressCountry: 'KR',
    },
  }
}
