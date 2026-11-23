---
name: new-page
description: 잠긴 서재에 새 라우트/페이지를 정적 export 제약에 맞게 추가한다. "페이지 만들어줘", "책 상세 페이지", "무료 서재 목록" 등에 사용.
---

# 새 페이지 추가

1. `.claude/rules/static-export.md`, `.claude/rules/design-system.md`를 읽는다. UI가 크면 `frontend-design` 스킬도 함께 쓴다.
2. 쓰려는 Next.js API는 `node_modules/next/dist/docs/`에서 확인한다 (학습 데이터와 버전이 다름).
3. `src/app/<route>/page.tsx` 생성. 기본은 Server Component.
   - 동적 라우트(`[id]`)면 `generateStaticParams()`와 `export const dynamicParams = false`를 넣는다.
   - `generateMetadata`로 title/description/OG를 채운다.
4. 클릭 추적이 필요한 부분만 작은 클라이언트 컴포넌트로 분리하고 `track()`을 쓴다 (`.claude/rules/analytics.md`).
5. `src/app/sitemap.ts`에 새 경로를 추가한다.
6. `pnpm lint && pnpm typecheck && pnpm build` 후 `out/`에 HTML이 생겼는지 확인한다. 가능하면 브라우저로 모바일(375px)·데스크톱 화면을 확인한다.
