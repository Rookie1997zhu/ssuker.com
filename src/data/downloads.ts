export type DownloadPlacement = 'catalog' | 'standard'

export type SiteDownload = {
  id: string
  label: string
  title: string
  summary: string
  pages: string
  href: string
  placement: DownloadPlacement
}

const siteDownloads: SiteDownload[] = [
  {
    id: 'brochure',
    label: '브로셔 보기',
    title: 'CPD·CPC 브로셔',
    summary: '보급형과 고급형을 담은 CPD·CPC 총 브로셔입니다.',
    pages: '10페이지',
    href: '/downloads/ssuker-cpd-cpc-brochure-ko-260931.pdf',
    placement: 'catalog',
  },
  {
    id: 'cpd15-ad',
    label: 'CPD15 광고 보기',
    title: 'CPD15 보급형 광고',
    summary: 'CPD15 보급형 1.5톤 광고 자료입니다.',
    pages: '2페이지',
    href: '/downloads/ssuker-cpd15-standard-ad-261002.pdf',
    placement: 'standard',
  },
]

export function downloadList() {
  return [...siteDownloads]
}

export function catalogDownloads() {
  return siteDownloads.filter((item) => item.placement === 'catalog')
}

export function downloadsForSeries(series: string) {
  return siteDownloads.filter(
    (item) => item.placement === 'catalog' || item.placement === series,
  )
}
