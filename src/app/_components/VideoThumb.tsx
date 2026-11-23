import type { Book } from "@/types/book";
import { clothOf, youtubeThumb } from "@/lib/books";
import { CLOTH_BG } from "@/lib/cloth";

type Props = { book: Book; size?: "lg" | "sm" };

/** 유튜브 썸네일. 영상 ID가 없으면 책 천 색 위에 제목을 얹은 대체 화면. */
export function VideoThumb({ book, size = "lg" }: Props) {
  const src = youtubeThumb(book);
  const lg = size === "lg";
  return (
    <span
      className={`relative block aspect-video overflow-hidden ${lg ? "rounded-md" : "w-24 shrink-0 rounded md:w-28"} ${src ? "bg-ink-raised" : CLOTH_BG[clothOf(book)]} shadow-[inset_0_0_0_1px_rgba(216,187,126,.18)]`}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- 정적 export, 외부 썸네일
        <img src={src} alt="" className="absolute inset-0 size-full object-cover" loading={lg ? "eager" : "lazy"} />
      ) : lg ? (
        <span className="absolute inset-0 flex items-end p-6 font-serif text-3xl font-black tracking-[-0.03em] text-cover-title/40 md:p-8 md:text-5xl">
          {book.title}
        </span>
      ) : null}
    </span>
  );
}
