"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function Analytics() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!measurementId || !ready || typeof window.gtag !== "function") {
      return;
    }

    window.gtag("event", "page_view", {
      page_path: `${pathname}${window.location.search}`,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, ready]);

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
