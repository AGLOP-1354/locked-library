"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { BookTags } from "@/components/BookTags";
import { TrackedLink } from "@/components/TrackedLink";
import { track } from "@/lib/analytics";

export type SearchItem = { id: string; title: string; author: string; freeText: boolean; buyable: boolean; href: string };

type Props = { items: SearchItem[]; autoFocus?: boolean; className?: string };

/** 제목/작가 검색. 정적 사이트라 브라우저에서 바로 거른다. */
export function SearchBox({ items, autoFocus, className = "" }: Props) {
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const listId = useId();
  const inputId = useId();
  const lastTracked = useRef("");

  const term = q.trim().toLowerCase();
  const results = useMemo(
    () =>
      term
        ? items.filter((b) => b.title.toLowerCase().includes(term) || b.author.toLowerCase().includes(term)).slice(0, 6)
        : [],
    [items, term],
  );

  useEffect(() => {
    if (term.length < 2) return;
    const t = setTimeout(() => {
      if (lastTracked.current !== term) {
        lastTracked.current = term;
        track("search", { search_term: term });
      }
    }, 800);
    return () => clearTimeout(t);
  }, [term]);

  const open = focused && term.length > 0;

  return (
    <div className={`relative ${className}`}>
      <label htmlFor={inputId} className="sr-only">
        책 검색
      </label>
      <Icon name="search" size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-paper-dim" />
      <input
        id={inputId}
        type="search"
        value={q}
        autoFocus={autoFocus}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        placeholder="제목이나 작가로 찾기"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        className="h-11 w-full rounded-full border border-line-strong bg-ink-raised pl-10 pr-4 text-sm text-paper placeholder:text-paper-dim focus:border-brass focus:outline-none"
      />
      {open ? (
        <div
          id={listId}
          className="absolute inset-x-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-xl border border-line-strong bg-ink-raised shadow-[0_20px_40px_-12px_rgba(0,0,0,.8)]"
        >
          {results.length === 0 ? (
            <p className="px-4 py-3.5 text-sm text-paper-dim">‘{q.trim()}’에 맞는 책이 없어요.</p>
          ) : (
            <ul>
              {results.map((b) => (
                <li key={b.id} className="border-b border-line last:border-0">
                  <TrackedLink
                    href={b.href}
                    className="flex min-h-12 items-center justify-between gap-3 px-4 py-2 hover:bg-brass/10"
                  >
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate font-serif font-bold text-paper">{b.title}</span>
                      <span className="truncate text-xs text-paper-dim">{b.author}</span>
                    </span>
                    <BookTags freeText={b.freeText} buyable={b.buyable} />
                  </TrackedLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
