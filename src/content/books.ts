import type { Book } from "@/types/book";
import { isBuyable } from "@/lib/books";

/**
 * 실제 책 데이터. 유튜브 채널(@lockedlibrary) 롱폼 영상과 설명란 기준.
 * 새 책은 /add-book 스킬로 추가한다. 공개일 내림차순 유지.
 * 한국어판 구매 링크는 koreanEdition에 넣는다 (예: { stores: [{ store: "쿠팡", url: "…" }] }).
 * store 이름은 "쿠팡", "예스24"처럼 고정한다. 대가성 문구를 서점 이름으로 찾는다(src/lib/books.ts).
 */
const ADAPTED_GYEONGSEONG = "1930년대 경성을 배경으로 인물을 바꿔 각색했어요.";

const books: Book[] = [
  {
    id: "the-string-of-pearls",
    title: "스위니 토드",
    originalTitle: "The String of Pearls",
    author: "작자 미상",
    year: "1846–47",
    genres: ["horror"],
    rights: "public-domain",
    cloth: "oxblood",
    summary:
      "1934년 경성 피맛골, 들어간 손님이 나오지 않는 이발소가 있었어요. 그 옆 골목 만두집은 고기 수레 한 번 들어오지 않는데도 경성에서 제일 잘 팔렸고요.",
    adaptation: `영국 페니 드레드풀 연재소설 「진주 목걸이」가 원작이에요. ${ADAPTED_GYEONGSEONG}`,
    youtubeVideoId: "XMn5Q0TcEDM",
    videoTitle: "경성 제일 만두집의 비밀 재료 | 스위니 토드 전편 몰아보기",
    chapters: [
      { time: "0:00", title: "나오지 않는 손님" },
      { time: "1:17", title: "뒤집히는 의자" },
      { time: "2:43", title: "개도 안 먹는 만두" },
      { time: "3:56", title: "지하실의 화덕" },
      { time: "5:12", title: "원작 이야기" },
    ],
    readLinks: [{ url: "https://en.wikisource.org/wiki/The_String_of_Pearls", language: "en" }],
    publishedAt: "2026-11-19",
  },
  {
    id: "the-black-cat",
    title: "검은 고양이",
    originalTitle: "The Black Cat",
    author: "에드거 앨런 포",
    year: 1843,
    genres: ["horror"],
    rights: "public-domain",
    cloth: "navy",
    summary:
      "내일 새벽, 교수대에 오르는 미장이 덕수. 술에 무너진 그는 아끼던 고양이의 눈을 도려냈고, 똑 닮은 외눈 고양이가 그를 따라다니기 시작했소.",
    adaptation: ADAPTED_GYEONGSEONG,
    youtubeVideoId: "_G0JYWwnBcQ",
    videoTitle: "고양이 한 마리 때문에 교수대에 오른 남자 | 검은 고양이 전편 몰아보기",
    chapters: [
      { time: "0:00", title: "나비" },
      { time: "1:48", title: "두 번째 고양이" },
      { time: "3:11", title: "벽 속의 아내" },
      { time: "5:03", title: "원작 이야기" },
    ],
    readLinks: [{ url: "https://www.gutenberg.org/ebooks/2148", language: "en" }],
    koreanEdition: { stores: [{ store: "쿠팡", url: "https://link.coupang.com/a/iVy4ABWxJ6" }] },
    publishedAt: "2026-11-15",
  },
  {
    id: "the-metamorphosis",
    title: "변신",
    originalTitle: "Die Verwandlung",
    author: "프란츠 카프카",
    year: 1915,
    genres: ["horror"],
    // 원작은 퍼블릭 도메인. 영역본(구텐베르크 5200)은 링크만 걸고 본문을 싣지 않는다.
    rights: "public-domain",
    cloth: "rust",
    summary:
      "5년 동안 혼자 가족을 먹여 살린 아들 정민. 어느 날 아침 벌레가 된 그에게 아버지는 사과를 던졌고, 끝까지 돌봐 주던 여동생은 말했어요. “저건 오빠가 아니야.”",
    adaptation: ADAPTED_GYEONGSEONG,
    youtubeVideoId: "UwRmmJURMDI",
    videoTitle: "가족을 먹여 살리던 아들이 벌레가 되자, 가족이 한 소름 돋는 짓 | 변신 전편 몰아보기",
    chapters: [
      { time: "0:00", title: "벌레가 된 아침" },
      { time: "1:35", title: "숨겨 둔 돈" },
      { time: "3:06", title: "아버지가 던진 사과" },
      { time: "4:49", title: "저건 오빠가 아니야" },
      { time: "6:31", title: "원작 이야기" },
    ],
    readLinks: [
      { url: "https://www.gutenberg.org/ebooks/5200", language: "en", translation: true },
      { url: "https://www.gutenberg.org/ebooks/22367", language: "de" },
    ],
    koreanEdition: { stores: [{ store: "쿠팡", url: "https://link.coupang.com/a/iVzfgrY6cC" }] },
    publishedAt: "2026-11-10",
  },
  {
    id: "the-yellow-wallpaper",
    title: "누런 벽지",
    originalTitle: "The Yellow Wall-Paper",
    author: "샬럿 퍼킨스 길먼",
    year: 1892,
    genres: ["horror"],
    rights: "public-domain",
    cloth: "vellum",
    summary:
      "의사 남편이 산후우울증 치료라며 저를 바닷가 저택 다락방에 가뒀어요. 쇠창살, 쇠고리, 바닥에 박힌 침대… 그리고 누런 벽지.",
    adaptation: "원작을 바탕으로 배경과 인물을 바꿔 각색했어요.",
    youtubeVideoId: "Fmnp3cLMEyk",
    videoTitle: "출산 후 의사 남편이 저를 쇠창살 방에 가둔 이유 | 누런 벽지 전편 몰아보기",
    chapters: [
      { time: "0:00", title: "쇠창살 방" },
      { time: "1:53", title: "무늬 뒤의 여자" },
      { time: "3:36", title: "나가자는 말" },
      { time: "4:50", title: "거꾸로 매달린 머리들" },
      { time: "6:30", title: "계약 마지막 날" },
      { time: "8:06", title: "원작 이야기" },
    ],
    readLinks: [{ url: "https://www.gutenberg.org/ebooks/1952", language: "en" }],
    koreanEdition: { stores: [{ store: "쿠팡", url: "https://link.coupang.com/a/iVziqIFQJ2" }] },
    publishedAt: "2026-11-09",
  },
];

