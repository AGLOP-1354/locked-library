"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { track } from "@/lib/analytics";

type Props = { bookId: string; videoId: string; title: string };

/**
 * 가벼운 유튜브 플레이어: 처음엔 썸네일만 보여 주고, 누르면 그때 iframe을 넣는다.
 * youtube-nocookie 도메인으로 쿠키를 줄인다.
 */
export function VideoEmbed({ bookId, videoId, title }: Props) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-md bg-ink-raised shadow-[0_30px_80px_-30px_rgba(0,0,0,.8)]">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            setPlaying(true);
            track("youtube_click", { book_id: bookId, placement: "book_embed" });
          }}
          aria-label={`${title} 재생`}
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
