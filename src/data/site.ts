export const siteMeta = {
  brand: 'SSUKER',
  brandKo: '슈커',
  tagline: '전기지게차',
  title: 'SSUKER | 슈커 전기지게차',
  companyLegal: 'OPTICO CO., LTD.',
  businessNumber: '480-86-01679',
  /** 고객 제공 시에만 표시. 비우면 푸터/개인정보 페이지에서 숨김. */
  representativeName: '',
  address: '경기도 화성시 동탄대로 646-4 메가비즈타워 B동 1305',
  phone: '010-2369-6698',
  fax: '0508-931-6698',
  email: 'opticokr@daum.net',
  siteUrl: 'https://www.ssuker.co.kr',
  copyright: 'COPYRIGHT(C) 2026 슈커 CO., LTD. ALL RIGHTS RESERVED.',
}

export const navItems = [
  { label: 'ABOUT US', to: '/company' },
  {
    label: 'PRODUCT',
    to: '/products',
    children: [
      { label: '1.5TON-3TON 보급형', to: '/products/standard' },
      { label: '1.5TON-3TON 고급형', to: '/products/premium' },
    ],
  },
  { label: 'COUNSEL', to: '/counsel' },
  { label: 'CONTACT US', to: '/contact' },
  { label: 'NEWS', to: '/news' },
] as const

/** Static top hero banner — does not rotate. */
export const heroMain = {
  id: 'slide-main',
  title: 'Electric Counterbalance\nForklift Truck',
  imageKey: 'heroMain' as const,
}

/** Light label above the promo carousel band. */
export const heroPromoMeta = {
  eyebrow: 'PROMOTION',
}

/**
 * Promo carousel under MAIN, in display order:
 * HIGH 1 → HIGH 3 → NORMAL 1 → NORMAL 2 → HIGH 2 → NORMAL 3
 */
export const heroPromoSlides = [
  {
    id: 'slide-high-1',
    title: 'Upgraded 4-wheel\nElectric Forklift',
    imageKey: 'heroHigh1' as const,
  },
  {
    id: 'slide-high-3',
    title: 'Upgraded 4-wheel\nElectric Forklift',
    imageKey: 'heroHigh3' as const,
  },
  {
    id: 'slide-normal-1',
    title: 'Innovative, economical\nand practical design',
    imageKey: 'heroNormal1' as const,
  },
  {
    id: 'slide-normal-2',
    title: 'Innovative, economical\nand practical design',
    imageKey: 'heroNormal2' as const,
  },
  {
    id: 'slide-high-2',
    title: 'Upgraded 4-wheel\nElectric Forklift',
    imageKey: 'heroHigh2' as const,
  },
  {
    id: 'slide-normal-3',
    title: 'Innovative, economical\nand practical design',
    imageKey: 'heroNormal3' as const,
  },
]

export const heroIndexes = [
  {
    key: 'PERFORMANCE',
    title: 'PERFORMANCE',
    body: '회전의 부드러움과\n뛰어난 주행 제어 편의성',
  },
  {
    key: 'INNOVATION',
    title: 'INNOVATION',
    body: '혁신적인\nAC 컨트롤러 시스템',
  },
  {
    key: 'POWER',
    title: 'POWER SYSTEM',
    body: '고효율, 완벽한 보호기능,\n내장 속도 센서, 온도 센서',
  },
]

export const machineFeatures = [
  {
    id: 'comfort',
    title: 'COMFORT',
    body: '넓은 시야와 인체공학 설계로\n운전자 피로를 최소화합니다',
    imageKey: 'machine1' as const,
  },
  {
    id: 'safety',
    title: 'SAFETY',
    body: '자동 상승&하강 속도 제한\n하강 버퍼 기능',
    imageKey: 'machine2' as const,
  },
  {
    id: 'efficiency',
    title: 'EFFICIENCY',
    body: '사이드시프트 장착 유압시스템\n작업 효율 향상',
    imageKey: 'machine3' as const,
  },
]

export const warrantyItems = [
  {
    part: '동력 배터리',
    years: '3년',
    yearsValue: 3,
    hours: '3,000시간',
    hoursValue: 3000,
  },
  {
    part: '전기계통(핵심 부품)',
    years: '1년',
    yearsValue: 1,
    hours: '2,000시간',
    hoursValue: 2000,
  },
  {
    part: '유압계통(핵심 부품)',
    years: '1년',
    yearsValue: 1,
    hours: '2,000시간',
    hoursValue: 2000,
  },
]

/** Showreel control labels (Korean UI). */
export const showreelUi = {
  play: '동영상 재생',
  pause: '일시정지',
  mute: '음소거',
  unmute: '소리 켜기',
  seek: '재생 위치',
  fullscreen: '전체 화면',
  exitFullscreen: '전체 화면 종료',
}

/** Image registry — keys map to files under src/assets/images */
export const imageKeys = {
  logoWhite: 'logo_white.webp',
  logoColor: 'logo_color.webp',
  hero1: 'hero_01.webp',
  hero2: 'hero_02.webp',
  hero3: 'hero_03.webp',
  heroMain: 'hero_main.webp',
  heroHigh1: 'hero_high_1.webp',
  heroHigh2: 'hero_high_2.webp',
  heroHigh3: 'hero_high_3.webp',
  heroNormal1: 'hero_normal_1.webp',
  heroNormal2: 'hero_normal_2.webp',
  heroNormal3: 'hero_normal_3.webp',
  aboutBg: 'about_bg.webp',
  companyAbout: 'company_about.webp',
  machine1: 'machine_01.webp',
  machine2: 'machine_02.webp',
  machine3: 'machine_03.webp',
  warrantyBg: 'warranty_bg.webp',
  customerBg: 'customer_bg.webp',
  thumbStandard: 'thumb_standard.webp',
  thumbPremium: 'thumb_premium.webp',
  standardFront: 'standard_front.webp',
  standardSide: 'standard_side.webp',
  standardBack: 'standard_back.webp',
  premiumFront: 'premium_front.webp',
  premiumSide: 'premium_side.webp',
  premiumBack: 'premium_back.webp',
  sideshift: 'sideshift.webp',
  newsCard1: 'news_card_01.webp',
  newsCard2: 'news_card_02.webp',
  newsCard3: 'news_card_03.webp',
  newsCard4: 'news_card_04.webp',
  showreelPoster: 'showreel_poster.webp',
} as const

export type ImageKey = keyof typeof imageKeys
