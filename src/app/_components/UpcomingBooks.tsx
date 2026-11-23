import type { Book } from "@/types/book";
import { site } from "@/lib/site";
import { formatDate, hasFreeText, isBuyable } from "@/lib/books";
import { BookTags } from "@/components/BookTags";
import { Icon } from "@/components/Icon";
import { TrackedLink } from "@/components/TrackedLink";
import { btn } from "@/components/buttonStyles";
import { SectionHeading } from "./SectionHeading";

export function UpcomingBooks({ books }: { books: Book[] }) {
  if (books.length === 0) return null;
  const subscribe = (
    <TrackedLink
      href={site.youtube.channelUrl}
      event={{ name: "youtube_click", params: { placement: "upcoming_subscribe" } }}
      className={`${btn.ghost} h-[50px] md:h-12 md:px-5.5`}
    >
      <Icon name="bell" size={16} />
      유튜브에서 알림 받기
    </TrackedLink>
  );
  return (
    <section id="upcoming" aria-labelledby="upcoming-title" className="scroll-mt-28 border-t border-line">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-10 md:pb-24 md:pt-22">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="upcoming-title" title="공개 예정">
            곧 영상으로 올라올 책이에요. 영상이 올라오는 날 여기에도 추가돼요.
          </SectionHeading>
          <div className="hidden md:block">{subscribe}</div>
        </div>
        <ol className="mt-7 flex flex-col gap-7 border-l border-wood-edge pl-6 md:mt-12 md:grid md:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] md:gap-8 md:border-l-0 md:pl-0">
          {books.map((b) => (
            <li key={b.id} className="relative flex flex-col gap-1.5 md:gap-2.5 md:border-t md:border-wood-edge md:pt-7">
              <span
                aria-hidden
                className="absolute -left-[30px] top-1.5 size-[11px] rounded-full border-2 border-brass bg-ink md:-top-1.5 md:left-0"
              />
              <time dateTime={b.publishedAt} className="font-serif text-lg font-medium text-brass md:text-[22px]">
                {formatDate(b.publishedAt)}
              </time>
              <span className="font-serif text-[21px] font-bold md:text-2xl">{b.title}</span>
              <span className="flex items-center gap-2.5 text-[13px] text-paper-dim md:text-sm">
                {b.author}
                <BookTags freeText={hasFreeText(b)} buyable={isBuyable(b)} />
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-8 md:hidden [&>a]:w-full">{subscribe}</div>
      </div>
    </section>
  );
}
