# 정적 export 규칙

`next.config.ts`는 `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`. 서버 없이 `out/`만 배포한다.

## 쓸 수 없는 것
- Request를 읽는 Route Handler, Server Actions, `cookies()`/`headers()`
- `proxy`(구 middleware), next.config의 rewrites/redirects/headers
- ISR/`revalidate`, Draft Mode, Intercepting Routes
- `next/image` 기본 로더 최적화 (unoptimized로 원본 서빙)
- `cacheComponents`, `partialPrefetching` (서버 전제 기능이라 껐다)

## 쓸 수 있는 것
- Server Component (빌드 시 실행)
- 동적 라우트 + `generateStaticParams` (+ `export const dynamicParams = false`)
- `sitemap.ts`/`robots.ts`/`opengraph-image` 등 메타데이터 파일 — `export const dynamic = "force-static"`
- 클라이언트 컴포넌트, 클라이언트 측 fetch

## 검증
기능을 추가하면 `pnpm build`가 통과하고 `out/`에 해당 HTML이 생기는지 확인한다.
리다이렉트가 필요하면 호스팅 설정(예: `_redirects`, `vercel.json`)으로 처리하고 사용자와 상의한다.