/** 빌드 시점 날짜 (YYYY-MM-DD, KST). 정적 사이트라 날짜가 지나면 다시 빌드해야 반영된다. */
function today(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" }).format(new Date());
}

const byNewest = (a: Book, b: Book) => b.publishedAt.localeCompare(a.publishedAt);
const byOldest = (a: Book, b: Book) => a.publishedAt.localeCompare(b.publishedAt);

export const getAllBooks = () => [...books];

export function getPublishedBooks(): Book[] {
  const t = today();
  return books.filter((b) => b.publishedAt <= t).sort(byNewest);
}

export function getUpcomingBooks(): Book[] {
  const t = today();
  return books.filter((b) => b.publishedAt > t).sort(byOldest);
}


/**
 * 한국어판 구매 링크가 있는 책을 앞으로 (수수료 전환 우선, 2026-11-24 결정).
 * 각 묶음 안에서는 원래 순서(최신순)를 유지한다.
 */
export function buyableFirst(list: Book[]): Book[] {
  return [...list.filter(isBuyable), ...list.filter((b) => !isBuyable(b))];
}

/** 홈·검색에 보여 줄 순서: 구매 가능한 책 먼저, 그다음 최신순 */
export const getShowcaseBooks = () => buyableFirst(getPublishedBooks());

/** 메인 맨 위에 둘 책: 영상이 있는 책 중 구매 가능한 가장 최근 책, 없으면 가장 최근 책 */
export const getLatestBook = () => getShowcaseBooks().find((b) => b.youtubeVideoId) ?? getPublishedBooks()[0];

export const getBook = (id: string) => books.find((b) => b.id === id);
