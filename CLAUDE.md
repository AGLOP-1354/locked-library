@AGENTS.md

# CLAUDE.md — Locked Library (잠긴 서재)

AI 어시스턴트가 이 프로젝트에서 따라야 할 핵심 규칙과, 상황별로 읽어야 할 문서를 안내하는 지도입니다. 세부 규칙은 각 문서에 있으니 여기서 반복하지 않습니다.

## 프로젝트 개요

- 유튜브 채널 **잠긴 서재**(공포·추리·미스터리 책 영상화)의 웹 서재. 채널에 올린 책과 올릴 책을 보여준다.
- 책마다 할 수 있는 것: **영상 보기**, **영어 원문 읽기**(무료, 외부 링크), **한국어판 구매**(제휴 출판사, 서점 링크). 무료/유료로 책을 나누지 않는다.
- 목표: 채널 성장 → 출판사와 연계해 **책 판매 수수료**. 따라서 핵심 전환은 `purchase_click`(한국어판 구매 링크 클릭)이다.
- 현재 콘텐츠는 저작권 만료 고전(무료). 영상은 1930년대 경성 등으로 각색한 창작물이고, "읽기"는 설명란의 **영문(원어) 원문 외부 링크**(구텐베르크, 위키문헌)로 보낸다. 사이트에 본문을 싣지 않는다.
- 한국어판은 `Book.koreanEdition`(서점 제휴 링크, 확인된 경우 출판사·옮긴이). 사이트 내 결제 없음.
- 데이터 출처: 유튜브 채널 @lockedlibrary 롱폼 영상의 제목·설명란·챕터.
- **서버 없음**: `output: "export"` 정적 사이트. `pnpm build` 결과물 `out/`을 정적 호스팅에 올린다.

## 스택

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict
- Tailwind CSS v4 (토큰은 `src/app/globals.css`), 글꼴 함렛 + IBM Plex Sans KR
- GA4: Google 태그 컨테이너 `GTM-5C4W27RW` → GA4 `G-F057EFMVC7` (`src/components/GoogleTag.tsx`, `NEXT_PUBLIC_GA_ID`)
- 패키지 매니저: pnpm

## 명령어

```bash
pnpm dev      # 개발 서버 (localhost:3000)
pnpm build    # 정적 export → out/
pnpm lint     # ESLint
pnpm typecheck
pnpm deploy:pages   # 빌드 후 Cloudflare Pages에 배포 (커밋 안 된 변경이 있으면 -- --commit-dirty=true)
```

## 배포

- **Cloudflare Pages (기존 Pages 방식)**, 프로젝트 이름 `lockedlibrary`, 주소 https://lockedlibrary.pages.dev.
- **배포 계정 주의:** 이 컴퓨터의 wrangler 기본 로그인(jake@squares.ai)은 사용자 계정이 **아니다**. 2026-11-23 그 계정에 잘못 배포했다가 프로젝트를 지웠다. 사용자 계정은 **ujh9208@gmail.com** (account_id `155e3e683d210decc550ff432a858491`, `package.json`의 `deploy:pages`에서 `CLOUDFLARE_ACCOUNT_ID`로 고정. Pages 설정 파일은 account_id를 받지 않음). 배포 전 `pnpm exec wrangler whoami`로 이 계정인지 확인한다.
- 설정: `wrangler.jsonc`. wrangler가 기본으로 새 Workers 방식으로 넘기려 하지만, 이 프로젝트는 이미 Pages로 만들어져 있어 `pnpm deploy:pages`가 그대로 Pages에 올린다. `--force`는 다시 쓰지 않는다.
- Git 연동 자동 배포는 아직 없다. 책을 추가하거나 영상 공개일이 지나면 직접 `pnpm deploy:pages`.
- 배포 주소는 `.env.production`의 `NEXT_PUBLIC_SITE_URL`. `.env.local`에 같은 변수를 넣으면 배포 빌드에서도 그 값이 이겨서 sitemap이 localhost가 되니 넣지 않는다.

## 상황별 참조 지도

