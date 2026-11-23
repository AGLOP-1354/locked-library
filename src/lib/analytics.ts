"use client";

declare global {
  interface Window {
    /** src/components/GoogleTag.tsx가 만든다. 태그 ID가 없으면 undefined. */
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * 사이트에서 측정하는 GA4 이벤트 목록. 새 이벤트는 여기에 먼저 추가한다.
 * 이벤트/파라미터 이름은 GA4 규칙(snake_case, 40자 이하)을 따른다.
 */
export type EventMap = {
  /** 책 페이지 진입 */
  book_view: { book_id: string; free_text: boolean; buyable: boolean };
  /** 유튜브 영상/채널로 나가는 클릭 */
  youtube_click: { book_id?: string; placement: string };
  /** 한국어판 서점 링크 클릭 (수수료 전환의 핵심 지표) */
  purchase_click: { book_id: string; store: string; publisher: string; placement: string };
  /** 무료 원문(외부 전자도서관) 링크 클릭 */
  read_start: { book_id: string; placement: string };
  /** 사이트 검색 (GA4 추천 이벤트 이름) */
  search: { search_term: string };
  /** 책장에서 책을 골라 소개를 연 경우 */
  shelf_select: { book_id: string };
};

export type TrackEvent = { [K in keyof EventMap]: { name: K; params: EventMap[K] } }[keyof EventMap];

/** GA4 이벤트 전송. Google 태그가 없으면(로컬 개발 등) 아무것도 하지 않는다. */
export function track<K extends keyof EventMap>(name: K, params: EventMap[K]) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
