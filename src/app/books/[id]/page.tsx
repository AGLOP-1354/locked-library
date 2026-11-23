import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBooks, getBook, getPublishedBooks } from "@/content/books";
import {
  bookActions,
  bookHref,
  byline,
  formatDate,
  hasFreeText,
  isBuyable,
  readLabel,
  toSeconds,
  youtubeThumb,
  youtubeUrl,
} from "@/lib/books";
import { BookActions } from "@/components/BookActions";
import { BookTags } from "@/components/BookTags";
import { Icon } from "@/components/Icon";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TrackedLink } from "@/components/TrackedLink";
import type { SearchItem } from "@/components/SearchBox";
import { BookViewTracker } from "./_components/BookViewTracker";
import { VideoEmbed } from "./_components/VideoEmbed";

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

  const searchItems: SearchItem[] = getPublishedBooks().map((b) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    freeText: hasFreeText(b),
    buyable: isBuyable(b),
    href: bookHref(b),
  }));
  const others = getPublishedBooks().filter((b) => b.id !== book.id).slice(0, 4);
  const freeText = hasFreeText(book);
  const buyable = isBuyable(book);
  const edition = book.koreanEdition;

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

        <section
          aria-labelledby="book-title"
          className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-12 pt-3 md:flex-row md:flex-wrap md:items-start md:gap-14 md:px-10 md:pb-20 md:pt-6"
        >
          {book.youtubeVideoId ? (
            <figure className="m-0 md:order-2 md:min-w-0 md:flex-[1_1_560px]">
              <VideoEmbed bookId={book.id} videoId={book.youtubeVideoId} title={book.videoTitle ?? book.title} />
              {book.videoTitle ? (
                <figcaption className="mt-3 text-[13px] leading-relaxed text-paper-dim">
                  {book.videoTitle}
                  <span className="ml-2">{formatDate(book.publishedAt)} 공개</span>
                </figcaption>
              ) : null}
            </figure>
          ) : null}

          <div className="flex min-w-0 flex-col gap-4 md:order-1 md:flex-[1_1_440px] md:gap-5">
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
            <BookActions actions={bookActions(book)} placement={PLACEMENT} className="pt-1" />
            {freeText ? (
              <p className="text-[13px] leading-relaxed text-paper-dim">
                원문은 무료 전자도서관에서 새 창으로 열려요.
              </p>
            ) : null}
          </div>
        </section>

        {book.chapters && book.chapters.length > 0 ? (
          <section aria-labelledby="chapters-title" className="border-t border-line">
            <div className="mx-auto max-w-7xl px-4 py-12 md:px-10 md:py-18">
              <h2 id="chapters-title" className="font-serif text-[28px] font-bold tracking-[-0.02em] md:text-[34px]">
                영상 차례
              </h2>
              <p className="mt-2 text-[15px] text-paper-dim">누르면 유튜브에서 그 장면부터 재생돼요.</p>
              <ol className="mt-6 max-w-3xl md:mt-8">
                {book.chapters.map((c, i) => (
                  <li key={c.time} className="border-b border-line first:border-t">
                    <TrackedLink
                      href={youtubeUrl(book, toSeconds(c.time))}
                      event={{ name: "youtube_click", params: { book_id: book.id, placement: "book_chapter" } }}
                      className="group flex min-h-14 items-center gap-5 py-3 text-paper"
                    >
                      <span className="w-14 shrink-0 font-serif text-lg tabular-nums text-brass">{c.time}</span>
                      <span className="flex-1 font-serif text-lg transition-colors group-hover:text-brass-hover md:text-xl">
                        {i < book.chapters!.length - 1 || !c.title.includes("원작") ? `제${i + 1}장 ` : ""}
                        {c.title}
                      </span>
                      <Icon name="play" size={12} className="text-paper-dim" />
                    </TrackedLink>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ) : null}

        <section aria-labelledby="origin-title" className="border-t border-line bg-ink-deep">
          <div className="mx-auto max-w-7xl px-4 py-12 md:px-10 md:py-18">
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
                    {edition.publisher}
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
                저작권 보호 기간이 끝난 작품이에요. 누구나 무료로 읽을 수 있어요.
              </p>
            ) : null}
          </div>
        </section>

        {others.length > 0 ? (
          <section aria-labelledby="others-title" className="border-t border-line">
            <div className="mx-auto max-w-7xl px-4 py-12 md:px-10 md:py-18">
              <h2 id="others-title" className="font-serif text-[28px] font-bold tracking-[-0.02em] md:text-[34px]">
                다른 책
              </h2>
              <ul className="mt-6 grid gap-x-8 md:mt-8 md:grid-cols-2">
                {others.map((b) => (
                  <li key={b.id} className="border-b border-line">
                    <TrackedLink href={bookHref(b)} className="group flex min-h-16 items-center justify-between gap-4 py-3">
                      <span className="flex min-w-0 flex-col gap-1">
                        <span className="font-serif text-lg font-bold text-paper transition-colors group-hover:text-brass-hover">
                          {b.title}
                        </span>
                        <span className="text-[13px] text-paper-dim">{byline(b)}</span>
                      </span>
                      <BookTags freeText={hasFreeText(b)} buyable={isBuyable(b)} />
                    </TrackedLink>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
