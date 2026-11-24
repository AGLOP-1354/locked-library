/** 화면 라벨: horror 공포, detective 추리, mystery 미스터리 */
export type BookGenre = "horror" | "detective" | "mystery";

/** 책등·표지 천 색. globals.css의 --color-cloth-* 토큰, src/lib/cloth.ts와 1:1 */
export type ClothColor =
  | "oxblood"
  | "bottle"
  | "navy"
  | "ochre"
  | "plum"
  | "rust"
  | "slate"
  | "vellum";

export type TextLanguage = "en" | "de" | "fr" | "ko";

/** 무료로 읽을 수 있는 원문/번역본 외부 링크 (위키문헌, 구텐베르크 등) */
export type ReadLink = {
  url: string;
  language: TextLanguage;
  /** true면 번역본, 아니면 원작 언어 원문 */
  translation?: boolean;
};

/** 영상 챕터. time은 "1:17" 형식 */
export type Chapter = { time: string; title: string };

export type StoreLink = {
  /** 화면에 보이는 서점 이름 (예: "예스24") */
  store: string;
  /** 제휴(수수료) 링크 */
  url: string;
};

/** 한국어판 구매 링크. 있으면 "한국어판 구매" 버튼이 생긴다. */
export type KoreanEdition = {
  /** 어느 출판사 판인지 확인된 경우에만. 모르면 비워 둔다(지어내지 않는다). */
  publisher?: string;
  /** 한국어판 책 제목이 채널 제목과 다를 때만 */
  title?: string;
  translator?: string;
  /** 첫 번째가 대표. 하나면 바로 이동, 여러 개면 서점 목록이 펼쳐진다. */
  stores: StoreLink[];
};

export type Book = {
  /** URL 슬러그. 원제 기반 영문 소문자-하이픈. 한 번 정하면 바꾸지 않는다. */
  id: string;
  /** 채널에서 부르는 한국어 제목 */
  title: string;
  originalTitle?: string;
  author: string;
  /** 원작 발표 연도. 연재물은 "1846–47"처럼 문자열 */
  year?: number | string;
  genres: BookGenre[];
  /** 저작권 상태 근거 (예: "public-domain", "licensed:출판사명") */
  rights: string;
  /** 스포일러 없는 한두 문장 소개. 영상 설명의 첫 문단을 그대로 쓴다. */
  summary: string;
  /** 각색 안내 (예: "1930년대 경성을 배경으로 인물을 바꿔 각색했어요.") */
  adaptation?: string;
  /** public/covers/ 아래 경로 */
  cover?: string;
  /** 책등 색. 없으면 id로 자동 선택 */
  cloth?: ClothColor;
  youtubeVideoId?: string;
  /** 유튜브 영상 제목 */
  videoTitle?: string;
  chapters?: Chapter[];
  /** 첫 번째가 대표 링크 ("○○ 원문 읽기" 버튼) */
  readLinks?: ReadLink[];
  koreanEdition?: KoreanEdition;
  /** 영상 공개일 YYYY-MM-DD (KST). 빌드 날짜보다 미래면 '공개 예정' */
  publishedAt: string;
};
