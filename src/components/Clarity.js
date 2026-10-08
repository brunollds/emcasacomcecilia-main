"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { shouldEnableClarity } from "@/lib/analytics";

function subscribeToClarityAvailability() {
  return () => {};
}

function getClarityAvailabilitySnapshot() {
  return shouldEnableClarity(window.location.hostname);
}

function getServerClarityAvailabilitySnapshot() {
  return false;
}

export default function Clarity() {
  const enabled = useSyncExternalStore(
    subscribeToClarityAvailability,
    getClarityAvailabilitySnapshot,
    getServerClarityAvailabilitySnapshot,
  );

  if (!enabled) {
    return null;
  }

  return (
    <Script id="clarity-init" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","r8u956l333");`}
    </Script>
  );
}
