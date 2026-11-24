import type { Book } from "@/types/book";
import { site } from "@/lib/site";
import { bookActions, bookHref, byline, formatDate, hasFreeText, isBuyable } from "@/lib/books";
import { BookActions } from "@/components/BookActions";
import { BookTags } from "@/components/BookTags";
import { Icon } from "@/components/Icon";
import { TrackedLink } from "@/components/TrackedLink";
import { btn } from "@/components/buttonStyles";
import { VideoEmbed } from "@/components/VideoEmbed";

/** 최신 영상의 책. 유튜브에서 넘어온 사람이 방금 본 책을 바로 찾게 한다. */
export function Hero({ book }: { book: Book | undefined }) {
  if (!book) {
    return (
      <section className="mx-auto flex max-w-7xl flex-col items-start gap-5 px-4 py-20 md:px-10 md:py-28">
        <h1 className="font-serif text-5xl font-black tracking-[-0.035em] md:text-7xl">{site.nameKo}</h1>
        <p className="max-w-[32em] font-serif text-lg leading-[1.8] text-paper-soft">
          첫 책이 곧 올라와요. 유튜브 채널을 구독하면 영상이 올라올 때 알려 드릴게요.
        </p>
        <TrackedLink
          href={site.youtube.channelUrl}
          event={{ name: "youtube_click", params: { placement: "hero_empty" } }}
          className={btn.primary}
        >
          <Icon name="youtube" size={18} />
          유튜브 채널 보기
        </TrackedLink>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto flex max-w-7xl flex-col gap-5 px-4 pb-10 pt-5 md:flex-row md:flex-wrap md:items-center md:gap-14 md:px-10 md:pb-14 md:pt-18"
    >
      <figure className="m-0 md:order-2 md:min-w-0 md:flex-[1_1_560px]">
        {book.youtubeVideoId ? (
          <VideoEmbed bookId={book.id} videoId={book.youtubeVideoId} title={book.videoTitle ?? book.title} placement="hero" />
        ) : null}
        <figcaption className="mt-3 hidden text-[13px] text-paper-dim md:block">이 페이지에서 바로 재생돼요</figcaption>
      </figure>

      <div className="flex min-w-0 flex-col gap-4.5 md:order-1 md:flex-[1_1_440px] md:gap-5">
        <p className="text-sm text-paper-dim md:text-[15px]">{formatDate(book.publishedAt)}에 올라온 영상</p>
        <h1
          id="hero-title"
          className="font-serif text-5xl font-black leading-[1.04] tracking-[-0.035em] md:text-[clamp(56px,7vw,104px)] md:leading-[1.02]"
        >
          {book.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[15px] text-paper-soft md:text-[17px]">{byline(book)}</span>
          <BookTags freeText={hasFreeText(book)} buyable={isBuyable(book)} className="self-center" />
        </div>
        <p className="max-w-[32em] font-serif text-[17px] leading-[1.8] text-paper-soft md:text-[19px]">{book.summary}</p>
        <BookActions actions={bookActions(book)} placement="hero" video="inline" className="pt-1" />
        <TrackedLink
          href={bookHref(book)}
          className="self-start py-2 text-[15px] text-brass underline decoration-brass-line underline-offset-4 hover:text-brass-hover"
        >
          영상 차례와 원작 이야기 보기
        </TrackedLink>
      </div>
    </section>
  );
}
