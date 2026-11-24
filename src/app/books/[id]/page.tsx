import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBooks, getBook, getShowcaseBooks } from "@/content/books";
import {
  bookActions,
  bookHref,
  byline,
  clothOf,
  formatDate,
  hasFreeText,
  isBuyable,
  josa,
  readLabel,
  storeDisclosures,
  youtubeThumb,
} from "@/lib/books";
import { BookActions } from "@/components/BookActions";
import { BookCover } from "@/components/BookCover";
import { BookTags } from "@/components/BookTags";
import { BuyButton } from "@/components/BuyButton";
import { Icon } from "@/components/Icon";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TrackedLink } from "@/components/TrackedLink";
import { VideoEmbed } from "@/components/VideoEmbed";
import type { SearchItem } from "@/components/SearchBox";
import { BookViewTracker } from "./_components/BookViewTracker";
import { ChapterList } from "./_components/ChapterList";
import { EditionCard } from "./_components/EditionCard";
import { StickyBuyBar } from "./_components/StickyBuyBar";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBooks().map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: PageProps<"/books/[id]">): Promise<Metadata> {
  const { id } = await params;
  const book = getBook(id);
  if (!book) return {};
  const thumb = youtubeThumb(book);
  return {
    title: book.title,
    description: book.summary,
    alternates: { canonical: bookHref(book) },
    openGraph: { title: book.title, description: book.summary, images: thumb ? [thumb] : undefined },
  };
}

const PLACEMENT = "book_page";

