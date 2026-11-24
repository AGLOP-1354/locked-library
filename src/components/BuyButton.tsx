"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { StoreLink } from "@/types/book";
import { Icon } from "@/components/Icon";
import { TrackedLink } from "@/components/TrackedLink";

type Props = {
  bookId: string;
  title: string;
  publisher?: string;
  stores: StoreLink[];
  placement: string;
  /** 버튼(또는 링크) 자체의 모양 클래스 */
  buttonClassName: string;
  className?: string;
};

/**
 * 한국어판 구매 버튼. 서점이 하나면 바로 이동, 여러 개면 서점 목록을 펼친다.
 * 모든 클릭은 purchase_click으로 기록된다. 제휴 링크라 rel="sponsored".
 */
export function BuyButton({ bookId, title, publisher, stores, placement, buttonClassName, className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  if (stores.length === 0) return null;

  const event = (store: string) =>
    ({ name: "purchase_click", params: { book_id: bookId, store, publisher, placement } }) as const;

  if (stores.length === 1) {
    const s = stores[0];
    return (
      <TrackedLink
        href={s.url}
        external
        sponsored
        aria-label={`${title} 한국어판, ${s.store}에서 구매 (새 창)`}
        event={event(s.store)}
        className={`${buttonClassName} ${className}`}
      >
        한국어판 구매
        <Icon name="external" size={14} />
      </TrackedLink>
    );
  }

  return (
    <div ref={wrap} className={`relative ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${title} 한국어판 구매, 서점 고르기`}
        onClick={() => setOpen((v) => !v)}
        className={`${buttonClassName} w-full`}
      >
        한국어판 구매
        <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open ? (
        <ul
          id={menuId}
          className="absolute inset-x-0 top-[calc(100%+6px)] z-10 min-w-48 overflow-hidden rounded-xl border border-line-strong bg-ink-raised shadow-[0_20px_40px_-12px_rgba(0,0,0,.8)]"
        >
          {stores.map((s) => (
            <li key={s.store} className="border-b border-line last:border-0">
              <TrackedLink
                href={s.url}
                external
                sponsored
                event={event(s.store)}
                className="flex min-h-11 items-center justify-between px-4 text-sm text-paper hover:bg-brass/10"
              >
                {s.store}
                <Icon name="external" size={13} className="text-paper-dim" />
              </TrackedLink>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
