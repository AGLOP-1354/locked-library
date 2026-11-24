"use client";

import { useEffect, useState } from "react";
import type { ClothColor, StoreLink } from "@/types/book";
import { BookCover } from "@/components/BookCover";
import { BuyButton } from "@/components/BuyButton";

type Props = {
  bookId: string;
  title: string;
  cloth: ClothColor;
  publisher?: string;
  stores: StoreLink[];
  disclosures: string[];
};

/**
 * 모바일 하단 구매 바. 소개의 버튼 묶음(#book-actions)을 지나 내려가면 나타나고,
 * 한국어판 카드(#edition-card)가 화면에 보이는 동안에는 숨는다 (같은 버튼이 두 번 보이지 않게).
 */
export function StickyBuyBar({ bookId, title, cloth, publisher, stores, disclosures }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const actions = document.getElementById("book-actions");
    const card = document.getElementById("edition-card");
    if (!actions) return;
    let pastActions = false;
    let cardVisible = false;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === actions) pastActions = !e.isIntersecting && e.boundingClientRect.top < 0;
        if (e.target === card) cardVisible = e.isIntersecting;
      }
      setShow(pastActions && !cardVisible);
    });
    io.observe(actions);
    if (card) io.observe(card);
    return () => io.disconnect();
  }, []);

  return (
    <div
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-brass-line bg-ink-raised/95 px-4 pb-[max(14px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-18px_30px_-12px_rgba(0,0,0,.8)] backdrop-blur transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <BookCover title="" cloth={cloth} className="w-[34px]" titleClassName="hidden" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate font-serif text-[15px] font-bold">{title} 한국어판</span>
          <span className="text-xs text-paper-dim">{stores.map((s) => s.store).join(", ")}에서 판매</span>
        </div>
        <BuyButton
          bookId={bookId}
          title={title}
          publisher={publisher}
          stores={stores}
          placement="sticky_bar"
          menuPlacement="above"
          buttonClassName="inline-flex h-[46px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-brass px-4 text-[15px] font-semibold text-ink transition-colors hover:bg-brass-hover"
        />
      </div>
      {disclosures.map((d) => (
        <p key={d} className="mt-2 text-[11px] leading-snug text-paper-dim">
          {d}
        </p>
      ))}
    </div>
  );
}