export default async function BookPage({ params }: PageProps<"/books/[id]">) {
  const { id } = await params;
  const book = getBook(id);
  if (!book) notFound();

  const published = getShowcaseBooks();
  const searchItems: SearchItem[] = published.map((b) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    freeText: hasFreeText(b),
    buyable: isBuyable(b),
    href: bookHref(b),
  }));
  const others = published.filter((b) => b.id !== book.id);
  const othersBuyable = others.filter(isBuyable);
  const othersFreeOnly = others.filter((b) => !isBuyable(b));
  const freeText = hasFreeText(book);
  const buyable = isBuyable(book);
  const edition = book.koreanEdition;
  const authorKnown = book.author !== "작자 미상";

  // 한국어판이 있으면 데스크톱에서 오른쪽에 구매 카드 칸을 둔다.
  const grid = buyable ? "md:grid md:grid-cols-[minmax(0,1fr)_minmax(320px,380px)] md:gap-x-14" : "md:max-w-4xl";

  return (
    <>
      <SiteHeader searchItems={searchItems} />
      <BookViewTracker bookId={book.id} freeText={freeText} buyable={buyable} />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 pt-5 md:px-10 md:pt-8">
          <TrackedLink href="/#books" className="inline-flex min-h-11 items-center gap-1.5 text-sm text-paper-dim hover:text-paper">
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
              <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            모든 책
          </TrackedLink>
        </div>

        <div className={`mx-auto flex max-w-7xl flex-col px-4 pb-16 pt-3 md:px-10 md:pb-24 md:pt-6 ${grid}`}>
          {book.youtubeVideoId ? (
            <figure className="m-0 md:col-start-1 md:row-start-1">
              <VideoEmbed bookId={book.id} videoId={book.youtubeVideoId} title={book.videoTitle ?? book.title} placement={PLACEMENT} />
              <figcaption className="mt-3 text-[13px] leading-relaxed text-paper-dim">
                이 페이지에서 바로 재생돼요. {formatDate(book.publishedAt)} 공개
              </figcaption>
            </figure>
          ) : null}

          <section aria-labelledby="book-title" className="mt-6 flex min-w-0 flex-col gap-4 md:col-start-1 md:row-start-2 md:mt-10 md:gap-5">
            <BookTags freeText={freeText} buyable={buyable} />
            <h1 id="book-title" className="font-serif text-5xl font-black leading-[1.05] tracking-[-0.035em] md:text-7xl">
              {book.title}
            </h1>
            <p className="text-[15px] text-paper-soft md:text-[17px]">
              {book.originalTitle ? <span className="font-serif italic">{book.originalTitle}</span> : null}
              {book.originalTitle ? <span className="text-paper-dim">, </span> : null}
              {byline(book)}
            </p>
            <p className="max-w-[32em] font-serif text-[17px] leading-[1.8] text-paper-soft md:text-[19px]">{book.summary}</p>
            <div id="book-actions" className="pt-1">
              <BookActions actions={bookActions(book)} placement={PLACEMENT} video="inline" />
            </div>
          </section>

          {buyable ? (
            <aside className="mt-10 md:col-start-2 md:row-span-4 md:row-start-1 md:mt-0 md:self-start md:sticky md:top-28">
              <EditionCard book={book} />
            </aside>
          ) : null}

          {book.chapters && book.chapters.length > 0 ? (
            <section aria-labelledby="chapters-title" className="mt-14 md:col-start-1 md:row-start-3 md:mt-18">
              <h2 id="chapters-title" className="font-serif text-[28px] font-bold tracking-[-0.02em] md:text-[34px]">
                영상 차례
              </h2>
              <p className="mt-2 text-[15px] text-paper-dim">누르면 위 영상이 그 장면부터 재생돼요.</p>
              <ChapterList
                bookId={book.id}
                title={book.title}
                chapters={book.chapters}
                nudge={
                  buyable
                    ? {
                        text: authorKnown
                          ? `원작 이야기가 궁금했다면, ${josa(book.author, "이", "가")} 쓴 이야기를 책으로 읽어 보세요.`
                          : "원작 이야기가 궁금했다면, 책으로 읽어 보세요.",
                        publisher: edition!.publisher,
                        stores: edition!.stores,
                      }
                    : undefined
                }
              />
            </section>
          ) : null}

          <section aria-labelledby="origin-title" className="mt-14 md:col-start-1 md:row-start-4 md:mt-18">
            <h2 id="origin-title" className="font-serif text-[28px] font-bold tracking-[-0.02em] md:text-[34px]">
              원작 이야기
            </h2>
            <dl className="mt-6 grid max-w-3xl grid-cols-[5.5rem_1fr] gap-x-4 gap-y-4 text-[15px] md:mt-8 md:grid-cols-[7rem_1fr] md:text-base">
              {book.originalTitle ? (
                <>
                  <dt className="text-paper-dim">원제</dt>
                  <dd className="font-serif italic">{book.originalTitle}</dd>
                </>
              ) : null}
              <dt className="text-paper-dim">작가</dt>
              <dd>{book.author}</dd>
              {book.year ? (
                <>
                  <dt className="text-paper-dim">발표</dt>
                  <dd>{book.year}년</dd>
                </>
              ) : null}
              {book.adaptation ? (
                <>
                  <dt className="text-paper-dim">영상 각색</dt>
                  <dd className="leading-relaxed text-paper-soft">{book.adaptation}</dd>
                </>
              ) : null}
              {edition ? (
                <>
                  <dt className="text-paper-dim">한국어판</dt>
                  <dd className="leading-relaxed">
                    {edition.title ? <span className="font-serif">{edition.title}, </span> : null}
                    {edition.publisher ?? `${edition.stores.map((s) => s.store).join(", ")}에서 살 수 있어요`}
                    {edition.translator ? <span className="text-paper-dim"> (옮긴이 {edition.translator})</span> : null}
                  </dd>
                </>
              ) : null}
              {book.readLinks && book.readLinks.length > 0 ? (
                <>
                  <dt className="text-paper-dim">무료 원문</dt>
                  <dd className="flex flex-col items-start gap-1">
                    {book.readLinks.map((r) => (
                      <TrackedLink
                        key={r.url}
                        href={r.url}
                        external
                        event={{ name: "read_start", params: { book_id: book.id, placement: "book_origin" } }}
                        className="inline-flex min-h-9 items-center gap-1.5 text-brass hover:text-brass-hover"
                      >
                        {readLabel(r)}
                        <Icon name="external" size={13} />
                      </TrackedLink>
                    ))}
                  </dd>
                </>
              ) : null}
            </dl>
            {book.rights === "public-domain" ? (
              <p className="mt-8 max-w-3xl text-[13px] leading-relaxed text-paper-dim">
                원작은 저작권 보호 기간이 끝난 작품이에요. 누구나 무료로 읽을 수 있어요.
              </p>
            ) : null}
          </section>
        </div>

        {others.length > 0 ? (
          <section aria-labelledby="others-title" className="border-t border-line bg-ink-deep">
            <div className="mx-auto max-w-7xl px-4 py-12 md:px-10 md:py-18">
              {othersBuyable.length > 0 ? (
                <>
                  <h2 id="others-title" className="font-serif text-[28px] font-bold tracking-[-0.02em] md:text-[34px]">
                    한국어판으로 이어 읽기
                  </h2>
                  <p className="mt-2 text-[15px] text-paper-dim">채널에서 본 다른 이야기도 한국어판으로 나와 있어요.</p>
                  <ul className="mt-6 grid grid-cols-2 gap-x-3.5 gap-y-8 md:mt-8 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] md:gap-x-8 md:gap-y-10">
                    {othersBuyable.map((b) => (
                      <li key={b.id} className="flex flex-col gap-3">
                        <TrackedLink href={bookHref(b)} aria-label={`${b.title} 책 페이지`} className="block transition-transform duration-300 hover:-translate-y-1">
                          <BookCover title={b.title} cloth={clothOf(b)} cover={b.cover} className="w-full" />
                        </TrackedLink>
                        <div className="flex flex-col gap-0.5">
                          <TrackedLink href={bookHref(b)} className="font-serif text-base font-bold text-paper hover:text-brass-hover md:text-[19px]">
                            {b.title}
                          </TrackedLink>
                          <span className="text-[13px] text-paper-dim md:text-sm">{b.author}</span>
                        </div>
                        <BuyButton
                          bookId={b.id}
                          title={b.title}
                          publisher={b.koreanEdition!.publisher}
                          stores={b.koreanEdition!.stores}
                          placement="more_books"
                          buttonClassName="inline-flex h-11 w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-brass px-4 text-sm font-semibold text-ink transition-colors hover:bg-brass-hover md:h-12 md:text-[15px]"
                        />
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-col gap-1 text-xs leading-relaxed text-paper-dim">
                    {storeDisclosures(othersBuyable.flatMap((b) => b.koreanEdition!.stores)).map((d) => (
                      <p key={d}>{d}</p>
                    ))}
                  </div>
                </>
              ) : (
                <h2 id="others-title" className="font-serif text-[28px] font-bold tracking-[-0.02em] md:text-[34px]">
                  다른 책
                </h2>
              )}
              {othersFreeOnly.length > 0 ? (
                <ul className="mt-8 grid gap-x-8 md:grid-cols-2">
                  {othersFreeOnly.map((b) => (
                    <li key={b.id} className="border-b border-line first:border-t md:[&:nth-child(2)]:border-t">
                      <TrackedLink href={bookHref(b)} className="group flex min-h-16 items-center justify-between gap-4 py-3">
                        <span className="flex min-w-0 flex-col gap-1">
                          <span className="font-serif text-lg font-bold text-paper transition-colors group-hover:text-brass-hover">
                            {b.title}
                          </span>
                          <span className="text-[13px] text-paper-dim">{hasFreeText(b) ? "영어 원문만 있어요" : byline(b)}</span>
                        </span>
                        <BookTags freeText={hasFreeText(b)} buyable={false} />
                      </TrackedLink>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
      {/* 하단 구매 바가 바닥글 끝을 가리지 않게 */}
      {buyable ? <div aria-hidden className="h-32 bg-ink-deep md:hidden" /> : null}
      {buyable ? (
        <StickyBuyBar
          bookId={book.id}
          title={book.title}
          cloth={clothOf(book)}
          publisher={edition!.publisher}
          stores={edition!.stores}
          disclosures={storeDisclosures(edition!.stores)}
        />
      ) : null}
    </>
  );
}
