import type { ReactNode } from "react";

type Props = { id: string; title: string; badge?: ReactNode; children: ReactNode };

export function SectionHeading({ id, title, badge, children }: Props) {
  return (
    <div className="flex max-w-[40em] flex-col gap-2 md:gap-2.5">
      <h2
        id={id}
        className="flex items-center gap-2.5 font-serif text-[32px] font-bold tracking-[-0.02em] md:gap-3.5 md:text-[44px]"
      >
        {title}
        {badge}
      </h2>
      <p className="text-[15px] leading-[1.7] text-paper-dim md:text-base">{children}</p>
    </div>
  );
}
