import Script from "next/script";

/** Google 태그 ID 형식: GA4 측정 ID(G-…), 태그 관리자/Google 태그 컨테이너(GTM-…, GT-…) */
const TAG_ID = /^(G|GT|GTM)-[A-Z0-9]+$/;

export const isValidTagId = (id: string | undefined): id is string => Boolean(id && TAG_ID.test(id));

/**
 * Google 태그를 GA4 설치 안내 그대로 넣는다.
 * - GTM-/GT-: 컨테이너(gtm.js). GA4 설정은 컨테이너 안에 있다.
 * - G-: gtag.js + config.
 * 어느 쪽이든 window.gtag를 만들어서, 이벤트는 src/lib/analytics.ts의 track()이 gtag('event', …)로 보낸다.
 */
export function GoogleTag({ id }: { id: string }) {
  if (!isValidTagId(id)) return null;
  const container = !id.startsWith("G-");
  const src = container
    ? `https://www.googletagmanager.com/gtm.js?id=${id}`
    : `https://www.googletagmanager.com/gtag/js?id=${id}`;
  const init = [
    "window.dataLayer = window.dataLayer || [];",
    "function gtag(){dataLayer.push(arguments);}",
    "window.gtag = gtag;",
    "gtag('js', new Date());",
    container ? "" : `gtag('config', '${id}');`,
  ].join("\n");
  return (
    <>
      <Script id="google-tag-init" strategy="afterInteractive">
        {init}
      </Script>
      <Script id="google-tag" src={src} strategy="afterInteractive" />
    </>
  );
}
