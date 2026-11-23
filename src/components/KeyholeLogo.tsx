import Link from "next/link";
import { site } from "@/lib/site";

export function KeyholeLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 text-paper md:gap-3" aria-label={`${site.nameKo} 홈`}>
      <svg viewBox="0 0 22 30" aria-hidden className="h-6 w-[18px] text-brass md:h-7.5 md:w-[22px]">
        <circle cx="11" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M8 15.5L5.5 28h11L14 15.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      </svg>
      <span className="font-serif text-[19px] font-bold tracking-[-0.01em] md:text-[22px]">{site.nameKo}</span>
    </Link>
  );
}
