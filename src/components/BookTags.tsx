import { Icon } from "@/components/Icon";

type Props = { freeText: boolean; buyable: boolean; className?: string };

/** 책에서 할 수 있는 것을 작은 꼬리표로: 무료 원문, 한국어판. 색과 글자를 함께 쓴다. */
export function BookTags({ freeText, buyable, className = "" }: Props) {
  if (!freeText && !buyable) return null;
  const tag = "inline-flex shrink-0 items-center gap-1 rounded border px-1.5 py-px font-sans text-xs font-medium tracking-normal";
  return (
    <span className={`inline-flex flex-wrap items-center gap-1.5 self-start ${className}`}>
      {freeText ? (
        <span className={`${tag} border-moss-line bg-moss-bg text-moss`}>
          <Icon name="unlock" size={11} />
          무료 원문
        </span>
      ) : null}
      {buyable ? <span className={`${tag} border-brass-line text-brass`}>한국어판</span> : null}
    </span>
  );
}
