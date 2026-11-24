"use client";

import type { Chapter, StoreLink } from "@/types/book";
import { BuyButton } from "@/components/BuyButton";
import { Icon } from "@/components/Icon";
import { requestVideoPlay } from "@/components/VideoEmbed";
import { toSeconds } from "@/lib/books";

type Props = {
  bookId: string;
  title: string;
  chapters: Chapter[];
  /** 원작 이야기 장 아래에 붙는 구매 권유. 한국어판이 있을 때만 */
  nudge?: { text: string; publisher?: string; stores: StoreLink[] };
};

/** 영상 차례. 누르면 위 영상이 그 장면부터 재생된다 (유튜브로 나가지 않음). */
export function ChapterList({ bookId, title, chapters, nudge }: Props) {
  return (
    <ol className="mt-6 max-w-3xl md:mt-8">
      {chapters.map((c, i) => {
        const isOrigin = c.title.includes("원작");
        return (
          <li key={c.time} className="border-b border-line first:border-t">
            <button
              type="button"
              onClick={() => requestVideoPlay(bookId, "book_chapter", toSeconds(c.time))}
              className="group flex min-h-14 w-full items-center gap-5 py-3 text-left text-paper"
            >
              <span className="w-14 shrink-0 font-serif text-lg tabular-nums text-brass">{c.time}</span>
              <span className="flex-1 font-serif text-lg transition-colors group-hover:text-brass-hover md:text-xl">
                {isOrigin ? "" : `제${i + 1}장 `}
                {c.title}
              </span>
              <Icon name="play" size={12} className="text-paper-dim" />
            </button>
            {isOrigin && nudge ? (
              <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-lg bg-ink-raised px-4 py-3.5 md:px-5">
                <p className="min-w-0 flex-[1_1_220px] text-[13px] leading-relaxed text-paper-soft md:text-[15px]">{nudge.text}</p>
                <BuyButton
                  bookId={bookId}
                  title={title}
                  publisher={nudge.publisher}
                  stores={nudge.stores}
                  placement="chapter_nudge"
                  buttonClassName="inline-flex h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-brass px-4 text-sm font-semibold text-ink transition-colors hover:bg-brass-hover"
                />
              </div>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
