"use client";

import { useMemo, useState, type CSSProperties } from "react";
import type { BookGenre, ClothColor } from "@/types/book";
import type { BookActionsData } from "@/lib/books";
import { BookActions } from "@/components/BookActions";
import { BookTags } from "@/components/BookTags";
import { TrackedLink } from "@/components/TrackedLink";
import { track } from "@/lib/analytics";
import { CLOTH_BG } from "@/lib/cloth";

export type ShelfBook = {
  id: string;
  title: string;
  author: string;
  byline: string;
  summary: string;
  genres: BookGenre[];
  cloth: ClothColor;
  light: boolean;
  width: number;
  height: number;
  bookHref: string;
  freeText: boolean;
  buyable: boolean;
  actions: BookActionsData;
};

type Filter = "all" | "free" | "buy" | BookGenre;

type Props = { books: ShelfBook[]; genreLabels: Record<BookGenre, string> };

/**
 * 책장. 책등을 누르면 책이 살짝 빠져나오고 아래 소개가 바뀐다.
 * 이 페이지의 시그니처 요소. 나머지 화면은 조용하게 둔다.
 */
export function BookShelf({ books, genreLabels }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState(books[0]?.id);

  // 실제로 책을 거를 수 있는 버튼만 보여 준다 (모든 책이 해당하거나 아무 책도 없으면 숨김).
  const filters = useMemo(() => {
    const out: { key: Filter; label: string }[] = [];
    const useful = (n: number) => n > 0 && n < books.length;
    if (useful(books.filter((b) => b.freeText).length)) out.push({ key: "free", label: "무료 원문" });
    if (useful(books.filter((b) => b.buyable).length)) out.push({ key: "buy", label: "한국어판" });
    (Object.keys(genreLabels) as BookGenre[]).forEach((g) => {
      if (useful(books.filter((b) => b.genres.includes(g)).length)) out.push({ key: g, label: genreLabels[g] });
    });
    return out;
  }, [books, genreLabels]);

  const list = books.filter((b) =>
    filter === "all" ? true : filter === "free" ? b.freeText : filter === "buy" ? b.buyable : b.genres.includes(filter),
  );
  const selected = list.find((b) => b.id === selectedId) ?? list[0];

  if (books.length === 0) {
    return <p className="mt-10 text-paper-dim">아직 올라온 책이 없어요.</p>;
  }

  const chip = (on: boolean) =>
    `h-11 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors md:px-4.5 ${
      on ? "border-brass bg-brass text-ink" : "border-line-strong text-paper-soft hover:border-brass"
    }`;

  return (
    <>
      {filters.length > 0 ? (
        <div
          role="group"
          aria-label="책 거르기"
          className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 md:absolute md:right-10 md:top-20 md:mx-0 md:mt-0 md:px-0"
        >
          <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")} className={chip(filter === "all")}>
            전체
          </button>
          {filters.map((f) => (
            <button key={f.key} type="button" aria-pressed={filter === f.key} onClick={() => setFilter(f.key)} className={chip(filter === f.key)}>
              {f.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="no-scrollbar -mx-4 mt-2 overflow-x-auto md:mx-0 md:mt-10 md:[scrollbar-width:thin]">
        <div className="min-w-max px-4 pt-7.5 md:px-2 md:pt-9">
          <ul className="flex items-end gap-1 md:gap-[5px]" aria-label="책 목록">
            {list.map((b) => {
              const on = b.id === selected?.id;
              const style = { "--w": `${b.width}px`, "--h": `${b.height}px` } as CSSProperties;
              return (
                <li key={b.id}>
                  <button
                    type="button"
                    aria-pressed={on}
                    aria-label={`${b.title}, ${b.author}`}
                    onClick={() => {
                      setSelectedId(b.id);
                      track("shelf_select", { book_id: b.id });
                    }}
                    style={style}
                    className={`flex h-[calc(var(--h)*0.76)] w-[max(44px,calc(var(--w)*0.76))] flex-col items-center justify-between gap-2 rounded-t-[3px] rounded-b-[1px] px-0 pb-2.5 pt-3 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] md:h-(--h) md:w-(--w) md:gap-2.5 md:pb-3 md:pt-3.5 ${CLOTH_BG[b.cloth]} ${
                      b.light ? "text-foil-ink" : "text-foil"
                    } ${
                      on
                        ? "-translate-y-5 shadow-[0_0_0_2px_var(--color-brass),0_24px_30px_-18px_rgba(0,0,0,.9)] md:-translate-y-6.5"
                        : "shadow-[inset_-4px_0_0_rgba(0,0,0,.22),inset_3px_0_0_rgba(255,255,255,.05)] hover:-translate-y-2"
                    }`}
                  >
                    <span aria-hidden className="h-1 w-[62%] shrink-0 border-y border-current opacity-55 md:h-[5px]" />
                    <span
                      aria-hidden
                      className="flex-1 overflow-hidden whitespace-nowrap font-serif text-[15px] font-bold leading-none tracking-[0.08em] [writing-mode:vertical-rl] md:text-[17px] md:tracking-[0.1em]"
                    >
                      {b.title}
                    </span>
                    <span aria-hidden className="hidden shrink-0 whitespace-nowrap text-[11px] tracking-[0.08em] opacity-85 [writing-mode:vertical-rl] md:block">
                      {b.author.split(" ").at(-1)}
                    </span>
                    <span aria-hidden className="h-1 w-[62%] shrink-0 border-y border-current opacity-55 md:h-[5px]" />
                  </button>
                </li>
              );
            })}
          </ul>
          <div aria-hidden className="h-3 border-t border-wood-edge bg-wood shadow-[0_18px_30px_-12px_rgba(0,0,0,.9)] md:h-4" />
        </div>
      </div>
      <p className="mt-2.5 text-xs text-paper-dim md:hidden">옆으로 넘겨 더 보세요. 책을 누르면 소개가 나와요.</p>

      {selected ? (
        <div
          aria-live="polite"
          className="mt-6 flex flex-col gap-5 border-t border-line pt-6 md:mt-10 md:flex-row md:flex-wrap md:items-start md:justify-between md:gap-x-14 md:gap-y-8 md:pt-8"
        >
          <div className="flex min-w-0 flex-col gap-2.5 md:flex-[1_1_480px] md:gap-3">
            <p className="text-[13px] text-paper-dim md:text-sm">
              {selected.byline}
              <span className="ml-2 text-paper-soft">{selected.genres.map((g) => genreLabels[g]).join(", ")}</span>
            </p>
            <h3 className="font-serif text-[28px] font-bold tracking-[-0.02em] md:text-[34px]">
              <TrackedLink href={selected.bookHref} className="text-paper hover:text-brass-hover">
                {selected.title}
              </TrackedLink>
            </h3>
            <BookTags freeText={selected.freeText} buyable={selected.buyable} />
            <p className="max-w-[34em] font-serif text-base leading-[1.8] text-paper-soft md:text-lg">{selected.summary}</p>
            <TrackedLink
              href={selected.bookHref}
              className="self-start py-1 text-sm text-brass underline decoration-brass-line underline-offset-4 hover:text-brass-hover"
            >
              영상 차례와 원작 이야기 보기
            </TrackedLink>
          </div>
          <BookActions actions={selected.actions} placement="shelf_detail" className="md:flex-[0_1_420px] md:pt-7" />
        </div>
      ) : (
        <p className="mt-6 text-paper-dim">조건에 맞는 책이 없어요.</p>
      )}
    </>
  );
}
