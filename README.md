# SSUKER Website

Vue 3 + Vite + TypeScript 로 재구성한 SSUKER(슈커) 전기지게차 브랜드 전시용 사이트입니다.

## 개발

```bash
npm install
npm run fetch-assets   # 원사이트 소재 다운로드 및 WebP 변환
npm run dev
```

## 빌드 / 미리보기

```bash
npm run build
npm run preview
```

## GitHub Pages

- `vite.config.ts` 의 `base` 는 커스텀 도메인(`www.ssuker.co.kr`) 기준으로 `/` 입니다.
- `.github/workflows/deploy.yml` 이 `main` push 시 Pages 로 배포합니다.
- 빌드 시 Puppeteer(시스템 Chrome)로 주요 라우트를 프리렌더하고 `sitemap.xml` 을 생성합니다.
- `/counsel` 은 제출 폼이 아닌 전화·이메일 상담 안내 페이지입니다.
- 선택 환경 변수(GitHub Actions Variables):
  - `VITE_GA_MEASUREMENT_ID`
  - `VITE_GOOGLE_SITE_VERIFICATION`
  - `VITE_NAVER_SITE_VERIFICATION`

### 배포 후 확인

1. `https://ssuker.co.kr` 와 `https://www.ssuker.co.kr` 인증서/리다이렉트
2. Google Search Console / Naver 웹마스터도구 에 사이트 등록 후 `https://ssuker.co.kr/sitemap.xml` 제출
3. GA4 사용 시 전화·메일 클릭 이벤트 확인

## 기술 메모

본 프로젝트는 순수 정적 전시 사이트이므로 SQL / Redis / Docker Compose 백엔드를 포함하지 않습니다.
