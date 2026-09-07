export const contactContent = {
  eyebrow: 'CONTACT US',
  headline: '문의와 방문 안내',
  hoursLabel: '운영시간',
  hours: '매주 월 ~ 금\n09:00 ~ 18:00',
  phoneLabel: '전화문의',
  offices: [
    {
      id: 'hq',
      title: '본사',
      address: '경기도 화성시 동탄대로 646-4 메가비즈타워 B동 1305',
    },
    {
      id: 'logistics',
      title: '물류센터',
      address: '전북 남원시 주생면 주송길 145-16',
    },
  ],
  inquiryChannels: [
    {
      label: '영업 관련 문의',
      email: 'opticokr@daum.net',
      note: 'sales@ydns.co.kr',
    },
    {
      label: '기술 문의',
      email: 'opticokr@daum.net',
      note: 'tech@ydns.co.kr',
    },
    {
      label: '파트너십 및 마케팅 문의',
      email: 'opticokr@daum.net',
      note: 'mktg@ydns.co.kr',
    },
  ],
}

export function contactGet() {
  return contactContent
}
