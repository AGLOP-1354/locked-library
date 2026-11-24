import { site } from "@/lib/site";
import { getPublishedBooks } from "@/content/books";
import { isBuyable, storeDisclosures } from "@/lib/books";
import { TrackedLink } from "@/components/TrackedLink";

export function SiteFooter() {
  // 구매 링크가 있을 때만, 쓰인 서점들의 대가성 문구를 단다 (쿠팡은 정해진 문장 그대로).
  const disclosures = storeDisclosures(
    getPublishedBooks()
      .filter(isBuyable)
      .flatMap((b) => b.koreanEdition!.stores),
  );
  return (
    <footer className="border-t border-line bg-ink-deep">
      <div className="mx-auto flex max-w-7xl flex-wrap gap-x-20 gap-y-6 px-4 pb-12 pt-10 md:px-10 md:pt-14">
        <div className="flex max-w-[34em] flex-[1_1_360px] flex-col gap-3.5">
          <span className="font-serif text-lg font-bold md:text-xl">{site.nameKo}</span>
          <p className="text-[13px] leading-[1.8] text-paper-dim md:text-sm">
            공포, 추리, 미스터리 고전을 영상으로 소개하는 유튜브 채널입니다. 무료 원문은 저작권 보호 기간이 끝난 작품이에요.
          </p>
          {disclosures.map((d) => (
            <p key={d} className="text-[13px] leading-[1.8] text-paper-dim md:text-sm">
              {d}
            </p>
          ))}
        </div>
        <nav aria-label="바닥글 메뉴" className="flex flex-wrap gap-x-5 text-sm md:flex-col md:gap-3">
          <TrackedLink
            href={site.youtube.channelUrl}
            event={{ name: "youtube_click", params: { placement: "footer" } }}
            className="py-2.5 text-brass hover:text-brass-hover md:py-0"
          >
            유튜브 채널
          </TrackedLink>
        </nav>
        <p className="basis-full text-xs text-paper-dim md:text-[13px]">© {new Date().getFullYear()} {site.nameKo}</p>
      </div>
    </footer>
  );
}
