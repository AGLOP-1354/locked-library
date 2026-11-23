import { site } from "@/lib/site";
import { getPublishedBooks } from "@/content/books";
import { isBuyable } from "@/lib/books";
import { TrackedLink } from "@/components/TrackedLink";

export function SiteFooter() {
  // 구매 링크가 하나라도 있을 때만 제휴 수수료 안내를 단다.
  const anyBuyable = getPublishedBooks().some(isBuyable);
  return (
    <footer className="border-t border-line bg-ink-deep">
      <div className="mx-auto flex max-w-7xl flex-wrap gap-x-20 gap-y-6 px-4 pb-12 pt-10 md:px-10 md:pt-14">
        <div className="flex max-w-[34em] flex-[1_1_360px] flex-col gap-3.5">
          <span className="font-serif text-lg font-bold md:text-xl">{site.nameKo}</span>
          <p className="text-[13px] leading-[1.8] text-paper-dim md:text-sm">
            공포, 추리, 미스터리 고전을 영상으로 소개하는 유튜브 채널입니다. 무료 원문은 저작권 보호 기간이 끝난 작품이에요.
            {anyBuyable ? " 한국어판 구매 링크로 책을 사면 잠긴 서재가 수수료를 받을 수 있어요." : null}
          </p>
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
