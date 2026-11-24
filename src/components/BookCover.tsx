import type { ClothColor } from "@/types/book";
import { CLOTH_BG } from "@/lib/cloth";
import { isLightCloth } from "@/lib/books";

type Props = { title: string; cloth: ClothColor; cover?: string; className?: string; titleClassName?: string };

/**
 * 책 표지. 실제 표지 이미지(public/covers/)가 있으면 그걸, 없으면 천 장정 위에 제목을 올린 대체 표지.
 * 크기는 className(너비)으로 정한다. 비율은 2:3 고정.
 */
export function BookCover({ title, cloth, cover, className = "", titleClassName = "text-lg md:text-2xl" }: Props) {
  const light = isLightCloth(cloth);
  return (
    <div
      className={`relative flex aspect-[2/3] shrink-0 items-center justify-center rounded-[2px_5px_5px_2px] shadow-[inset_5px_0_0_rgba(0,0,0,.25),0_20px_32px_-20px_rgba(0,0,0,.9)] ${CLOTH_BG[cloth]} ${className}`}
    >
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element -- 정적 export
        <img src={cover} alt={`${title} 표지`} className="absolute inset-0 size-full rounded-[inherit] object-cover" loading="lazy" />
      ) : (
        <>
          <span aria-hidden className={`absolute inset-[7%] border ${light ? "border-foil-ink/40" : "border-foil/45"}`} />
          <span
            aria-hidden
            className={`px-[12%] text-center font-serif font-bold leading-[1.3] ${light ? "text-foil-ink" : "text-cover-title"} ${titleClassName}`}
          >
            {title}
          </span>
        </>
      )}
    </div>
  );
}
