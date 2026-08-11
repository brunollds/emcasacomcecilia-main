"use client";

import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { getAnalyticsConfig, shouldEnableAnalytics } from "@/lib/analytics";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const debugEnabled = process.env.NEXT_PUBLIC_GA_DEBUG === "1";
const analyticsConfig = JSON.stringify(getAnalyticsConfig(debugEnabled));

function subscribeToAnalyticsAvailability() {
  return () => {};
}

function getAnalyticsAvailabilitySnapshot() {
  return (
    Boolean(measurementId) &&
    shouldEnableAnalytics(window.location.hostname, debugEnabled)
  );
}

function getServerAnalyticsAvailabilitySnapshot() {
  return false;
}

export default function Analytics() {
  const pathname = usePathname();
  const enabled = useSyncExternalStore(
    subscribeToAnalyticsAvailability,
    getAnalyticsAvailabilitySnapshot,
    getServerAnalyticsAvailabilitySnapshot,
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled || !measurementId || !ready || typeof window.gtag !== "function") {
      return;
    }

    window.gtag("event", "page_view", {
      page_path: `${pathname}${window.location.search}`,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [enabled, pathname, ready]);

  if (!enabled) {
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
          gtag('config', '${measurementId}', ${analyticsConfig});
        `}
      </Script>
    </>
  );
}
