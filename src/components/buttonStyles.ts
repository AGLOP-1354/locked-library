/** 단독 버튼 모양 클래스 (책 버튼 묶음은 BookActions). 높이는 터치 영역 44px 이상. */
const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-medium transition-colors duration-200 whitespace-nowrap";

export const btn = {
  primary: `${base} h-[52px] px-6.5 bg-brass text-ink font-semibold hover:bg-brass-hover`,
  ghost: `${base} h-[52px] px-6.5 border border-brass-line text-paper hover:bg-brass/10`,
};
