"use client";

import type { BookActionsData } from "@/lib/books";
import { BuyButton } from "@/components/BuyButton";
import { Icon } from "@/components/Icon";
import { TrackedLink } from "@/components/TrackedLink";
import { requestVideoPlay } from "@/components/VideoEmbed";
import { actionStyle } from "@/components/buttonStyles";


type Props = {
  actions: BookActionsData;
  placement: string;
  /**
   * "영상 보기"를 누르면:
   * - inline: 같은 페이지의 VideoEmbed가 재생 (책 페이지, 메인 첫 화면)
   * - page: 그 책 페이지의 영상 위치로 이동 (책장 소개 등)
   */
  video?: "inline" | "page";
  className?: string;
};

/**
 * 책 버튼 묶음 (사이트 전체 공통):
 *   [ 영상 보기 (테두리)                    ]
 *   [ 영어 원문 읽기 (회색) ] [ 한국어판 구매 (금색 채움) ]
 * 둘째 줄은 있는 것만. 하나뿐이면 한 줄을 다 쓴다.
 * 구매 버튼이 있으면 아래에 서점별 대가성 문구(쿠팡은 정해진 문장 그대로)를 붙인다.
 */
export function BookActions({ actions, placement, video = "page", className = "" }: Props) {
  const { bookId, title, hasVideo, videoPageHref, read, edition } = actions;
  const both = Boolean(read && edition);
  return (
    <div className={`flex w-full max-w-[30rem] flex-col gap-2.5 ${className}`}>
      {hasVideo ? (
        video === "inline" ? (
          <button type="button" onClick={() => requestVideoPlay(bookId, placement)} className={actionStyle.video}>
            <Icon name="play" size={15} />
            영상 보기
          </button>
        ) : (
          <TrackedLink href={videoPageHref} className={actionStyle.video}>
            <Icon name="play" size={15} />
            영상 보기
          </TrackedLink>
        )
      ) : null}
      {read || edition ? (
        <div className={`grid gap-2.5 ${both ? "grid-cols-2" : "grid-cols-1"}`}>
          {read ? (
            <TrackedLink
              href={read.url}
              external
              event={{ name: "read_start", params: { book_id: bookId, placement } }}
              aria-label={`${title} ${read.label} (무료, 새 창)`}
              className={actionStyle.read}
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
              buttonClassName={actionStyle.buy}
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
