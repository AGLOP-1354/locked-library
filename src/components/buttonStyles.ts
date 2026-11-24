/** 단독 버튼 모양 클래스 (책 버튼 묶음은 BookActions). 높이는 터치 영역 44px 이상. */
const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-medium transition-colors duration-200 whitespace-nowrap";

export const btn = {
  primary: `${base} h-[52px] px-6.5 bg-brass text-ink font-semibold hover:bg-brass-hover`,
  ghost: `${base} h-[52px] px-6.5 border border-brass-line text-paper hover:bg-brass/10`,
};

/**
 * 책 버튼 묶음(BookActions)과 구매 카드의 버튼 모양. 금색으로 채운 버튼은 한국어판 구매 하나뿐이다.
 * "use client" 파일에 두면 서버 컴포넌트에서 import할 때 문자열이 아닌 참조로 와서 스타일이 빠진다. 여기(일반 모듈)에 둔다.
 */
const actionBase =
  "inline-flex w-full items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors duration-200";
const actionSize = "h-[52px] px-4 text-[15px] md:text-base";

export const actionStyle = {
  video: `${actionBase} ${actionSize} border border-brass text-brass hover:bg-brass/10`,
  read: `${actionBase} ${actionSize} border border-line-strong text-paper hover:bg-paper/5`,
  buy: `${actionBase} ${actionSize} bg-brass font-semibold text-ink hover:bg-brass-hover`,
};
