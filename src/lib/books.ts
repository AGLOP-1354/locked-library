import type { Book, BookGenre, ClothColor, ReadLink, TextLanguage } from "@/types/book";
import { site } from "@/lib/site";

export const GENRE_LABEL: Record<BookGenre, string> = {
  horror: "공포",
  detective: "추리",
  mystery: "미스터리",
};

const LANGUAGE_LABEL: Record<TextLanguage, string> = {
  en: "영어",
  de: "독일어",
  fr: "프랑스어",
  ko: "한국어",
};

const CLOTHS: ClothColor[] = ["oxblood", "bottle", "navy", "ochre", "plum", "rust", "slate", "vellum"];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function clothOf(book: Pick<Book, "id" | "cloth">): ClothColor {
  return book.cloth ?? CLOTHS[hash(book.id) % CLOTHS.length];
}

/** 밝은 천(vellum)은 어두운 글자, 나머지는 금박 글자 */
export const isLightCloth = (c: ClothColor) => c === "vellum";

/** 데스크톱 기준 책등 크기(px). 모바일은 CSS에서 줄인다. */
export function spineSize(book: Pick<Book, "id" | "title" | "author">) {
  const chars = book.title.replace(/\s/g, "").length;
  const spaces = book.title.length - chars;
  const width = Math.min(70, 40 + chars * 2.6);
  // 브라우저에서 잰 값(Hahmlet 17px 세로쓰기): 글자 ≈ 25.5px, 공백 ≈ 13px, 작가 글자(11px) ≈ 17.5px,
  // 위아래 띠·여백·간격 ≈ 70px. 제목이 잘리지 않도록 이 합보다 크게 잡는다.
  const authorChars = (book.author.split(" ").at(-1) ?? "").length;
  const needed = chars * 25.5 + spaces * 13 + authorChars * 17.5 + 70;
  const height = Math.min(420, Math.max(240, needed) + (hash(book.id) % 30));
  return { width: Math.round(width), height: Math.round(height) };
}

/** "1:17" → 77 */
export function toSeconds(time: string): number {
  return time.split(":").map(Number).reduce((acc, n) => acc * 60 + n, 0);
}

export const youtubeUrl = (book: Pick<Book, "youtubeVideoId">, atSeconds?: number) =>
  book.youtubeVideoId
    ? `https://www.youtube.com/watch?v=${book.youtubeVideoId}${atSeconds ? `&t=${atSeconds}s` : ""}`
    : site.youtube.channelUrl;

export const youtubeThumb = (book: Pick<Book, "youtubeVideoId">) =>
  book.youtubeVideoId ? `https://i.ytimg.com/vi/${book.youtubeVideoId}/maxresdefault.jpg` : undefined;

export const bookHref = (book: Pick<Book, "id">) => `/books/${book.id}/`;

/** 읽기 링크 버튼 문구: "영어 원문 읽기", "영어 번역본 읽기" */
export const readLabel = (link: ReadLink) =>
  `${LANGUAGE_LABEL[link.language]} ${link.translation ? "번역본" : "원문"} 읽기`;

/**
 * 제휴 프로그램이 요구하는 대가성 문구. 서점 이름(StoreLink.store)으로 찾는다.
 * 문구는 각 프로그램이 정한 그대로 쓴다 (바꾸지 않는다).
 */
const STORE_DISCLOSURE: Record<string, string> = {
  쿠팡: "이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.",
};

/** 대가성 문구가 따로 정해지지 않은 서점에 쓰는 기본 문구 */
export const DEFAULT_DISCLOSURE = "구매 링크로 책을 사면 잠긴 서재가 수수료를 받을 수 있어요.";

/** 서점 목록에 필요한 대가성 문구들 (중복 제거) */
export function storeDisclosures(stores: { store: string }[]): string[] {
  return [...new Set(stores.map((s) => STORE_DISCLOSURE[s.store] ?? DEFAULT_DISCLOSURE))];
}

/** 무료로 읽을 원문 링크가 있는지 */
export const hasFreeText = (book: Pick<Book, "readLinks">) => (book.readLinks?.length ?? 0) > 0;

/** 한국어판을 살 수 있는지 */
export const isBuyable = (book: Pick<Book, "koreanEdition">) => (book.koreanEdition?.stores.length ?? 0) > 0;

/** 영상 보기 / 원문 읽기 / 한국어판 구매 버튼 묶음에 넘길 값 (클라이언트로 넘기므로 직렬화 가능한 값만) */
export function bookActions(book: Book) {
  const read = book.readLinks?.[0];
  return {
    bookId: book.id,
    title: book.title,
    videoHref: youtubeUrl(book),
    read: read ? { url: read.url, label: readLabel(read) } : undefined,
    edition: isBuyable(book)
      ? {
          publisher: book.koreanEdition!.publisher,
          stores: book.koreanEdition!.stores,
          disclosures: storeDisclosures(book.koreanEdition!.stores),
        }
      : undefined,
  };
}
export type BookActionsData = ReturnType<typeof bookActions>;

/** "2026-11-28" → "11월 28일" */
export function formatDate(ymd: string): string {
  const [, m, d] = ymd.split("-").map(Number);
  return `${m}월 ${d}일`;
}

/** "에드거 앨런 포, 1843년" */
export const byline = (book: Pick<Book, "author" | "year">) =>
  book.year ? `${book.author}, ${book.year}년` : book.author;
