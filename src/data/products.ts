export type TonKey = '1.5' | '2.0' | '2.5' | '3.0'
export type SeriesKey = 'standard' | 'premium'

export type SpecRow = {
  label: string
  values: Record<TonKey, string>
}

export type TonHighlight = {
  ton: TonKey
  title: string
  runtime: string
  equipment: string
}

export type ProductSeries = {
  id: SeriesKey
  name: string
  nameEn: string
  summary: string
  thumbKey: 'thumbStandard' | 'thumbPremium'
  gallery: Array<{
    id: string
    label: string
    imageKey:
      | 'standardFront'
      | 'standardSide'
      | 'standardBack'
      | 'premiumFront'
      | 'premiumSide'
      | 'premiumBack'
      | 'sideshift'
  }>
  highlights: TonHighlight[]
  specs: SpecRow[]
  compareKeys: string[]
}

const tonOrder: TonKey[] = ['1.5', '2.0', '2.5', '3.0']

const sharedBaseSpecs: SpecRow[] = [
  {
    label: '공차중량',
    values: { '1.5': '2250kg', '2.0': '2700kg', '2.5': '3250kg', '3.0': '3850kg' },
  },
  {
    label: '차량사이즈(포크제외)',
    values: {
      '1.5': '2300*1150*2150',
      '2.0': '2400*1200*2200',
      '2.5': '2450*1200*2200',
      '3.0': '2500*1200*2200',
    },
  },
  {
    label: '상차중량',
    values: { '1.5': '1500kg', '2.0': '2000kg', '2.5': '2500kg', '3.0': '3000kg' },
  },
  {
    label: '공차 리프팅속도',
    values: { '1.5': '280mm/s', '2.0': '280mm/s', '2.5': '280mm/s', '3.0': '280mm/s' },
  },
  {
    label: '최대중량 리프팅속도',
    values: { '1.5': '180mm/s', '2.0': '180mm/s', '2.5': '180mm/s', '3.0': '180mm/s' },
  },
  {
    label: '등판각도',
    values: { '1.5': '20°', '2.0': '20°', '2.5': '20°', '3.0': '20°' },
  },
  {
    label: '작업시간',
    values: {
      '1.5': '연속 작업 6~7시간',
      '2.0': '연속 작업 5~6시간',
      '2.5': '연속 작업 7~8시간',
      '3.0': '연속 작업 5~6시간',
    },
  },
  {
    label: '충전시간',
    values: {
      '1.5': '220V 8시간 (스마트 급속충전 옵션)',
      '2.0': '220V 8시간 (스마트 급속충전 옵션)',
      '2.5': '220V 10시간 (스마트 급속충전 옵션)',
      '3.0': '220V 8시간 (스마트 급속충전 옵션)',
    },
  },
  {
    label: '회전반경',
    values: { '1.5': '2200mm', '2.0': '2420mm', '2.5': '2420mm', '3.0': '2520mm' },
  },
  {
    label: '휠베이스',
    values: { '1.5': '1510mm', '2.0': '1680mm', '2.5': '1680mm', '3.0': '1680mm' },
  },
  {
    label: '최대상차시 속도',
    values: { '1.5': '14km/h', '2.0': '14km/h', '2.5': '14km/h', '3.0': '14km/h' },
  },
  {
    label: '조향모드',
    values: {
      '1.5': '유압 마이크로컴퓨터 컨트롤러',
      '2.0': '유압 마이크로컴퓨터 컨트롤러',
      '2.5': '유압 마이크로컴퓨터 컨트롤러',
      '3.0': '유압 마이크로컴퓨터 컨트롤러',
    },
  },
  {
    label: '리프팅 높이',
    values: {
      '1.5': '3000mm(높이 맞춤 가능)',
      '2.0': '3000mm(높이 맞춤 가능)',
      '2.5': '3000mm(높이 맞춤 가능)',
      '3.0': '3000mm(높이 맞춤 가능)',
    },
  },
  {
    label: '정격 전압',
    values: {
      '1.5': '60V (80V 옵션)',
      '2.0': '60V (80V 옵션)',
      '2.5': '60V (80V 옵션)',
      '3.0': '60V (80V 옵션)',
    },
  },
  {
    label: '브레이크 방식',
    values: {
      '1.5': '오일 브레이크 + 조작 브레이크',
      '2.0': '오일 브레이크 + 조작 브레이크',
      '2.5': '오일 브레이크 + 조작 브레이크',
      '3.0': '오일 브레이크 + 조작 브레이크',
    },
  },
  {
    label: '구동모터',
    values: {
      '1.5': '4kW 풀 AC 영구자석 모터',
      '2.0': '5kW 풀 AC 영구자석 모터',
      '2.5': '9kW 풀 AC 영구자석 모터',
      '3.0': '11kW 풀 AC 영구자석 모터',
    },
  },
  {
    label: '리프팅모터',
    values: {
      '1.5': '4kW 풀 AC 영구자석 모터',
      '2.0': '5kW 풀 AC 영구자석 모터',
      '2.5': '7.5kW 풀 AC 영구자석 모터',
      '3.0': '10kW 풀 AC 영구자석 모터',
    },
  },
  {
    label: '과열/방진/방수/전류차단/열발산',
    values: { '1.5': 'O', '2.0': 'O', '2.5': 'O', '3.0': 'O' },
  },
  {
    label: '과전류 방지/저전류차단',
    values: { '1.5': 'O', '2.0': 'O', '2.5': 'O', '3.0': 'O' },
  },
]

