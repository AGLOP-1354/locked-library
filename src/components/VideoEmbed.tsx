"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { track } from "@/lib/analytics";

const PLAY_EVENT = "lockedlibrary:play-video";

type PlayDetail = { bookId: string; placement: string; start?: number };

/**
 * 같은 페이지의 VideoEmbed에게 재생을 부탁한다 ("영상 보기" 버튼, 영상 차례, 하단 구매 바 등).
 * 유튜브로 내보내지 않고 사이트 안에서 재생해, 영상이 끝나도 구매 버튼이 곁에 남게 한다.
 */
export function requestVideoPlay(bookId: string, placement: string, start?: number) {
  window.dispatchEvent(new CustomEvent<PlayDetail>(PLAY_EVENT, { detail: { bookId, placement, start } }));
}

type Props = { bookId: string; videoId: string; title: string; placement: string; className?: string };

/**
 * 가벼운 유튜브 플레이어: 처음엔 썸네일만, 누르면 그때 iframe을 넣는다 (youtube-nocookie).
 * id="video"라서 다른 페이지에서 `/books/<id>/#video`로 바로 올 수 있다.
 */
export function VideoEmbed({ bookId, videoId, title, placement, className = "" }: Props) {
  // null이면 재생 전. 숫자면 그 초부터 재생 중.
  const [start, setStart] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onRequest = (e: Event) => {
      const d = (e as CustomEvent<PlayDetail>).detail;
      if (d.bookId !== bookId) return;
      setStart(d.start ?? 0);
      track("video_play", { book_id: bookId, placement: d.placement, ...(d.start ? { start: d.start } : {}) });
      box.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    window.addEventListener(PLAY_EVENT, onRequest);
    return () => window.removeEventListener(PLAY_EVENT, onRequest);
  }, [bookId]);

  return (
    <div
      id="video"
      ref={box}
      className={`relative aspect-video scroll-mt-28 overflow-hidden rounded-md bg-ink-raised shadow-[0_30px_80px_-30px_rgba(0,0,0,.8)] ${className}`}
    >
      {start !== null ? (
        <iframe
          key={start}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0${start ? `&start=${start}` : ""}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => requestVideoPlay(bookId, placement)}
          aria-label={`${title} 재생 (이 페이지에서 재생)`}
          className="group absolute inset-0 size-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- 정적 export, 외부 썸네일 */}
          <img
            src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
          <span className="absolute left-1/2 top-1/2 flex size-15 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-brass bg-ink/70 text-brass transition-transform duration-300 group-hover:scale-105 md:size-19">
            <Icon name="play" size={22} />
          </span>
        </button>
      )}
    </div>
  );
}
