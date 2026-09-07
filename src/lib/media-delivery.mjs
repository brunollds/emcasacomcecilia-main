const SITE_ORIGIN = 'https://emcasacomcecilia.com';
const CDN_ORIGIN = 'https://cdn.emcasacomcecilia.com';
const REMOTE_RE = /^\/v1\/(image|video)\/[0-9a-f]{64}\/[A-Za-z0-9][A-Za-z0-9._-]{0,254}$/;

function invalid(message) {
  throw new TypeError(`Invalid media delivery mapping: ${message}`);
}

function canonicalLocal(value) {
  if (typeof value !== 'string' || !value.startsWith('/') || value.includes('\\') || value.includes('?') || value.includes('#') || value.includes('//') || /%2f|%5c/i.test(value)) {
    invalid('local_url must be a canonical local path');
  }
  const parts = value.slice(1).split('/');
  if (parts.some((part) => part === '' || part === '.' || part === '..')) {
    invalid('local_url contains traversal');
  }
  return value;
}

function canonicalRemote(value) {
  if (typeof value !== 'string' || !value.startsWith(`${CDN_ORIGIN}/`)) {
    invalid('remote_url must use the fixed CDN origin');
  }
  let url;
  try {
    url = new URL(value);
  } catch {
    invalid('remote_url is not a URL');
  }
  if (value !== `${CDN_ORIGIN}${url.pathname}` || url.origin !== CDN_ORIGIN || url.username || url.password || url.search || url.hash || /%2f|%5c/i.test(url.pathname) || !REMOTE_RE.test(url.pathname)) {
    invalid('remote_url is not a canonical CDN asset URL');
  }
  return value;
}

function normalizeEntries(entries) {
  if (!entries || typeof entries !== 'object') invalid('entries must be an object or array');
  const pairs = Array.isArray(entries)
    ? entries.map((entry) => [entry?.local_url, entry?.remote_url])
    : Object.entries(entries);
  const result = new Map();
  for (const [local, remote] of pairs) {
    const localKey = canonicalLocal(local);
    const remoteUrl = canonicalRemote(remote);
    if (result.has(localKey)) invalid(`duplicate local_url: ${localKey}`);
    result.set(localKey, remoteUrl);
  }
  return result;
}

function localPathFromInput(value) {
  if (!value.startsWith(`${SITE_ORIGIN}/`)) return null;
  let url;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  if (url.origin !== SITE_ORIGIN || url.username || url.password || url.search || url.hash) return null;
  return canonicalLocal(url.pathname);
}

export function createMediaResolver(entries) {
  const mappings = normalizeEntries(entries);
  return function resolveMediaUrl(value) {
    if (typeof value !== 'string') throw new TypeError('resolveMediaUrl expects a string');
    const localKey = value.startsWith('/') ? value : localPathFromInput(value);
    return localKey && mappings.has(localKey) ? mappings.get(localKey) : value;
  };
}

export const mediaDeliveryOrigins = Object.freeze({ site: SITE_ORIGIN, cdn: CDN_ORIGIN });
