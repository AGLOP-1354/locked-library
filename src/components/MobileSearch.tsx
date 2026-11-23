"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { SearchBox, type SearchItem } from "@/components/SearchBox";

/** 모바일 헤더의 검색 버튼. 누르면 헤더 아래에 검색창이 열린다. */
export function MobileSearch({ items }: { items: SearchItem[] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        aria-label={open ? "검색 닫기" : "책 검색"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex size-11 items-center justify-center text-paper"
      >
        <Icon name={open ? "close" : "search"} size={20} />
      </button>
      {open ? (
        <div className="absolute inset-x-0 top-full border-b border-line bg-ink px-4 py-3">
          <SearchBox items={items} autoFocus />
        </div>
      ) : null}
    </>
  );
}
