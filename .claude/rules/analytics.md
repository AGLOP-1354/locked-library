# GA4 측정 규칙

- 로드: `src/app/layout.tsx`의 `<GoogleTag id={NEXT_PUBLIC_GA_ID} />` (`src/components/GoogleTag.tsx`). GA4 설치 안내가 준 **Google 태그 컨테이너 `GTM-5C4W27RW`**를 그대로 넣고, 그 안의 GA4 속성은 **`G-F057EFMVC7`**이다. G- ID를 직접 넣어도 동작한다.
- 값은 `.env.production`. `.env.local`에 `NEXT_PUBLIC_GA_ID`를 (빈 값이라도) 두면 배포 빌드에서 그 값이 이겨서 태그가 빠진다.
- 페이지뷰는 GA4 향상된 측정이 SPA 이동(history 변경)까지 자동 수집하므로 따로 보내지 않는다.
- `@next/third-parties`의 `sendGAEvent`는 그 라이브러리의 GA 컴포넌트에서만 동작해서 쓰지 않는다(제거함).
- 이벤트: 링크는 `<TrackedLink event={…}>`, 그 밖은 `src/lib/analytics.ts`의 `track(name, params)`로 보낸다. `window.gtag`를 직접 부르지 않는다. `track()`이 `gtag("event", …)`로 보낸다.
- 새 이벤트는 `EventMap`에 타입부터 추가한다. 이름·파라미터는 snake_case, 40자 이하, 개인정보 금지.
- 핵심 전환: `purchase_click` (GA4에서 '주요 이벤트'로 표시). 그다음 `youtube_click`, `read_start`.
- 구매/유튜브 링크에는 `placement`(예: `book_detail_hero`, `book_card`)를 꼭 넣어 위치별 성과를 비교한다.
- 외부 구매 링크는 `target="_blank" rel="noopener sponsored"` (`BuyButton`/`TrackedLink sponsored`가 처리).
- `purchase_click` 파라미터: `book_id`, `store`(서점), `publisher`(출판사, 모르면 없음), `placement`. 출판사·서점별 성과를 GA4 맞춤 측정기준으로 등록해 비교한다.
- `book_view` 파라미터: `book_id`, `free_text`, `buyable`.
- 현재 쓰는 placement: `header`, `footer`, `hero`, `hero_thumb`, `hero_empty`, `recent`, `shelf_detail`, `upcoming_subscribe`, `book_page`, `book_embed`, `book_chapter`, `book_origin`.
- `read_start`는 외부 원문 링크 클릭이다 (사이트 안에 본문이 없음). `book_view`는 책 페이지 진입.
- 그 밖의 이벤트: `search`(검색어, 0.8초 멈추면 한 번), `shelf_select`(책장에서 책 선택).
- 확인: 배포된 사이트에서 `performance.getEntriesByType("resource")` 중 `g/collect`의 `en=` 값, 또는 GA4 실시간/DebugView. 로컬 개발 서버에는 태그가 없다(`.env.production`만 씀).
- GA4 화면에서 할 일: 맞춤 측정기준 등록(`book_id`, `placement`, `store`, `publisher`), 핵심 이벤트 표시(`read_start`, 구매 링크가 생기면 `purchase_click`).