| 상황 | 먼저 읽을 것 |
|---|---|
| Next.js API 사용 (버전이 학습 데이터와 다름) | `node_modules/next/dist/docs/` — 특히 `01-app/02-guides/static-exports.md` |
| 정적 export 제약 확인 | `.claude/rules/static-export.md` |
| UI/컴포넌트/페이지 디자인 | `.claude/rules/design-system.md`, `docs/design-references.md`, `frontend-design` 스킬 |
| 코드 스타일, 파일 위치 | `.claude/rules/code-style.md` |
| GA 이벤트 추가/수정 | `.claude/rules/analytics.md` |
| 책 데이터 추가, 무료/유료 판단, 저작권 | `.claude/rules/content.md`, `/add-book` 스킬 |
| 새 페이지(라우트) 추가 | `/new-page` 스킬 |
| 화면 문구 작성 | `.claude/rules/design-system.md`의 "문구" |
| React 성능/패턴 | `vercel:react-best-practices` 스킬 |

## 절대 규칙

1. 서버가 필요한 기능을 넣지 않는다 (Route Handler w/ Request, Server Action, cookies, proxy, rewrites/redirects/headers, ISR). 필요해 보이면 먼저 사용자에게 묻는다.
2. 동적 라우트는 반드시 `generateStaticParams` + `dynamicParams = false`.
3. 저작권이 확인되지 않은 본문을 무료로 올리지 않는다. 근거는 `Book.rights`에 남긴다.
4. 색·폰트는 토큰만 쓴다. 하드코딩 hex 금지.
5. 사용자 요청 없이 책 데이터나 문구를 지어내 채우지 않는다.

## 디렉토리

```
src/
├── app/            # 라우트 (layout에 GA 포함). 메인 섹션 app/_components/, 책 페이지 app/books/[id]/
├── components/     # 공용 UI
├── content/        # 책 데이터 (books.ts)
├── lib/            # site 설정, analytics(track), books 헬퍼, cloth 색 표
└── types/          # Book 타입
public/covers/      # 책 표지 이미지
docs/               # 디자인 레퍼런스 등 참고 문서
```

## 환경 변수

`.env.example` 참고. `.env.local`은 커밋하지 않는다.

- `NEXT_PUBLIC_GA_ID` — Google 태그 ID(`GTM-…` 또는 `G-…`). `.env.production`에 있다. 비어 있으면 태그를 넣지 않는다.
- **`.env.local`에는 `NEXT_PUBLIC_*` 배포 값을 넣지 않는다.** Next.js에서 `.env.local`이 `.env.production`보다 우선이라, 빈 값이라도 배포 빌드를 덮어쓴다.
- `NEXT_PUBLIC_SITE_URL` — 배포 도메인 (sitemap/OG). `.env.production`에 있다.

## 날짜와 빌드

공개 예정/공개됨은 **빌드 시점 날짜(KST)**로 나뉜다. 정적 사이트라 날짜가 지나도 다시 빌드하기 전엔 바뀌지 않는다. 영상이 올라가는 날 다시 빌드·배포한다.

## 미정 사항 (결정 전 임의로 정하지 말 것)

- 도메인: 당분간 `lockedlibrary.pages.dev`. 도메인을 사면 Cloudflare Pages에 연결하고 `.env.production` 주소를 바꾼다. (Vercel 무료 플랜은 제휴 수익 사이트를 상업적 용도로 보아 쓰지 않기로 함)
- 한국어 번역본 제공 여부 (지금은 영어 등 원어 원문 링크만)
- 한국어판 구매 링크: **쿠팡 파트너스 연결 (2026-11-24)** — 검은 고양이, 변신, 누런 벽지. 스위니 토드는 한국어판이 없어 링크 없음. **예스24**(링크프라이스, 사업자 필요)는 사용자가 사업자등록(정보통신업) 후 신청 예정. 승인되면 같은 책에 `{ store: "예스24", url }`을 추가한다. 알라딘 TTB는 2022-08-31 종료되어 쓸 수 없다. 사용자가 준 링크만 넣는다.
