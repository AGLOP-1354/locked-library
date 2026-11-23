"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** 책 페이지 진입을 book_view로 기록한다. 화면에는 아무것도 그리지 않는다. */
type Props = { bookId: string; freeText: boolean; buyable: boolean };

export function BookViewTracker({ bookId, freeText, buyable }: Props) {
  useEffect(() => {
    track("book_view", { book_id: bookId, free_text: freeText, buyable });
  }, [bookId, freeText, buyable]);
  return null;
}
