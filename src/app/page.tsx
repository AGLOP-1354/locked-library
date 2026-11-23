import { getLatestBook, getPublishedBooks, getUpcomingBooks } from "@/content/books";
import {
  GENRE_LABEL,
  bookActions,
  bookHref,
  byline,
  clothOf,
  hasFreeText,
  isBuyable,
  isLightCloth,
  spineSize,
} from "@/lib/books";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { SearchItem } from "@/components/SearchBox";
import { BookShelf, type ShelfBook } from "./_components/BookShelf";
import { Hero } from "./_components/Hero";
import { RecentVideos } from "./_components/RecentVideos";
import { SectionHeading } from "./_components/SectionHeading";
import { UpcomingBooks } from "./_components/UpcomingBooks";

export default function Home() {
  const published = getPublishedBooks();
  const anyBuyable = published.some(isBuyable);
  const latest = getLatestBook();
  const recent = published.filter((b) => b.youtubeVideoId && b.id !== latest?.id).slice(0, 3);

  const shelf: ShelfBook[] = published.map((b) => {
    const cloth = clothOf(b);
    const { width, height } = spineSize(b);
    return {
      id: b.id,
      title: b.title,
      author: b.author,
      byline: byline(b),
      summary: b.summary,
      genres: b.genres,
      cloth,
      light: isLightCloth(cloth),
      width,
      height,
      bookHref: bookHref(b),
      freeText: hasFreeText(b),
      buyable: isBuyable(b),
      actions: bookActions(b),
    };
  });

  const searchItems: SearchItem[] = published.map((b) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    freeText: hasFreeText(b),
    buyable: isBuyable(b),
    href: bookHref(b),
  }));

  return (
    <>
      <SiteHeader searchItems={searchItems} />
      <main className="flex-1">
        <Hero book={latest} />
        <RecentVideos books={recent} />

        <section id="books" aria-labelledby="books-title" className="scroll-mt-28 border-y border-line bg-ink-deep">
          <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-12 md:px-10 md:pb-18 md:pt-20">
            <SectionHeading id="books-title" title="영상으로 만난 책">
              {anyBuyable
                ? "영상으로 보고, 영어 원문은 무료로 읽거나 한국어판으로 사서 읽을 수 있어요."
                : "영상으로 보고, 영어 원문을 무료로 읽을 수 있어요."}
            </SectionHeading>
            <BookShelf books={shelf} genreLabels={GENRE_LABEL} />
          </div>
        </section>

        <UpcomingBooks books={getUpcomingBooks()} />
      </main>
      <SiteFooter />
    </>
  );
}
