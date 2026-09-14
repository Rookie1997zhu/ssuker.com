export type NewsItem = {
  id: string
  date: string
  title: string
  summary: string
  body: string
}

const newsItems: NewsItem[] = [
  {
    id: '20250508-website-open',
    date: '2025.05.08',
    title: 'SSUKER 웹사이트가 오픈되었습니다.',
    summary: 'SSUKER 웹사이트가 오픈되었습니다. 많은 이용을 바랍니다.',
    body: 'SSUKER 웹사이트가 오픈되었습니다.\n\n제품 정보, 회사 소개, 상담 및 연락처를 한곳에서 확인하실 수 있습니다.\n많은 이용을 바랍니다.',
  },
]

export function newsList() {
  return [...newsItems]
}

export function newsDetail(id: string) {
  return newsItems.find((item) => item.id === id) ?? null
}
