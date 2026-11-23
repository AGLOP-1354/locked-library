# 코드 스타일

- TypeScript strict. `any` 금지, 외부 입력은 타입으로 좁힌다.
- import는 `@/` 별칭 사용 (`@/lib/site`, `@/types/book`).
- 기본은 Server Component. 상호작용(클릭 추적, 상태)이 필요한 가장 작은 단위만 `"use client"`.
- 컴포넌트 파일명 PascalCase (`BookCard.tsx`), 그 외 camelCase. 한 파일에 export 컴포넌트 하나.
- 페이지 전용 컴포넌트는 `src/app/<route>/_components/`, 여러 곳에서 쓰면 `src/components/`.
- 사이트 이름·채널 URL 등은 `src/lib/site.ts`에서만 가져온다.
- 사용자에게 보이는 문구는 한국어. 코드 식별자는 영어.
- 작업 끝나면 `pnpm lint && pnpm typecheck && pnpm build`.
