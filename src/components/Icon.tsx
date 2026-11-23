type IconName = "search" | "play" | "lock" | "unlock" | "bell" | "youtube" | "external" | "close";

type Props = { name: IconName; size?: number; className?: string };

/** 장식용 선 아이콘. 의미가 필요한 곳은 버튼/링크에 aria-label을 단다. */
export function Icon({ name, size = 16, className }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-4-4" />
        </svg>
      );
    case "play":
      return (
        <svg {...common} stroke="none" fill="currentColor">
          <path d="M7 4l13 8-13 8z" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common} strokeWidth={2.4}>
          <rect x="4" y="11" width="16" height="10" rx="2" fill="currentColor" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      );
    case "unlock":
      return (
        <svg {...common}>
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 7.5-2" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common} strokeWidth={1.8}>
          <path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 21h4" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common} strokeWidth={1.8}>
          <rect x="2.5" y="5" width="19" height="14" rx="4" />
          <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "external":
      return (
        <svg {...common}>
          <path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6" />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
  }
}
