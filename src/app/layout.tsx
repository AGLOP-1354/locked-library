import type { Metadata } from "next";
import { Hahmlet, IBM_Plex_Sans_KR } from "next/font/google";
import { GoogleTag } from "@/components/GoogleTag";
import { site } from "@/lib/site";
import "./globals.css";

const display = Hahmlet({
  variable: "--font-display",
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const body = IBM_Plex_Sans_KR({
  variable: "--font-body",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nameKo} | ${site.name}`,
    template: `%s | ${site.nameKo}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.nameKo,
  },
};

/** Google 태그 ID (G-… 또는 GTM-…). 비어 있으면 태그를 넣지 않는다. */
const tagId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-ink text-paper">
        {children}
        {tagId ? <GoogleTag id={tagId} /> : null}
      </body>
    </html>
  );
}
