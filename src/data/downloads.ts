export type DownloadPlacement = 'catalog' | 'standard'

export type SiteDownload = {
  id: string
  label: string
  href: string
  placement: DownloadPlacement
}

const siteDownloads: SiteDownload[] = [
  {
    id: 'brochure',
    label: '브로셔 보기',
    href: '/downloads/ssuker-cpd-cpc-brochure-ko-260931.pdf',
    placement: 'catalog',
  },
  {
    id: 'cpd15-ad',
    label: 'CPD15 광고 보기',
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
