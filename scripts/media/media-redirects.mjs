import { createMediaResolver } from '../../src/lib/media-delivery.mjs';

const MEDIA_SOURCE = /^\/(?:images|videos)\/(?!\/)[^?#[\]{}]+$/;

export function escapeNextRedirectSource(localUrl) {
  return localUrl.replace(/[\\:*+?()[\]{}]/g, '\\$&');
}

export function buildMediaDeliveryRules(map, editorialRedirects = []) {
  if (!map || Array.isArray(map) || typeof map !== 'object') {
    throw new TypeError('Media redirect map must be an object');
  }
  const editorialSources = new Set(editorialRedirects.map((entry) => entry.source));
  const entries = Object.entries(map);
  createMediaResolver(map);

  const rules = { rewrites: [], redirects: [] };
  for (const [localUrl, remoteUrl] of entries) {
    if (!MEDIA_SOURCE.test(localUrl)) {
      throw new TypeError(`Media redirect source outside images/videos scope: ${localUrl}`);
    }
    if (editorialSources.has(localUrl)) {
      throw new TypeError(`Media redirect conflicts with editorial redirect: ${localUrl}`);
    }
    const rule = {
      source: escapeNextRedirectSource(localUrl),
      destination: remoteUrl,
    };
    const remotePath = new URL(remoteUrl).pathname;
    if (remotePath.startsWith('/v1/image/')) {
      rules.rewrites.push(rule);
    } else if (remotePath.startsWith('/v1/video/')) {
      rules.redirects.push({ ...rule, permanent: false });
    } else {
      throw new TypeError(`Media redirect destination outside v1 media scope: ${remoteUrl}`);
    }
  }
  return rules;
}

export function buildMediaRedirects(map, editorialRedirects = []) {
  return buildMediaDeliveryRules(map, editorialRedirects).redirects;
}
