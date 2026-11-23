import type { ClothColor } from "@/types/book";

/**
 * 천 색 → Tailwind 배경 클래스. Tailwind는 클래스 이름에 보이는 색만 CSS에 남기므로
 * style에 var(--color-cloth-*)를 직접 쓰지 말고 이 표를 쓴다.
 */
export const CLOTH_BG: Record<ClothColor, string> = {
  oxblood: "bg-cloth-oxblood",
  bottle: "bg-cloth-bottle",
  navy: "bg-cloth-navy",
  ochre: "bg-cloth-ochre",
  plum: "bg-cloth-plum",
  rust: "bg-cloth-rust",
  slate: "bg-cloth-slate",
  vellum: "bg-cloth-vellum",
};
