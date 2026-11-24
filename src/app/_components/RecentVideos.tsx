import type { Book } from "@/types/book";
import { bookActions, hasFreeText, isBuyable } from "@/lib/books";
import { BookTags } from "@/components/BookTags";
import { TrackedLink } from "@/components/TrackedLink";
import { VideoThumb } from "./VideoThumb";

export function RecentVideos({ books }: { books: Book[] }) {
  if (books.length === 0) return null;
  return (
    <section aria-labelledby="recent-title" className="mx-auto max-w-7xl px-4 pb-12 pt-10 md:px-10 md:pb-22 md:pt-16">
      <h2 id="recent-title" className="mb-1 text-sm font-medium text-paper-dim md:mb-4 md:text-[15px]">
        최근 영상
      </h2>
      <ul className="grid md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] md:gap-6">
        {books.map((b) => (
          <li key={b.id}>
            <TrackedLink
              href={bookActions(b).videoPageHref}
              aria-label={`${b.title} 영상 보기`}
              className="group flex items-center gap-3.5 border-b border-line py-3.5 text-paper md:gap-4 md:border-b-0 md:border-t md:pb-0 md:pt-4.5"
            >
              <VideoThumb book={b} size="sm" />
              <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span className="truncate font-serif text-[17px] font-bold transition-colors group-hover:text-brass-hover md:text-lg">
                  {b.title}
                </span>
                <span className="truncate text-[13px] text-paper-dim">{b.author}</span>
                <span className="hidden md:block">
                  <BookTags freeText={hasFreeText(b)} buyable={isBuyable(b)} />
                </span>
              </span>
              {isBuyable(b) ? (
                <span className="self-center md:hidden">
                  <BookTags freeText={false} buyable />
                </span>
              ) : null}
            </TrackedLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
