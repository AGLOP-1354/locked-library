"use client";

import type { BookActionsData } from "@/lib/books";
import { BuyButton } from "@/components/BuyButton";
import { Icon } from "@/components/Icon";
import { TrackedLink } from "@/components/TrackedLink";

const base =
  "inline-flex w-full items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors duration-200";
const size = "h-[52px] px-4 text-[15px] md:text-base";

type Props = { actions: BookActionsData; placement: string; className?: string };

/**
 * 책 버튼 묶음 (사이트 전체 공통):
 *   [ 영상 보기                     ]
 *   [ 영어 원문 읽기 ] [ 한국어판 구매 ]
 * 둘째 줄은 있는 것만. 하나뿐이면 한 줄을 다 쓴다.
 * 구매 버튼이 있으면 아래에 서점별 대가성 문구(쿠팡은 정해진 문장 그대로)를 붙인다.
 */
export function BookActions({ actions, placement, className = "" }: Props) {
  const { bookId, title, videoHref, read, edition } = actions;
  const both = Boolean(read && edition);
  return (
    <div className={`flex w-full max-w-[30rem] flex-col gap-2.5 ${className}`}>
      <TrackedLink
        href={videoHref}
        event={{ name: "youtube_click", params: { book_id: bookId, placement } }}
        className={`${base} ${size} bg-brass font-semibold text-ink hover:bg-brass-hover`}
      >
        <Icon name="play" size={15} />
        영상 보기
      </TrackedLink>
      {read || edition ? (
        <div className={`grid gap-2.5 ${both ? "grid-cols-2" : "grid-cols-1"}`}>
          {read ? (
            <TrackedLink
              href={read.url}
              external
              event={{ name: "read_start", params: { book_id: bookId, placement } }}
              aria-label={`${title} ${read.label} (무료, 새 창)`}
              className={`${base} ${size} border border-line-strong text-paper hover:bg-paper/5`}
            >
              {read.label}
              <Icon name="external" size={13} className="text-paper-dim" />
            </TrackedLink>
          ) : null}
          {edition ? (
            <BuyButton
              bookId={bookId}
              title={title}
              publisher={edition.publisher}
              stores={edition.stores}
              placement={placement}
              buttonClassName={`${base} ${size} border border-brass text-brass hover:bg-brass/10`}
            />
          ) : null}
        </div>
      ) : null}
      {edition ? (
        <div className="flex flex-col gap-1 text-xs leading-relaxed text-paper-dim">
          {edition.publisher ? <p>한국어판은 {edition.publisher} 책이에요.</p> : null}
          {edition.disclosures.map((d) => (
            <p key={d}>{d}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
