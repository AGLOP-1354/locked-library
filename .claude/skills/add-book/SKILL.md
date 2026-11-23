---
name: add-book
description: 잠긴 서재에 책(무료/유료)을 추가하거나 수정한다. "책 추가", "이번 영상 책 등록", "공개 예정 책 넣어줘" 같은 요청에 사용.
---

# 책 추가

1. `.claude/rules/content.md`를 읽는다.
2. 유튜브 영상 링크를 받으면 영상 페이지의 제목·설명란·공개일·챕터에서 필드를 채운다 (`content.md`의 "데이터 출처"). 브라우저로 `ytInitialPlayerResponse.videoDetails.shortDescription`과 `microformat.playerMicroformatRenderer.publishDate`를 읽으면 된다.
   그 외 없는 값은 **지어내지 말고** 물어본다:
   - 필수: 제목, 저자, 장르(공포/추리/미스터리), 저작권 근거, 요약, 공개일
   - 선택: 원제, 발표 연도, 유튜브 영상 URL(→ `youtubeVideoId`만 추출), 영상 제목, 챕터, 원문 링크, 각색 안내, 한국어판(출판사, 옮긴이, 서점 제휴 링크), 표지
3. 저작권 확인: 저자 사망 연도로 만료 여부를 판단하고, 번역본이면 번역 권리도 확인한다. 애매하면 `readLinks`를 넣지 말고 사용자에게 묻는다.
   한국어판 구매 링크만 추가하는 요청이면 해당 책의 `koreanEdition`만 채운다.
4. `id` 슬러그를 정하고 `src/content/books.ts`의 `books` 배열에 추가한다 (공개일 내림차순 유지). `generateStaticParams`가 `/books/<id>/` 페이지를 자동으로 만든다.
5. 표지가 있으면 `public/covers/<id>.jpg`로 두고 `cover: "/covers/<id>.jpg"`.
6. `pnpm typecheck && pnpm build`로 확인하고, 추가된 항목을 사용자에게 요약한다.
