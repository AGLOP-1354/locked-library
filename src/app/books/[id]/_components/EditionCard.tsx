import type { Book } from "@/types/book";
import { clothOf, josa, readLabel, storeDisclosures } from "@/lib/books";
import { actionStyle } from "@/components/buttonStyles";
import { BookCover } from "@/components/BookCover";
import { BuyButton } from "@/components/BuyButton";
import { Icon } from "@/components/Icon";
import { TrackedLink } from "@/components/TrackedLink";

/**
 * "원작은 책에서 이어 읽기" 카드. 영상이 각색이라는 점에서 책으로 넘어가게 한다.
 * 모바일은 소개 바로 아래, 데스크톱은 오른쪽에 붙어 스크롤해도 보인다.
 * id="edition-card": 이 카드가 보이는 동안 하단 구매 바(StickyBuyBar)는 숨는다.
 */
export function EditionCard({ book }: { book: Book }) {
  const edition = book.koreanEdition;
  if (!edition || edition.stores.length === 0) return null;
  const read = book.readLinks?.[0];
  const known = book.author !== "작자 미상";
  const heading = known
    ? `${josa(book.author, "이", "가")} 쓴 원작은 책에서 이어 읽어 보세요`
    : "원작은 책에서 이어 읽어 보세요";
  const storeNames = edition.stores.map((s) => s.store).join(", ");

  return (
    <section
      id="edition-card"
      aria-labelledby="edition-title"
      className="rounded-xl border border-brass-line bg-ink-raised p-5 md:p-7"
    >
      {book.adaptation ? <p className="text-[13px] leading-relaxed text-paper-dim md:text-sm">{book.adaptation}</p> : null}
      <h2 id="edition-title" className="mt-2 font-serif text-2xl font-bold leading-[1.35] tracking-[-0.02em] md:text-[26px]">
        {heading}
      </h2>
      <div className="mt-5 flex items-start gap-4 md:mt-6 md:gap-5">
        <BookCover
          title={edition.title ?? book.title}
          cloth={clothOf(book)}
          className="w-24 md:w-28"
          titleClassName="text-sm md:text-base"
        />
        <div className="flex min-w-0 flex-col gap-1.5">
          <span className="font-serif text-lg font-bold md:text-[19px]">{edition.title ?? `${book.title} 한국어판`}</span>
          {edition.publisher || edition.translator ? (
            <span className="text-[13px] text-paper-soft md:text-sm">
              {[edition.publisher, edition.translator ? `옮긴이 ${edition.translator}` : null].filter(Boolean).join(", ")}
            </span>
          ) : null}
          <span className="text-[13px] text-paper-dim md:text-sm">{storeNames}에서 판매</span>
        </div>
      </div>
      <BuyButton
        bookId={book.id}
        title={book.title}
        publisher={edition.publisher}
        stores={edition.stores}
        placement="edition_card"
        buttonClassName={`${actionStyle.buy} md:h-[54px] md:text-[17px]`}
        className="mt-5 md:mt-6"
      />
      <p className="mt-2.5 text-center text-xs text-paper-dim">구매 페이지는 새 창으로 열려요.</p>
      {read ? (
        <TrackedLink
          href={read.url}
          external
          event={{ name: "read_start", params: { book_id: book.id, placement: "edition_card" } }}
          className="mt-1 flex min-h-11 items-center justify-center gap-1.5 text-sm text-paper-soft hover:text-paper"
        >
          {readLabel(read).replace(" 읽기", "")}은 무료로 읽을 수 있어요
          <Icon name="external" size={12} className="text-paper-dim" />
        </TrackedLink>
      ) : null}
      <div className="mt-3 flex flex-col gap-1 border-t border-line pt-3 text-xs leading-relaxed text-paper-dim">
        {storeDisclosures(edition.stores).map((d) => (
          <p key={d}>{d}</p>
        ))}
      </div>
    </section>
  );
}
