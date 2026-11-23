import { site } from "@/lib/site";
import { getUpcomingBooks } from "@/content/books";
import { Icon } from "@/components/Icon";
import { KeyholeLogo } from "@/components/KeyholeLogo";
import { SearchBox, type SearchItem } from "@/components/SearchBox";
import { MobileSearch } from "@/components/MobileSearch";
import { TrackedLink } from "@/components/TrackedLink";

export function SiteHeader({ searchItems }: { searchItems: SearchItem[] }) {
  // 책이 없는 섹션은 메인에서 숨겨지므로 메뉴에서도 뺀다.
  const NAV = [
    { href: "/#books", label: "모든 책", show: true },
    { href: "/#upcoming", label: "공개 예정", show: getUpcomingBooks().length > 0 },
  ].filter((n) => n.show);
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ink/95 backdrop-blur supports-[backdrop-filter]:bg-ink/85">
      <div className="relative mx-auto flex h-15 max-w-7xl items-center gap-1 pl-4 pr-2 md:h-19 md:gap-10 md:px-10">
        <KeyholeLogo />
        <nav aria-label="주요 메뉴" className="hidden gap-7 text-[15px] md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-paper transition-colors hover:text-brass-hover">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex-1" />
        <SearchBox items={searchItems} className="hidden w-65 md:block" />
        <div className="md:hidden">
          <MobileSearch items={searchItems} />
        </div>
        <TrackedLink
          href={site.youtube.channelUrl}
          event={{ name: "youtube_click", params: { placement: "header" } }}
          aria-label="유튜브 채널 구독 (새 창)"
          className="flex size-11 items-center justify-center text-brass md:h-11 md:w-auto md:gap-2 md:rounded-full md:border md:border-brass md:px-4.5 md:text-sm md:font-medium md:hover:bg-brass/10"
        >
          <Icon name="youtube" size={20} />
          <span className="hidden md:inline">유튜브 구독</span>
        </TrackedLink>
      </div>
      <nav aria-label="주요 메뉴" className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3 md:hidden">
        {NAV.map((n) => (
          <a
            key={n.href}
            href={n.href}
            className="flex h-9 shrink-0 items-center rounded-full border border-line-strong px-3.5 text-sm text-paper"
          >
            {n.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
