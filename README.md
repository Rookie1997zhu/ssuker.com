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
- 상담 폼 외부 엔드포인트는 `VITE_COUNSEL_ENDPOINT` 로 주입할 수 있습니다. 미설정 시 `mailto` 로 대체됩니다.

## 기술 메모

본 프로젝트는 순수 정적 전시 사이트이므로 SQL / Redis / Docker Compose 백엔드를 포함하지 않습니다.
