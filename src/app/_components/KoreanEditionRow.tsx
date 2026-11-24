import type { Book } from "@/types/book";
import { bookHref, clothOf, storeDisclosures } from "@/lib/books";
import { BookCover } from "@/components/BookCover";
import { BuyButton } from "@/components/BuyButton";
import { TrackedLink } from "@/components/TrackedLink";

/**
 * 메인 첫 화면 바로 아래 "한국어판으로 읽을 수 있는 책" 줄.
 * 최신 영상의 책에 한국어판이 없어도, 첫 화면 근처에서 살 수 있는 책이 보이게 한다.
 */
export function KoreanEditionRow({ books }: { books: Book[] }) {
  if (books.length === 0) return null;
  return (
    <section id="korean" aria-labelledby="korean-title" className="scroll-mt-28 border-y border-line bg-ink-deep">
      <div className="mx-auto max-w-7xl py-10 md:px-10 md:py-16">
        <div className="px-4 md:px-0">
          <h2 id="korean-title" className="font-serif text-[26px] font-bold tracking-[-0.02em] md:text-[34px]">
            한국어판으로 읽을 수 있는 책
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-paper-dim md:text-[15px]">영상으로 본 이야기, 원작은 책에서 이어 읽어 보세요.</p>
        </div>
        <ul className="no-scrollbar mt-5 flex snap-x scroll-px-4 gap-3.5 overflow-x-auto px-4 md:mt-8 md:grid md:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] md:gap-x-8 md:gap-y-10 md:overflow-visible md:px-0">
          {books.map((b) => (
            <li key={b.id} className="flex w-[150px] shrink-0 snap-start flex-col gap-2.5 md:w-auto md:gap-3">
              <TrackedLink href={bookHref(b)} aria-label={`${b.title} 책 페이지`} className="block transition-transform duration-300 hover:-translate-y-1">
                <BookCover title={b.title} cloth={clothOf(b)} cover={b.cover} className="w-full" titleClassName="text-lg md:text-2xl" />
              </TrackedLink>
              <div className="flex flex-col gap-0.5">
                <TrackedLink href={bookHref(b)} className="font-serif text-base font-bold text-paper hover:text-brass-hover md:text-lg">
                  {b.title}
                </TrackedLink>
                <span className="truncate text-xs text-paper-dim md:text-sm">{b.author}</span>
              </div>
              <BuyButton
                bookId={b.id}
                title={b.title}
                publisher={b.koreanEdition!.publisher}
                stores={b.koreanEdition!.stores}
                placement="korean_row"
                buttonClassName="inline-flex h-11 w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-brass px-3 text-sm font-semibold text-ink transition-colors hover:bg-brass-hover md:h-12 md:text-[15px]"
              />
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-col gap-1 px-4 text-xs leading-relaxed text-paper-dim md:mt-8 md:px-0">
          {storeDisclosures(books.flatMap((b) => b.koreanEdition!.stores)).map((d) => (
            <p key={d}>{d}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
