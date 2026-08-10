const INTERNAL_HOSTNAMES = new Set([
  'emcasacomcecilia.com',
  'www.emcasacomcecilia.com',
]);

function parseAbsoluteHref(href: string): URL {
  return new URL(href.startsWith('//') ? `https:${href}` : href);
}

export function isInternalLink(href: string): boolean {
  if (href.startsWith('#')) return true;
  if (href.startsWith('/') && !href.startsWith('//')) return true;

  try {
    return INTERNAL_HOSTNAMES.has(parseAbsoluteHref(href).hostname);
  } catch {
    return false;
  }
}

export function getInternalHref(href: string): string {
  if (href.startsWith('#') || (href.startsWith('/') && !href.startsWith('//'))) {
    return href;
  }

  try {
    const url = parseAbsoluteHref(href);
    if (INTERNAL_HOSTNAMES.has(url.hostname)) {
      return `${url.pathname}${url.search}${url.hash}`;
    }
  } catch {
    // Invalid or relative values are returned unchanged.
  }

  return href;
}

export function isCouponPageLink(href: string): boolean {
  if (!isInternalLink(href)) return false;

  const pathname = getInternalHref(href).split(/[?#]/, 1)[0];
  return /\/(?:cupons|coupons)(?:\/|$)/.test(pathname);
}

export function getCouponBrandFromHref(href: string): string | undefined {
  if (!isCouponPageLink(href)) return undefined;

  const pathname = getInternalHref(href).split(/[?#]/, 1)[0];
  const match = pathname.match(/\/(?:cupons|coupons)\/([^/]+)/);
  if (!match?.[1]) return undefined;

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}