function withBattery(values: Record<TonKey, string>): SpecRow {
  return { label: '배터리 사양', values }
}

const standardHighlights: TonHighlight[] = [
  {
    ton: '1.5',
    title: '1.5 톤 (보급형)',
    runtime: '사용시간 6~7 시간 (200Ah 배터리)',
    equipment: '사이드시프트 기본 장착',
  },
  {
    ton: '2.0',
    title: '2.0 톤 (보급형)',
    runtime: '사용시간 5~6 시간 (200Ah 배터리)',
    equipment: '사이드시프트 기본 장착',
  },
  {
    ton: '2.5',
    title: '2.5 톤 (보급형)',
    runtime: '사용시간 7~8 시간 (300Ah 배터리)',
    equipment: '사이드시프트 + 포크 포지션 기본 장착',
  },
  {
    ton: '3.0',
    title: '3.0 톤 (보급형)',
    runtime: '사용시간 5~6 시간 (300Ah 배터리)',
    equipment: '사이드시프트 + 포크 포지션 기본 장착',
  },
]

const premiumHighlights: TonHighlight[] = [
  {
    ton: '1.5',
    title: '1.5 톤 (고급형)',
    runtime: '사용시간 6~7 시간 (200Ah 배터리)',
    equipment: '사이드시프트 기본 장착',
  },
  {
    ton: '2.0',
    title: '2.0 톤 (고급형)',
    runtime: '사용시간 5~6 시간 (200Ah 배터리)',
    equipment: '사이드시프트 기본 장착',
  },
  {
    ton: '2.5',
    title: '2.5 톤 (고급형)',
    runtime: '사용시간 7~8 시간 (280Ah 배터리)',
    equipment: '사이드시프트 + 포크 포지션 기본 장착',
  },
  {
    ton: '3.0',
    title: '3.0 톤 (고급형)',
    runtime: '사용시간 5~6 시간 (280Ah 배터리)',
    equipment: '사이드시프트 + 포크 포지션 기본 장착',
  },
]

const productSeries: ProductSeries[] = [
  {
    id: 'standard',
    name: '1.5TON-3TON 보급형',
    nameEn: 'Standard Series',
    summary: '실용적인 작업 환경에 최적화된 보급형 라인업입니다.',
    thumbKey: 'thumbStandard',
    gallery: [
      { id: 'front', label: '정면', imageKey: 'standardFront' },
      { id: 'side', label: '측면', imageKey: 'standardSide' },
      { id: 'back', label: '후면', imageKey: 'standardBack' },
      { id: 'sideshift', label: '사이드시프트', imageKey: 'sideshift' },
    ],
    highlights: standardHighlights,
    specs: [
      ...sharedBaseSpecs.slice(0, 13),
      withBattery({
        '1.5': '200Ah 브랜드 리튬 배터리',
        '2.0': '200Ah 브랜드 리튬 배터리',
        '2.5': '300Ah 브랜드 리튬 배터리',
        '3.0': '300Ah 브랜드 리튬 배터리',
      }),
      ...sharedBaseSpecs.slice(13),
    ],
    compareKeys: ['상차중량', '배터리 사양', '작업시간', '구동모터', '리프팅모터', '회전반경'],
  },
  {
    id: 'premium',
    name: '1.5TON-3TON 고급형',
    nameEn: 'Premium Series',
    summary: '완성도와 제어 성능을 강화한 고급형 라인업입니다.',
    thumbKey: 'thumbPremium',
    gallery: [
      { id: 'front', label: '정면', imageKey: 'premiumFront' },
      { id: 'side', label: '측면', imageKey: 'premiumSide' },
      { id: 'back', label: '후면', imageKey: 'premiumBack' },
      { id: 'sideshift', label: '사이드시프트', imageKey: 'sideshift' },
    ],
    highlights: premiumHighlights,
    specs: [
      ...sharedBaseSpecs.slice(0, 13),
      withBattery({
        '1.5': '200Ah 브랜드 리튬 배터리',
        '2.0': '200Ah 브랜드 리튬 배터리',
        '2.5': '280Ah 브랜드 리튬 배터리',
        '3.0': '280Ah 브랜드 리튬 배터리',
      }),
      ...sharedBaseSpecs.slice(13),
    ],
    compareKeys: ['상차중량', '배터리 사양', '작업시간', '구동모터', '리프팅모터', '회전반경'],
  },
]

export function productList() {
  return [...productSeries]
}

export function productDetail(series: string) {
  return productSeries.find((item) => item.id === series) ?? null
}

export function productTonOrder() {
  return [...tonOrder]
}

export function productCompareValue(series: SeriesKey, ton: TonKey, label: string) {
  const item = productDetail(series)
  return item?.specs.find((row) => row.label === label)?.values[ton] ?? '—'
}
