"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { track, type TrackEvent } from "@/lib/analytics";

type Props = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  event?: TrackEvent;
  /** 외부 링크면 새 탭으로 연다 */
  external?: boolean;
  /** 제휴 구매 링크면 rel에 sponsored */
  sponsored?: boolean;
};

/** 클릭을 GA4로 보내는 링크. 이벤트는 src/lib/analytics.ts의 EventMap에 정의된 것만. */
export function TrackedLink({ href, event, external, sponsored, onClick, children, ...rest }: Props) {
  const handle: Props["onClick"] = (e) => {
    if (event) track(event.name, event.params as never);
    onClick?.(e);
  };
  if (external || /^https?:\/\//.test(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel={sponsored ? "noopener sponsored" : "noopener"}
        onClick={handle}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
